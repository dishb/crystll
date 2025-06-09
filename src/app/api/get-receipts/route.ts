import { NextResponse } from "next/server";
import { auth } from "@/auth";
import client from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = client.db("receiptdb");
    const receiptColl = db.collection("receipts");
    const receipts = await receiptColl
      .find({ userId: new ObjectId(session.user.id) })
      .toArray();
    return NextResponse.json(receipts, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
