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
    });
};

const updateExerciseDoc = (req, res) => {
  const { name, currentWeight, currentReps, currentSets, exerciseId } = req.body;
  console.log("Got these vars from req.body: ", name, currentWeight, currentReps, currentSets, exerciseId);
  Exercise.findByIdAndUpdate(
    exerciseId,
    { $set: { name: name, currentWeight: currentWeight, currentReps: currentReps, currentSets: currentSets } },
    { new: true }
  )
    .then(exerciseDocument => {
      return res.status(200).json(exerciseDocument);
    })
    .catch(err => {
      return res.status(400).json({ err });
    });
};

const createNewExercise = (req, res) => {
  const { userId } = req;
  let { name, currentWeight, currentReps, currentSets } = req.body;
  if (!name) name = "Unnamed Exercise";
  console.log(
    "Making a new exercise with this user reference and name: ",
    userId,
    name
  );
  const newExerciseParameters = { user: userId, name, currentWeight, currentReps, currentSets };
  const newExercise = new Exercise(newExerciseParameters);
  newExercise.save((err, createdExercise) => {
    if (err) {
      res.status(500);
      return res.json({ err });
    }
    User.findByIdAndUpdate(userId, {
      $push: { exercises: createdExercise._id }
    })
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
  fetchExerciseDoc,
  updateExerciseDoc
};
