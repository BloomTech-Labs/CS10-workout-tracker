const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = Schema({
  title: {
    type: String,
    required: true
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise"
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;
