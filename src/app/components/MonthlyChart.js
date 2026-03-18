"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function MonthlyChart({ expenses }) {

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const monthlyTotals = new Array(12).fill(0);

  expenses.forEach((expense) => {
    const month = new Date(expense.date).getMonth();
    monthlyTotals[month] += Number(expense.amount);
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: "Monthly Expenses",
        data: monthlyTotals,
        backgroundColor: "#36A2EB"
      }
    ]
  };

  return (
    <div className="mt-12 flex flex-col items-center">

      <h3 className="text-2xl font-bold mb-4 text-center">
        Monthly Expense Overview
      </h3>

      <div className="w-[500px] h-[300px]">
        <Bar
          data={data}
          options={{ maintainAspectRatio: false }}
        />
      </div>

    </div>
  );
}