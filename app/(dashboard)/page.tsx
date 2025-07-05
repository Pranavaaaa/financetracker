import { TransactionForm } from "@/components/transaction-form";
import { TransactionTable } from "@/components/transaction-table";
import { MonthlyExpenseChart } from "@/components/transaction-chart";
import { CategoryWisePieChart } from "@/components/transaction-piechart";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <TransactionForm />
      </div>
      <div className="flex justify-between items-start gap-4 flex-wrap">
        <div className="flex-1 min-w-[300px]">
          <CategoryWisePieChart />
        </div>
        <div className="flex-1 min-w-[300px]">
          <MonthlyExpenseChart />
        </div>
      </div>

      <TransactionTable />
    </div>
  );
}
