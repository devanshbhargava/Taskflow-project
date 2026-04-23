import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================= SIGNUP =================
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔥 Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    // 🔥 Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists"
      });
    }

    // 🔥 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // 🔥 Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 🔥 Response
    res.status(201).json({
      message: "User created successfully",
      token
    });

  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({
      error: error.message
    });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔥 Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required"
      });
    }

    // 🔥 Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "User not found"
      });
    }

    // 🔥 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        error: "Wrong password"
      });
    }

    // 🔥 Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 🔥 Response
    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      error: error.message
    });
  }
};