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
