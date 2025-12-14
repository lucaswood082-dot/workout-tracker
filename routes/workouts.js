const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

// GET all workouts
router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new workout
router.post("/", async (req, res) => {
  const { exercise, sets, reps, weight } = req.body;

  // Basic validation
  if (!exercise || !sets || !reps) {
    return res.status(400).json({ message: "Exercise, sets, and reps are required" });
  }

  const workout = new Workout({
    exercise,
    sets,
    reps,
    weight: weight || 0, // default to 0 if not provided
  });

  try {
    const newWorkout = await workout.save();
    res.status(201).json(newWorkout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET a single workout by ID
router.get("/:id", async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a workout by ID
router.delete("/:id", async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json({ message: "Workout deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a workout by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedWorkout) return res.status(404).json({ message: "Workout not found" });
    res.json(updatedWorkout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
