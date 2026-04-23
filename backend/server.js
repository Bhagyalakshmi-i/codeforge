const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
console.log("CORRECT SERVER RUNNING");

// Layer 1: Manual headers (catches everything)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  // Intercept preflight immediately
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// Layer 2: cors package as backup
app.use(cors({ origin: "*" }));

app.use(express.json());

const authRoutes = require("./routes/auth");
const problemRoutes = require("./routes/problems");
app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

app.get("/", (req, res) => res.send("CodeForge Backend Running"));

app.listen(8000, () => {
    console.log("Server running on port 8000");
  });
