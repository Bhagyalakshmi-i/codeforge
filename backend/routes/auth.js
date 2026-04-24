const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/User");


// ========================
// SIGNUP
// ========================
router.post("/signup", async (req, res) => {

  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: "Database unavailable. Please try again shortly."
    });
  }

  try {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "username, email and password are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.status(201).json({
      token,
      user
    });

  } catch (error) {

    console.error("Signup error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

});


// ========================
// LOGIN
// ========================
router.post("/login", async (req, res) => {

  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: "Database unavailable. Please try again shortly."
    });
  }

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.json({
      token,
      user
    });

  } catch (error) {

    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

module.exports = router;