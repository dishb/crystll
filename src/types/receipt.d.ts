import { type ObjectId } from "mongodb";

export default interface Receipt {
  merchant: string;
  total: number;
  tax: number;
  date: Date;
  time: string;
  userID: ObjectId;
  type: "receipt" | "invoice";
}
