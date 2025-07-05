"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Transaction } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import  TransactionEdit  from "./transaction-edit";

export function TransactionTable({ onChange }: { onChange?: () => void }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const Router = useRouter();

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("/api/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to load transactions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    try {
      await axios.delete(`/api/transactions/${id}`);
      fetchTransactions();
      onChange?.();
    } catch (err) {
      console.error("Failed to delete transaction", err);
    }
  };


  const handleEdit = (id: string) => {
  Router.push(`/edit/${id}`);
};


  if (loading) return <p>Loading...</p>;
  if (!transactions.length) return <p>No transactions yet.</p>;

  return (
    <div className="rounded-md border">
      <table className="w-full table-auto text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-right">Amount</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id} className="border-t">
              <td className="px-4 py-2">{format(new Date(tx.date), "dd MMM yyyy")}</td>
              <td className="px-4 py-2">{tx.description}</td>
              <td className="px-4 py-2">{tx.category}</td>
              <td className="px-4 py-2 text-right">₹{tx.amount.toFixed(2)}</td>
              <td className="px-4 py-2 text-right">
                {/* Optional: Edit button here */}
                <TransactionEdit 
                  transaction={tx} 
                  transactionId={tx._id!} 
                />
                <Button variant="destructive" size="sm" onClick={() => handleDelete(tx._id!)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
