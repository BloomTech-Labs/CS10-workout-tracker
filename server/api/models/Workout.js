const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// var deepPopulate = require('mongoose-deep-populate')(mongoose);

const WorkoutSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
    // default: Date.now()
  },
  routine: {
    type: Schema.Types.ObjectId,
    ref: "Routine",
    required: true
  },
  performances: [
    {
      type: Schema.Types.ObjectId,
      ref: "Performance"
    }
  ],
  note: {
    type: String
  }
});


// WorkoutSchema.plugin(deepPopulate);

const Workout = mongoose.model("Workout", WorkoutSchema);



// Workout.deepPopulate('performances.exercise', function (err, workouts) {
//   // _posts is the same instance as posts and provided for convenience
//   workouts.forEach(function (workout) {
//     // post.comments and post.comments.user are fully populated
//     return workout;
//   });
//   if(err) {
//     return err;
//   }
// });


module.exports = Workout;
