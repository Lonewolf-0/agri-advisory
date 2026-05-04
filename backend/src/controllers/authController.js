import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const SECRET = "secretkey";

//register user
async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, SECRET);

    const user = await userModel.createUser(name, email, hashedPassword);

    res.json({ message: "User Registered", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//login user

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
