"use server";

import { auth } from "@/auth";
import client from "@/lib/db";
import Setting from "@/types/setting";
import { ObjectId } from "mongodb";

export async function getSettings() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Not authenticated.");
    }

    const db = client.db("customerdb");
    const settingsCollection = db.collection("settings");
    const settings = await settingsCollection.findOne({
      userId: new ObjectId(session.user.id),
    });

    if (!settings || settings.matchedCount === 0) {
      throw new Error("Settings not found or not authorized.");
    }

    return { ok: true, settings };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function setupSettings(formData: FormData) {
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

export async function updateSettings(formData: FormData) {
  const balance = formData.get("balance") as string;

  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Not authenticated.");
    }

    const db = client.db("customerdb");
    const settingsCollection = db.collection("settings");

    const result = await settingsCollection.updateOne(
      { userId: new ObjectId(session.user.id) },
      {
        $set: {
          initialBalance: parseInt(balance),
        },
      }
    );

    if (result.matchedCount === 0) {
      throw new Error("Settings not found or not authorized.");
    }

    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}
