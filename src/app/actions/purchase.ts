"use server";

import { auth } from "@/auth";
import client from "@/lib/db";
import { ObjectId } from "mongodb";
import type Purchase from "@/types/purchase";

export async function uploadPurchase(formData: FormData) {
  const file = formData.get("file") as File;
  const type = formData.get("type") as "receipt" | "invoice";
  const title = formData.get("title") as string;

  let mindeeURL = "";
  if (type === "receipt") {
    mindeeURL =
      "https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict";
  } else if (type === "invoice") {
    mindeeURL = "https://api.mindee.net/v1/products/mindee/invoices/v4/predict";
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileName = file.name;
  const mindeeAPIKey = process.env.MINDEE_API_KEY;

  if (!mindeeAPIKey) {
    return { ok: false, error: "Mindee API key not set." };
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
    if (!session || !session.user || !session.user.id) {
      throw new Error("Not authenticated.");
    }

    const db = client.db("customerdb");
    const purchaseCollection = db.collection("purchases");
    const purchase: Purchase = {
      title: title,
      userId: new ObjectId(session.user.id),
      total: ocrRes.total_amount.value,
      tax: ocrRes.total_tax.value,
      date: ocrRes.date.value,
      merchant: ocrRes.supplier_name.raw_value,
      time: ocrRes.time ? ocrRes.time.value : "",
      type: type,
    };

    await purchaseCollection.insertOne(purchase);

    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function updatePurchase(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const type = formData.get("type") as "receipt" | "invoice";
  const merchant = formData.get("merchant") as string;
  const total = formData.get("total") as string;
  const tax = formData.get("tax") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;

  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Not authenticated.");
    }

    const db = client.db("customerdb");
    const purchaseCollection = db.collection("purchases");

    const result = await purchaseCollection.updateOne(
      { _id: new ObjectId(id), userId: new ObjectId(session.user.id) },
      {
        $set: {
          title,
          type,
          merchant,
          total: parseFloat(total),
          tax: parseFloat(tax),
          date: new Date(date),
          time,
        },
      }
    );

    if (result.matchedCount === 0) {
      throw new Error("Purchase not found or not authorized.");
    }

    return { ok: true };
  } catch (err: any) {
    console.error("Update error:", err.message);
    return { ok: false, error: err.message };
  }
}
