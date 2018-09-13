const Exercise = require("../models/Exercise");
const User = require("../models/User");
const Workout = require("../models/Workout");

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
  createNewExercise
};
