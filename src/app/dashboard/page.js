"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(stored);
  }, []);

  const total = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  return (
    <div className="text-white mt-12">

      <h1 className="text-4xl font-bold mb-10 text-center">
        Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white/20 p-6 rounded-2xl text-center">
          <h3 className="text-xl">Total Expenses</h3>
          <p className="text-3xl font-bold">₹{total}</p>
        </div>

        <div className="bg-white/20 p-6 rounded-2xl text-center">
          <h3 className="text-xl">Transactions</h3>
          <p className="text-3xl font-bold">{expenses.length}</p>
        </div>

      </div>

    </div>
  );
}