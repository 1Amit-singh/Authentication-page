import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  console.log(req.body);
  next();
};
