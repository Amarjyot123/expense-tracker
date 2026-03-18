"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddExpense() {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      title,
      amount,
      date,
      category
    };

    const existing =
      JSON.parse(localStorage.getItem("expenses")) || [];

    localStorage.setItem(
      "expenses",
      JSON.stringify([...existing, newExpense])
    );

    setTitle("");
    setAmount("");
    setDate("");
    setCategory("");

    alert("Expense Added Successfully!");

    router.push("/expenses");
  };

  return (
    <div className="flex justify-center mt-16">
      <div className="bg-white/20 backdrop-blur-md shadow-2xl p-8 rounded-3xl w-full max-w-md text-white">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Add New Expense
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/30 placeholder-white outline-none"
            required
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/30 outline-none"
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food 🍔</option>
            <option value="Travel">Travel ✈</option>
            <option value="Shopping">Shopping 🛍</option>
            <option value="Bills">Bills 💡</option>
            <option value="Other">Other</option>
          </select>

          {/* Amount */}
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/30 placeholder-white outline-none"
            required
          />

          {/* Date */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/30 outline-none"
            required
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black p-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Add Expense
          </button>

        </form>
      </div>
    </div>
  );
}