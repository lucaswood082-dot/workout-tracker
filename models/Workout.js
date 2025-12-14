const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  user: String,
  exercise: String,
  sets: Number,
  reps: Number,
  weight: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Workout", WorkoutSchema);
