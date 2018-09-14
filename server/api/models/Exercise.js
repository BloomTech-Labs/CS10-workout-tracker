const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// The Exercise collection contains one document for every different exercise the
// user performs - for instance, a user could have a single Exercise doc with the name `Push-Up` or `Bench Press`.
// The Exercise doc contains a list of references to each Performance of the Exercise.
// It could be further expanded with metadata about the user's lifetime performance of the exercise.

const ExerciseSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    require: true
  },
  performanceLog: [{
    type: Schema.Types.ObjectId,
    ref: "Performance"
  }]
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);
module.exports = Exercise;
