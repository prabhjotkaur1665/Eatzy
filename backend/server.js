                      // correct for seller only 

// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import connectDB from "./config/db.js";
// import sellerRoutes from "./routes/sellerRoutes.js";
// import userRoutes from "./routes/userRoutes.js"
// import menuRoutes from "./routes/menuRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cookieParser());
// app.use(express.json());

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

// app.use("/api/seller", sellerRoutes);

// app.get("/", (req, res) => {
//   res.send("API Running...");
// });


// app.use("/api/menu", menuRoutes);

// // app.use("/api/user", userRoutes);

// app.use("/api/users", userRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });












import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/seller", sellerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});