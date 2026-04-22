import express from "express";
import Expense from "../models/Expense.js";

const router = express.Router();


// ADD EXPENSE
router.post("/", async (req, res) => {

  try {

    const { title, amount, category } = req.body;

    const expense = new Expense({
      title,
      amount: Number(amount),
      category
    });

    await expense.save();

    res.json({
      message: "Expense added successfully",
      expense
    });

  } catch (error) {

    console.log("ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

});


// GET ALL EXPENSES
router.get("/", async (req, res) => {

  try {

    const expenses = await Expense.find();

    res.json(expenses);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

});


// DELETE EXPENSE
router.delete("/:id", async (req, res) => {

  try {

    await Expense.findByIdAndDelete(req.params.id);

    res.json({
      message: "Expense deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

});


// UPDATE EXPENSE
router.put("/:id", async (req, res) => {

  try {

    const { title, amount, category } = req.body;

    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, amount, category },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    res.json(expense);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

export default router;