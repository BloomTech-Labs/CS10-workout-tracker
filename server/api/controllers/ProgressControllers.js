const User = require("../models/User");
const Progress = require("../models/Progress");

const addProgress = (req, res) => {
  const userId = req.userId;
  const { weight, hips, waist, r_arm, l_arm, r_leg, l_leg } = req.body;
  const newProgressParameters = {
    weight,
    hips,
    waist,
    r_arm,
    l_arm,
    r_leg,
    l_leg,
    user: userId
  };
  const newProgress = new Progress(newProgressParameters);

  newProgress.save((err, createdProgress) => {
    if (err) {
      res.status(500);
      return res.json({ err });
    }
    User.findByIdAndUpdate(userId, { $push: { progress: createdProgress._id } })
      .then(updatedUser => {
        res.status(200);
        res.json({
          msg: "Successfully created a Progress document.",
          progress: createdProgress,
          user: updatedUser
        });
      })
      .catch(err => {
        res.status(500);
        res.json({ err });
      });
  });
};

const fetchProgress = (req, res) => {
  const userId = req.userId;

  User.findById(userId)
    .populate("progress")
    .then(foundUser => {
      res.json(foundUser);
    })
    .catch(err => {
      res.status(500);
      res.json({ err });
    });
};

const deleteProgress = (req, res) => {
  const { id } = req.params;
  Progress.findByIdAndRemove(id)
    .then(deletedProgress => {
      res.status(201);
      res.json(deletedProgress);
    })
    .catch(err => {
      res.status(500);
      res.json({ err });
    });
};

module.exports = {
  addProgress,
  fetchProgress,
  deleteProgress
};
