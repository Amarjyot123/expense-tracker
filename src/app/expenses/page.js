"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ExpenseChart from "../components/ExpenseChart";
import MonthlyChart from "../components/MonthlyChart";

export default function Expenses() {

  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const router = useRouter();

  useEffect(() => {
    const storedExpenses =
      JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(storedExpenses);
  }, []);

  // Delete Expense
  const deleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setExpenses(updatedExpenses);
  };

  // Export CSV
  const exportCSV = () => {

    const rows = [
      ["Title", "Category", "Amount", "Date"],
      ...expenses.map((e) => [
        e.title,
        e.category || "General",
        e.amount,
        e.date,
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "expenses.csv";
    link.click();
  };

  // Filter Logic
  const filteredExpenses = expenses.filter((expense) => {

    const matchesSearch = expense.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      (expense.category || "General") === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Total Amount
  const total = filteredExpenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  // Unique categories count
  const categoriesCount = new Set(
    expenses.map((e) => e.category || "General")
  ).size;

  return (
    <div className="mt-12 text-white">

      <h2 className="text-3xl font-bold mb-6 text-center">
        Expense Dashboard
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl text-center">
          <h3 className="text-lg">Total Expenses</h3>
          <p className="text-2xl font-bold">{expenses.length}</p>
        </div>

        <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl text-center">
          <h3 className="text-lg">Total Amount</h3>
          <p className="text-2xl font-bold">₹{total}</p>
        </div>

        <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl text-center">
          <h3 className="text-lg">Categories</h3>
          <p className="text-2xl font-bold">{categoriesCount}</p>
        </div>

      </div>

      {/* Search + Filter */}
      <div className="flex justify-center gap-4 mb-6">

        <input
          type="text"
          placeholder="Search expenses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 rounded-xl w-64 bg-white/30 placeholder-white outline-none"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-3 rounded-xl bg-white/30 text-white outline-none"
        >
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>

        <button
          onClick={exportCSV}
          className="bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600"
        >
          Export CSV
        </button>

      </div>

      {/* Table Section */}
      <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl shadow-2xl">

        {filteredExpenses.length === 0 ? (
          <p>No expenses found.</p>
        ) : (
          <>

            <table className="w-full text-left">

              <thead>
                <tr className="border-b border-white/40">
                  <th className="p-3">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredExpenses.map((expense, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/20 hover:bg-white/10 transition"
                  >

                    <td className="p-3">{expense.title}</td>

                    <td className="p-3">
                      {expense.category || "General"}
                    </td>

                    <td className="p-3">₹{expense.amount}</td>

                    <td className="p-3">{expense.date}</td>

                    <td className="p-3 space-x-2">

                      <button
                        onClick={() =>
                          router.push(`/edit-expense?index=${index}`)
                        }
                        className="bg-yellow-400 text-black px-3 py-1 rounded-lg hover:bg-yellow-500"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteExpense(index)}
                        className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

            {/* Charts */}
            <ExpenseChart expenses={filteredExpenses} />

            <MonthlyChart expenses={filteredExpenses} />

          </>
        )}

      </div>

    </div>
  );
}