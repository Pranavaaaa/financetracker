import { CategoryType } from "@/lib/constants";

export interface Transaction {
  _id?: string;
  amount: number;
  date: string;
  description: string;
  category: CategoryType;
}
