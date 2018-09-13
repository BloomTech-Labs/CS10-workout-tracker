const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET;

function generateToken(user) {
  const options = {
    expiresIn: "30m"
  };
  const payload = { name: user.username };

  return jwt.sign(payload, secret, options);
}

const register = (req, res) => {
  const { username, password } = req.body;

  const newUser = new User({ username, password });
  newUser
    .save()
    .then(createdUser => {
      const token = generateToken(createdUser);
      res.json({ createdUser, token });
    })
    .catch(err => {
      res.status(422);
      res.json({ "Error creating user": err.message });
    });
};

const login = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username.toLowerCase() })
    .then(user => {
      user
        .checkPassword(password)
        .then(success => {
          res.status(200);
          const token = generateToken(user);
          res.json({ username, token });
        })
        .catch(err => {
          res.status(422);
          res.json({ "Password incorrect": err.message });
        });
    })
    .catch(err => {
      res.status(404);
      res.json({ "Username not found": err.message });
    });
};

const addProgress = (req, res) => {
  const { weight, hips, waist, r_arm, l_arm, r_leg, l_leg, user } = req.body;
  // const { user } = req.params;
  User.findOne({ username: user.toLowerCase() })
    .then(user => {
      const newProgress = { weight, hips, waist, r_arm, l_arm, r_leg, l_leg }

      user.progress.push(newProgress);
      user.save()
        .then(user => {
          res.json(user);
        })
    })
    .catch(err => {
      res.status(422)
      res.json({ "Error submitting progress": err.message })
    })
}

module.exports = {
  register,
  login,
  addProgress
};
