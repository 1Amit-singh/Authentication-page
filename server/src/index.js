import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

dotenv.config({ path: "./env" });

app.use(cors());

app.use("/api/auth", userRoutes);

connectDB();

app.listen(process.env.PORT, () => {
  console.log("server listening on port", process.env.PORT);
});
