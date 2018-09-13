const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PerformanceSchema = Schema({
  exercise: {
    type: Schema.Types.ObjectId,
    ref: "Exercise"
  },
  note: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const Performance = mongoose.model("Performance", PerformanceSchema);
module.exports = Performance;
