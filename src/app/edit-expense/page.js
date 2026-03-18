"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditExpense() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const index = searchParams.get("index");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const expense = expenses[index];

    if (expense) {
      setTitle(expense.title);
      setCategory(expense.category || "");
      setAmount(expense.amount);
      setDate(expense.date);
    }
  }, [index]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    expenses[index] = {
      title,
      category,
      amount,
      date
    };

    localStorage.setItem("expenses", JSON.stringify(expenses));

    alert("Expense Updated Successfully!");

    router.push("/expenses");
  };

  return (
    <div className="flex justify-center mt-16">

      <div className="bg-white/20 backdrop-blur-md shadow-2xl p-8 rounded-3xl w-full max-w-md text-white">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Edit Expense
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/30 placeholder-white outline-none"
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/30 placeholder-white outline-none"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/30 placeholder-white outline-none"
            required
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/30 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-400 text-black p-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Update Expense
          </button>

        </form>

      </div>
    </div>
  );
}