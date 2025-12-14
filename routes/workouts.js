const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

// Add a workout
router.post("/", async (req, res) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all workouts for a user
router.get("/:user", async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.params.user });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
