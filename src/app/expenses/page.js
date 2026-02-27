"use client";

import { useEffect, useState } from "react";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses =
      JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(storedExpenses);
  }, []);

  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  return (
    <div className="mt-12 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">
        All Expenses
      </h2>

      <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl shadow-2xl">
        <div className="mb-4 text-right text-xl font-semibold">
          Total: ₹{total}
        </div>

        {expenses.length === 0 ? (
          <p>No expenses added yet.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/40">
                <th className="p-3">Title</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr
                  key={index}
                  className="border-b border-white/20 hover:bg-white/10 transition"
                >
                  <td className="p-3">{expense.title}</td>
                  <td className="p-3">₹{expense.amount}</td>
                  <td className="p-3">{expense.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
