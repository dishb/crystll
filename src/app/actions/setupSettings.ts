"use server";

import { auth } from "@/auth";
import client from "@/lib/db";
import Setting from "@/types/setting";
import { ObjectId } from "mongodb";

export default async function setupSettings(formData: FormData) {
  const balance = formData.get("balance") as string;

  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Not authenticated.");
    }

    const db = client.db("customerdb");
    const settingsCollection = db.collection("settings");
    const setting: Setting = {
      userId: new ObjectId(session.user.id),
      initialBalance: parseInt(balance),
    };

    await settingsCollection.insertOne(setting);

    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}
