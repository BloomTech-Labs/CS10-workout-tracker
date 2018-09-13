const Exercise = require("../models/Exercise");
const User = require("../models/User");

const createExercise = (req, res) => {
  const {
    userId,
    name,
    note
  } = req.body;
  const newExercise = new Exercise({
    name,
    note,
    calendar: []
  });
  console.log(newExercise);
  newExercise.save()
    .then(savedExercise => {
      User.findByIdAndUpdate(userId, {
          $push: {
            exercises: savedExercise.doc._id
          }
        })
        .then(updatedUser => {
          res.json({
            msg: `Successfully created exercise for user ${userId}`
          });
        })
        .catch(err =>  {
          res.json({msg: "Faild to update user"});
        })
    })
    .catch(err => {
      res.json({msg: "Failed to save exercise", err});
    })
}

module.exports = {
  createExercise
};