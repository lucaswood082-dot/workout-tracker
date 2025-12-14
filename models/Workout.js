const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  exercise: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Workout", workoutSchema);
