"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart({ expenses }) {

  const categories = {};

  expenses.forEach((expense) => {
    const cat = expense.category || "Other";
    categories[cat] = (categories[cat] || 0) + Number(expense.amount);
  });

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(categories),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF"
        ],
      },
    ],
  };

  return (
    <div className="mt-10 flex flex-col items-center">

      <h3 className="text-2xl font-bold mb-4 text-center">
        Expense Breakdown
      </h3>

      {/* Chart Container with limited size */}
      <div className="w-72 h-72">
        <Pie
          data={data}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>

    </div>
  );
}
