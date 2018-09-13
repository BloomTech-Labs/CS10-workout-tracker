const Exercise = require("../models/Exercise");
const User = require("../models/User");
const Workout = require("../models/Workout");

const createNewWorkout = (req, res) => {
  const { userId, title } = req.body;
  const newWorkoutParameters = { user: userId, title };
  const newWorkout = Workout(newWorkoutParameters);
  newWorkout.save((err, createdWorkout) => {
    if (err) {
      res.status(500);
      return res.json({ err });
    }
    User.findByIdAndUpdate(userId, { $push: { workouts: createdWorkout._id } })
      .then(updatedUser => {
        res.status(200);
        return res.json({
          msg: "Successfully created a Workout document.",
          workout: createdWorkout,
          user: updatedUser
        });
      })
      .catch(err => {
        res.status(500);
        return res.json({ err });
      });
  });
};

const addExerciseToWorkout = (req, res) => {
  const { workoutId, exerciseId } = req.body;
  Workout.findByIdAndUpdate(workoutId, { $push: { exercises: exerciseId}})
    .then(updatedWorkout => {
      res.status(200);
      return res.json({
        msg: "Successfully updated a Workout document with a new Exercise.",
        workout: updatedWorkout
      })
    })
    .catch(err => {
      res.status(500);
      return res.json({
        msg: "Couldn't update the Workout's Exercise list. Error follows: ",
        err
      })
    })
}

module.exports = {
  createNewWorkout,
  addExerciseToWorkout
};
