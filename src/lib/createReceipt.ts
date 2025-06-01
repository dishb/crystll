import { auth } from "@/auth";
import client from "./db";
import { ObjectId } from "mongodb";

export default async function createReceipt(ocrRes: any) {
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
    merchant: ocrRes.supplier_name.value,
    time: ocrRes.time.value,
  });
}
