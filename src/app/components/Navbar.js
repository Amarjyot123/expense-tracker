"use client"; // ADD THIS for client-side features
import Link from "next/link";
import { usePathname } from "next/navigation"; // ADD ACTIVE STATE

export default function Navbar() {
  const pathname = usePathname(); // TRACK CURRENT PAGE

  return (
    <nav className="bg-white/20 backdrop-blur-md shadow-xl border-b border-white/30 text-white p-4 sm:p-6 flex justify-between items-center rounded-b-3xl sticky top-0 z-50">
      {/* Logo - Enhanced */}
      <h1 className="text-2xl sm:text-3xl font-bold tracking-wide bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent hover:scale-105 transition-transform">
        💰 Smart Expense Tracker
      </h1>
      
      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6 font-semibold">
        <Link 
          href="/" 
          className={`px-3 py-2 rounded-xl transition-all duration-300 ${
            pathname === '/' 
              ? 'bg-white/20 backdrop-blur-sm shadow-md text-yellow-300 border border-yellow-300/50' 
              : 'hover:text-yellow-300 hover:bg-white/10 hover:shadow-md'
          }`}
        >
          🏠 Home
        </Link>
        <Link 
          href="/add-expense" 
          className={`px-3 py-2 rounded-xl transition-all duration-300 ${
            pathname === '/add-expense' 
              ? 'bg-white/20 backdrop-blur-sm shadow-md text-yellow-300 border border-yellow-300/50' 
              : 'hover:text-yellow-300 hover:bg-white/10 hover:shadow-md'
          }`}
        >
          ➕ Add Expense
        </Link>
        <Link 
          href="/expenses" 
          className={`px-3 py-2 rounded-xl transition-all duration-300 ${
            pathname === '/expenses' 
              ? 'bg-white/20 backdrop-blur-sm shadow-md text-yellow-300 border border-yellow-300/50' 
              : 'hover:text-yellow-300 hover:bg-white/10 hover:shadow-md'
          }`}
        >
          📊 View Expenses
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden p-2 rounded-xl hover:bg-white/20 transition-all">
        ☰
      </button>
    </nav>
  );
}
