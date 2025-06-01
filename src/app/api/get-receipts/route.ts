import client from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const receiptDB = client.db("receiptdb");
  const receiptColl = receiptDB.collection("receipts");

  try {
    const receipts = receiptColl.find();
    return NextResponse.json(receipts, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
