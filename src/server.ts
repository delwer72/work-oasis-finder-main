import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import workspaceRoutes from "./routes/workspaceRoutes";
import bookingRoutes from "./routes/bookingRoutes";

// Environment ভ্যারিয়েবল লোড করা
dotenv.config();

// ডেটাবেস কানেক্ট করা
connectDB();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ইউজার রাউট কানেক্ট করা
app.use("/api/users", authRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/bookings", bookingRoutes);

// ডিফল্ট রাউট চেক
app.get("/", (req: Request, res: Response) => {
  res.send("WorkOasis API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});