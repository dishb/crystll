import { NextResponse } from "next/server";
import { auth } from "@/auth";
import client from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = client.db("customerdb");
    const purchaseCollection = db.collection("purchases");
    const purchases = await purchaseCollection
      .find({ userId: new ObjectId(session.user.id) })
      .toArray();
    return NextResponse.json(purchases, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
