const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("Missing required env var: JWT_SECRET");
  process.exit(1);
}

if (!MONGO_URI) {
  console.error("Missing required env var: MONGO_URI");
  process.exit(1);
}

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

app.get("/", (req, res) => res.send("CodeForge Backend Running"));

async function startServer() {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  const connectWithRetry = async () => {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("MongoDB Connected");
    } catch (err) {
      console.error("MongoDB Error:", err);
      console.log("Retrying MongoDB connection in 10 seconds...");
      setTimeout(connectWithRetry, 10000);
    }
  };

  connectWithRetry();
}

startServer();
