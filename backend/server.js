import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();

// Connect database + cloud
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());

// 🟢 Step 1: Open CORS for all origins (testing / backend only)
app.use(
  cors({
    origin: "*", // TEMPORARY until frontend is deployed
    credentials: true,
  })
);

// 🟢 Step 2 (after frontend is deployed on vercel):
// Replace the above `app.use(cors(...))` with this:
// app.use(cors({
//   origin: "https://your-frontend.vercel.app",
//   credentials: true
// }));

// API Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Test Route
app.get("/", (req, res) => {
  res.send("✅ API Working on Vercel");
});

// ⛔ No app.listen() needed on Vercel
export default app;
