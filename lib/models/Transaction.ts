import mongoose, { Document, Schema } from "mongoose";
import { CategoryType, FIXED_CATEGORIES } from "../constants";

export interface ITransaction extends Document {
  amount: number;
  date: Date;
  description: string;
  category: CategoryType;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    amount: { type: Number, required: true },
    date: { type: Date, default: new Date() },
    description: { type: String, trim: true },
    category: {
      type: String,
      enum: FIXED_CATEGORIES,
      default: "Miscellaneous",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Transaction ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);
