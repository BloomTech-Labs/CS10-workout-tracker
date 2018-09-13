const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = Schema({
  name: {
    type: String,
    require: true
  },
  note: {
    type: String
  },
  calendar: [
    {
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
    }
  ]
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);
module.exports = Exercise;