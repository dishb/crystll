"use server";

import { auth } from "@/auth";
import client from "@/lib/db";
import { ObjectId } from "mongodb";
import Purchase from "@/types/purchase";

const db = client.db("customerdb");

export async function calculateExpenses() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return null;
  }

  const purchaseCollection = db.collection("purchases");
  const purchases = (await purchaseCollection
    .find({ userId: new ObjectId(session.user.id) })
    .toArray()) as Purchase[];
  const totalExpenses = purchases.reduce(
    (sum: number, purchase: Purchase) => sum + (purchase.total || 0),
    0
  );

  return totalExpenses;
}

export async function calculateBalance() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return null;
  }

  const settingsCollection = db.collection("settings");
  const settings = await settingsCollection.findOne({
    userId: new ObjectId(session.user.id),
  });

  if (!settings || !settings.initialBalance) {
    return null;
  }

  const expenses = await calculateExpenses();
  if (expenses === null) {
    return null;
  }

  return settings.initialBalance - expenses;
}
