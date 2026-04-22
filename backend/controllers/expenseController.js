const Expense = require("../models/Expense");

// GET all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD new expense
exports.addExpense = async (req, res) => {
  try {
    const expense = new Expense(req.body);
    const savedExpense = await expense.save();
    res.json(savedExpense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE expense
exports.updateExpense = async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedExpense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE expense
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};