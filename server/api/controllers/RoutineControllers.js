const User = require("../models/User");
const Routine = require("../models/Routine");

// A Routine is a set of Exercises you intend to perform together. Once you have a
// Routine with at least one Exercise, you can use it to schedule a Workout.
const createNewRoutine = (req, res) => {
  const { userId, title } = req.body;
  const newRoutineParameters = { user: userId, title };
  const newRoutine = Routine(newRoutineParameters);
  newRoutine.save((err, createdRoutine) => {
    if (err) {
      res.status(500);
      return res.json({ err });
    }
    User.findByIdAndUpdate(userId, { $push: { routines: createdRoutine._id } })
      .then(updatedUser => {
        res.status(200);
        return res.json({
          msg: "Successfully created a Routine document.",
          routine: createdRoutine,
          user: updatedUser
        });
      })
      .catch(err => {
        res.status(500);
        return res.json({ err });
      });
  });
};

const addExerciseToRoutine = (req, res) => {
  const { routineId, exerciseId } = req.body;
  Routine.findByIdAndUpdate(routineId, { $push: { exercises: exerciseId}})
    .then(updatedRoutine => {
      res.status(200);
      return res.json({
        msg: "Successfully updated a Routine document with a new Exercise.",
        routine: updatedRoutine
      })
    })
    .catch(err => {
      res.status(500);
      return res.json({
        msg: "Couldn't update the Routine's Exercise list. Error follows: ",
        err
      })
    })
}

module.exports = {
  createNewRoutine,
  addExerciseToRoutine
};
