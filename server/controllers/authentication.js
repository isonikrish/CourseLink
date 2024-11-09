import User from "../models/user.js";
import { generateTokenandSetCookie } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
export async function handleSignup(req, res) {
  const { email, fullName, password, role } = req.body;
  try {
    if (!email || !fullName || !password || !role) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email is already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    generateTokenandSetCookie(newUser._id, res);
    return res.status(201).json({
      msg: "User created successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}
export async function handleLogin(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }
    const isPasswordvalid = await bcrypt.compare(password, user.password);
    if (!isPasswordvalid) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }
    generateTokenandSetCookie(user._id, res);
    return res.status(200).json({
      msg: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
export async function handleGetMe(req, res) {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
export async function handleLogout(req, res) {
  try {
    res.clearCookie("user");
    return res.status(200).json({ msg: "Logout successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
