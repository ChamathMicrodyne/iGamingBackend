import express from "express";
import mongoose from "mongoose";
import navbaritemRouter from "./routes/navbaritemRouter.js";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import footerRouter from "./routes/footerRouter.js";
import newsRouter from "./routes/newsRouter.js";
import categoryitemRouter from "./routes/categoryRouter.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: "*", // Add HTTP variant if testing
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: false,
}));

app.use(express.json());
app.use(bodyParser.json());


// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to the Database!");
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message, err.stack);
    process.exit(1);
  });

// Routes
//app.use("/api/user", userRouter);
app.use("/api/news", newsRouter);
app.use("/api/category", categoryitemRouter);
//app.use("/api/navbaritem", navbaritemRouter);
//app.use("/api/footer", footerRouter);

// Export for Vercel serverless
app.listen(port, () => {
  console.log("Server is running on port " + port);
  console.log(`Server is available at http://localhost:${port}`);
});
