const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  exercises: [
    {
      exercise: {
        type: Schema.Types.ObjectId,
        ref: "exercises"
      }
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

const WorkoutSchema = mongoose.model("Workout", WorkoutSchema);
module.exports = WorkoutSchema;
