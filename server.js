// Debug log
console.log("Server file loaded");

// Load environment variables
require('dotenv').config();

// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// API routes (ensure routes folder exists with workouts.js inside)
app.use("/api/workouts", require("./routes/workouts"));

// Serve index.html on root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
