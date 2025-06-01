import { auth } from "@/auth";
import client from "./db";
import { ObjectId } from "mongodb";

export default async function getReceipts() {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;
  const db = client.db("receiptdb");
  const receiptColl = db.collection("receipts");

  const receipts = receiptColl.find({ userId: new ObjectId(userId) });

  return receipts;
}
