const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

// Get all workouts for a user
router.get("/:userId", async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new workout for a user
router.post("/:userId", async (req, res) => {
  const { exercise, sets, reps, weight } = req.body;

  if (!exercise || !sets || !reps) {
    return res.status(400).json({ message: "Exercise, sets, and reps are required" });
  }

  try {
    const workout = new Workout({
      user: req.params.userId,
      exercise,
      sets,
      reps,
      weight: weight || 0,
    });
    const newWorkout = await workout.save();
    res.status(201).json(newWorkout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a workout
router.put("/:id", async (req, res) => {
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedWorkout) return res.status(404).json({ message: "Workout not found" });
    res.json(updatedWorkout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a workout
router.delete("/:id", async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json({ message: "Workout deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
