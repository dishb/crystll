import client from "@/lib/db";
import { NextResponse } from "next/server";
import createReceipt from "@/lib/createReceipt";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileName = file.name;
  const mindeeAPIKey = process.env.MINDEE_API_KEY;

  const url =
    "https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict";
  const apiKey = mindeeAPIKey;

  if (!apiKey) {
    return new Response("Mindee API key not set", { status: 500 });
  }

  const mindeeForm = new FormData();
  mindeeForm.append("document", new Blob([buffer]), fileName);

  const mindeeRes = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
    },
    body: mindeeForm,
  });

  if (!mindeeRes.ok) {
    const errorText = await mindeeRes.text();
    return new Response(`Mindee API error: ${errorText}`, {
      status: mindeeRes.status,
    });
  }

  const res = await mindeeRes.json();
  const ocrRes = res.document.inference.prediction;

  const receiptDB = client.db("receiptdb");
  const receiptColl = receiptDB.collection("receipts");

  try {
    createReceipt(ocrRes);
    return NextResponse.json("Success", { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
