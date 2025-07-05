"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Transaction } from "@/lib/types";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { format } from "date-fns";

export function MonthlyExpenseChart() {
  const [monthlyData, setMonthlyData] = useState<{ month: string; total: number }[]>([]);

  useEffect(() => {
    const fetchAndProcess = async () => {
      try {
        const res = await axios.get("/api/transactions");
        const txs: Transaction[] = res.data;

        const grouped: Record<string, number> = {};

        txs.forEach((tx) => {
          const key = format(new Date(tx.date), "MMM yyyy");
          grouped[key] = (grouped[key] || 0) + tx.amount;
        });

        const data = Object.entries(grouped).map(([month, total]) => ({ month, total }));
        data.sort((a, b) => new Date(`01 ${a.month}`).getTime() - new Date(`01 ${b.month}`).getTime());

        setMonthlyData(data);
      } catch (err) {
        console.error("Failed to load chart data", err);
      }
    };

    fetchAndProcess();
  }, []);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Monthly Expenses</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
