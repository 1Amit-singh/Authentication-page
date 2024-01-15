import express from "express";
import { register } from "../controllers/user.controllers.js";

const router = express.Router();
console.log(router);
router.post("/register", register);

export default router;
