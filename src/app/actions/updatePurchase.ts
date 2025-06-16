"use server";

import { auth } from "@/auth";
import client from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function updatePurchase(formData: FormData) {
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
