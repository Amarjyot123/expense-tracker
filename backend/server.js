import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();

const app = express();


// CONNECT DATABASE
connectDB();


// MIDDLEWARE
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running");
});
// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);


// TEST ROUTE (helps verify server works)
app.get("/", (req, res) => {
  res.send("API is running...");
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});