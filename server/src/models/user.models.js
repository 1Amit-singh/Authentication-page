import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      min: [8, "Password must be 8 digits or above"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
