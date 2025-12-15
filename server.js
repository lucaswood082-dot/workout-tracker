const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Serve frontend */
app.use(express.static(path.join(__dirname, "public")));

/* Connect to MongoDB FIRST */
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    /* API Routes */
    app.use("/api/users", require("./routes/users"));
    app.use("/api/workouts", require("./routes/workouts"));

    /* Catch-all: serve frontend */
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "public", "index.html"));
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });
