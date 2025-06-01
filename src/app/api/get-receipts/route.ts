import { NextResponse } from "next/server";
import getReceipts from "@/lib/getReceipts";

export async function GET() {
  try {
    const receipts = await getReceipts();
    console.log(receipts);
    return NextResponse.json(receipts, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
