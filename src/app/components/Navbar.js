import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white/20 backdrop-blur-md shadow-lg text-white p-4 flex justify-between items-center rounded-b-2xl">
      <h1 className="text-2xl font-bold tracking-wide">
        💰 Smart Expense Tracker
      </h1>
      <div className="space-x-6 font-medium">
        <Link href="/" className="hover:text-yellow-300 transition">
          Home
        </Link>
        <Link href="/add-expense" className="hover:text-yellow-300 transition">
          Add Expense
        </Link>
        <Link href="/expenses" className="hover:text-yellow-300 transition">
          View Expenses
        </Link>
      </div>
    </nav>
  );
}