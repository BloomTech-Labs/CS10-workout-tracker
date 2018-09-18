const Exercise = require("../models/Exercise");
const User = require("../models/User");
const Workout = require("../models/Workout");

// Remember, an Exercise document contains the high-level info for an exercise
// you perform, like Pull-Ups or Bench Press. Specific performances of an Exercise
// are recorded as Performances.

const fetchExerciseDoc = (req, res) => {
  const { exerciseId } = req.body;
  Exercise.findById(exerciseId)
    .then(exerciseDocument => {
      return res.status(200).json(exerciseDocument);
    })
    .catch(err => {
      return res.status(404).json({ err });
    })
}

const createNewExercise = (req, res) => {
  const { userId, name } = req.body;
  const newExerciseParameters = { user: userId, name };
  const newExercise = Exercise(newExerciseParameters);
  newExercise.save((err, createdExercise) => {
    if (err) {
      res.status(500);
      return res.json({ err });
    }
    User.findByIdAndUpdate(userId, { $push: { exercises: createdExercise._id } })
      .then(updatedUser => {
        res.status(200);
        return res.json({
          msg: "Successfully created an Exercise document.",
          exercise: createdExercise,
          user: updatedUser
        });
      })
      .catch(err => {
        res.status(500);
        return res.json({ err });
      });
  });
};

module.exports = {
  createNewExercise,
  fetchExerciseDoc
};
