import express from "express";
import { register } from "../controllers/user.controllers.js";

const router = express.Router();
router.post("/register", (req, res) => {
  console.log("Received registration request:", req.body);
  register(req, res);
});
export default router;
