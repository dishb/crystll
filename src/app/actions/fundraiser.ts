"use server";

import { auth } from "@/auth";
import client from "@/lib/db";
import type Purchase from "@/types/purchase";
import { ObjectId } from "mongodb";

export async function uploadFundraiser(formData: FormData) {
  const title = formData.get("title") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;

  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Not authenticated.");
    }

    const db = client.db("customerdb");
    const purchaseCollection = db.collection("purchases");
    const fundraiser: Purchase = {
      title: title,
      userId: new ObjectId(session.user.id),
      total: amount,
      tax: 0,
      date: new Date(date),
      merchant: "N/A",
      time: time,
      type: "fundraiser",
    };

    await purchaseCollection.insertOne(fundraiser);

    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}
