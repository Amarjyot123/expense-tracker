'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const schema = yup.object({
  title: yup.string().min(3, 'Min 3 chars').required('Title required'),
  amount: yup.number().positive('Amount > 0').required('Amount required'),
  date: yup.date().max(new Date(), 'No future dates').required('Date required')
});

export default function ExpenseForm({ onAdd }) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Simulate API call (1)
      await new Promise(r => setTimeout(r, 1000));
      
      // Auto-categorize (your AI feature)
      const category = categorizeExpense(data.title);
      
      const expense = { ...data, id: Date.now(), category };
      onAdd(expense);
      reset();
      toast.success('Expense added successfully!');
    } catch {
      toast.error('Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl">
      <h3 className="text-2xl font-bold text-center text-white mb-6">➕ Add New Expense</h3>
      
      <div>
        <input 
          {...register('title')}
          className={`w-full p-5 text-lg border-2 rounded-2xl focus:ring-4 focus:outline-none transition-all bg-white/80 backdrop-blur-sm ${
            errors.title 
              ? 'border-red-400 ring-red-200 bg-red-50/80' 
              : 'border-white/50 hover:border-white/70 focus:border-blue-400 focus:ring-blue-200'
          }`}
          placeholder="What did you buy? (Uber, Coffee, Groceries...)"
          disabled={loading}
        />
        {errors.title && (
          <p className="text-red-400 text-sm mt-2 flex items-center font-medium">
            <span className="w-3 h-3 bg-red-400 rounded-full mr-2 animate-pulse"></span>
            {errors.title.message}
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <input 
            type="number" 
            step="0.01"
            {...register('amount')}
            className={`w-full p-5 text-lg border-2 rounded-2xl focus:ring-4 focus:outline-none transition-all bg-white/80 backdrop-blur-sm ${
              errors.amount 
                ? 'border-red-400 ring-red-200 bg-red-50/80' 
                : 'border-white/50 hover:border-white/70 focus:border-green-400 focus:ring-green-200'
            }`}
            placeholder="₹ 150"
            disabled={loading}
          />
          {errors.amount && (
            <p className="text-red-400 text-sm mt-2 flex items-center font-medium">
              <span className="w-3 h-3 bg-red-400 rounded-full mr-2 animate-pulse"></span>
              {errors.amount.message}
            </p>
          )}
        </div>
        
        <input 
          type="date"
          {...register('date')}
          className="w-full p-5 text-lg border-2 rounded-2xl focus:ring-4 focus:outline-none border-white/50 hover:border-white/70 focus:border-purple-400 focus:ring-purple-200 bg-white/80 backdrop-blur-sm"
          max={new Date().toISOString().split('T')[0]}
          disabled={loading}
        />
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-6 rounded-2xl font-bold text-xl shadow-2xl hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" pathLength="1" className="opacity-25"/>
              <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"/>
            </svg>
            Adding Expense...
          </span>
        ) : (
          '➕ Add Expense'
        )}
      </button>
    </form>
  );
}

// Your AI categorization
function categorizeExpense(title) {
  const lower = title.toLowerCase();
  if (['food', 'coffee', 'restaurant', 'grocery'].some(k => lower.includes(k))) return 'Food';
  if (['uber', 'ola', 'taxi', 'bus', 'petrol'].some(k => lower.includes(k))) return 'Travel';
  if (['amazon', 'flipkart', 'shop'].some(k => lower.includes(k))) return 'Shopping';
  if (['rent', 'bill', 'electricity'].some(k => lower.includes(k))) return 'Bills';
  return 'Other';
}
