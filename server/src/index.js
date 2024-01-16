import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import cors from "cors";
import router from "./routes/userRoutes.js";

connectDB();

const app = express();
dotenv.config({ path: "./env" });

// middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", router);

app.listen(process.env.PORT || 3000, () => {
  console.log("server listening on port", process.env.PORT);
});
