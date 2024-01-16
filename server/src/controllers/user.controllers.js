import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    // console.log(req.body);

    // Validate input (simplified for illustration)
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields." });
    }

    // Check if the user already exists (you may use a database for this)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists." });
    }

    // hashing the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    newUser
      .save()
      .then((savedUser) => {
        console.log("User added Sucessfully: ", savedUser);
        res
          .status(201)
          .json({ message: "user added sucessfully", user: savedUser });
      })
      .catch((error) => {
        console.log("Error adding user: ", error);
      });

    // Respond with success message (you might want to send a token here for authentication)
    // res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // console.log(user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Password is valid, send the user data in the response
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
