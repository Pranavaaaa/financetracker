import { z } from "zod";
import { FIXED_CATEGORIES } from "./constants";

export const transactionSchema = z.object({
  amount: z.coerce.number().positive(), // 👈 this converts string to number
  date: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(FIXED_CATEGORIES),
});


export type TransactionFormData = z.infer<typeof transactionSchema>;
