const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = Schema({
  name: {
    type: String,
    require: true
  },
  calendar: [
    {
      type: Schema.Types.ObjectId,
      ref: "Performance"
    }
  ]
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);
module.exports = Exercise;
