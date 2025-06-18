"use server";

import { auth } from "@/auth";
import client from "@/lib/db";
import { ObjectId } from "mongodb";
import Purchase from "@/types/purchase";

const db = client.db("customerdb");

export async function deleteAccount() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Not authenticated.");
    }

    const purchaseCollection = db.collection("purchases");
    const deletePurchases = await purchaseCollection.deleteMany({
      userId: new ObjectId(session.user.id),
    });

    const settingsCollection = db.collection("settings");
    const deleteSettings = await settingsCollection.deleteOne({
      userId: new ObjectId(session.user.id),
    });
    if (deleteSettings.deletedCount === 0) {
      throw new Error("An error occurred deleting your settings.");
    }

    const usersCollection = db.collection("users");
    const deleteUser = await usersCollection.deleteOne({
      _id: new ObjectId(session.user.id),
    });
    if (deleteUser.deletedCount === 0) {
      throw new Error("An error occurred deleting your user.");
    }

    const accountsCollection = db.collection("accounts");
    const deleetAccount = await accountsCollection.deleteOne({
      userId: new ObjectId(session.user.id),
    });
    if (deleetAccount.deletedCount === 0) {
      throw new Error("An error occurred deleting your account.");
    }

    return { ok: true };
  } catch (err: any) {
    return {
      ok: false,
      error: err.message || "An error occurred deleting your account.",
    };
  }
}

export async function calculateEarnings() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return null;
  }

  const purchaseCollection = db.collection("purchases");
  const earnings = (await purchaseCollection
    .find({
      userId: new ObjectId(session.user.id),
      type: "fundraiser",
    })
    .toArray()) as Purchase[];
  const totalEarnings = earnings.reduce(
    (sum: number, purchase: Purchase) => sum + (purchase.total || 0),
    0
  );

  return totalEarnings;
}

export async function calculateExpenses() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return null;
  }

  const purchaseCollection = db.collection("purchases");
  const purchases = (await purchaseCollection
    .find({
      userId: new ObjectId(session.user.id),
      type: { $ne: "fundraiser" },
    })
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

  const earnings = await calculateEarnings();
  if (earnings === null) {
    return null;
  }

  return settings.initialBalance - expenses + earnings;
}
