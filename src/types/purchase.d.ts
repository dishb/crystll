import type { ObjectId } from "mongodb";

export default interface Purchase {
  _id?: ObjectId;
  title: string;
  merchant: string;
  total: number;
  tax: number;
  date: Date;
  time: string;
  userId: ObjectId;
  type: "receipt" | "invoice";
}
