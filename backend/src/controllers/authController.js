import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/userModel.js";

const SECRET = "secretkey";

//register user
async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(name, email, hashedPassword);

    res.json({ message: "User Registered", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//login user

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = await jwt.sign(
      { userId: user._id, email: user.email },
      SECRET,
      { expiresIn: "1d" },
    );

    res.json({ message: "Login Successful", token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { register, login };
