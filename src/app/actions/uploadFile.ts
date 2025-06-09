"use server";

import { auth } from "@/auth";
import client from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  const type = formData.get("type") as string;
  let mindeeURL = "";
  if (type === "receipt") {
    mindeeURL =
      "https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict";
  } else if (type === "invoice") {
    mindeeURL = "https://api.mindee.net/v1/products/mindee/invoices/v4/predict";
  }

  if (!file) {
    return { ok: false, error: "No file uploaded" };
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileName = file.name;
  const mindeeAPIKey = process.env.MINDEE_API_KEY;

  if (!mindeeAPIKey) {
    return { ok: false, error: "Mindee API key not set" };
  }

  const mindeeForm = new FormData();
  mindeeForm.append("document", new Blob([buffer]), fileName);

  const mindeeRes = await fetch(mindeeURL, {
    method: "POST",
    headers: {
      Authorization: `Token ${mindeeAPIKey}`,
    },
    body: mindeeForm,
  });

  if (!mindeeRes.ok) {
    const errorText = await mindeeRes.text();
    return { ok: false, error: `Mindee API error: ${errorText}` };
  }

  const res = await mindeeRes.json();
  const ocrRes = res.document.inference.prediction;

  try {
    const session = await auth();
    if (!session || !session.user) {
      throw new Error("Not authenticated");
    }

    const db = client.db("receiptdb");
    const receiptColl = db.collection("receipts");

    await receiptColl.insertOne({
      userId: new ObjectId(session.user.id),
      total: ocrRes.total_amount.value,
      tax: ocrRes.total_tax.value,
      date: ocrRes.date.value,
      merchant: ocrRes.supplier_name.raw_value,
      time: ocrRes.time ? ocrRes.time.value : "",
      type: type,
    });

    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}
