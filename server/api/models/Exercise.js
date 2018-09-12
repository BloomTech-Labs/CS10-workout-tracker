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
  calender: [
    {
      date: {
        type: Date,
        required: tre
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

const ExerciseSchema = mongoose.model("Exercise", ExerciseSchema);
module.exports = ExerciseSchema;