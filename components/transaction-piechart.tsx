// financetracker/components/transaction-piechart.tsx

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Transaction } from "@/lib/types";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c", "#d0ed57", "#ffc658", "#ffbb28"];

export function CategoryWisePieChart() {
  const [categoryData, setCategoryData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchAndProcess = async () => {
      try {
        const res = await axios.get("/api/transactions");
        const txs: Transaction[] = res.data;

        const grouped: Record<string, number> = {};

        txs.forEach((tx) => {
          grouped[tx.category] = (grouped[tx.category] || 0) + tx.amount;
        });

        const data = Object.entries(grouped).map(([name, value]) => ({ name, value }));
        setCategoryData(data);
      } catch (err) {
        console.error("Failed to load pie chart data", err);
      }
    };

    fetchAndProcess();
  }, []);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Category-wise Expenses</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}



