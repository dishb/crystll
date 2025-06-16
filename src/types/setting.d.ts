import type { ObjectId } from "mongodb";

export default interface Setting {
  _id?: ObjectId;
  userId: ObjectId;
  initialBalance: number;
}
