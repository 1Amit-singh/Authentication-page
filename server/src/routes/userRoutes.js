import express from "express";
import { login, register } from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/register", (req, res) => {
  //   console.log("Received registration request:", req.body);
  register(req, res);
});
router.post("/login", (req, res) => {
  //   console.log("Received login request:", req.body);
  login(req, res);
});
export default router;
