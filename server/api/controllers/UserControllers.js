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
  const { username, password, recoveryQuestion, recoveryAnswer } = req.body;

  const newUser = new User({
    username,
    password,
    recoveryQuestion,
    recoveryAnswer
  });
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

const changePassword = (req, res) => {
  const { username, recoveryAnswer, password } = req.body;
  User.findOne({ username: username.toLowerCase() }).then(user => {
    console.log(user);
    user
      .checkRecoveryAnswer(recoveryAnswer)
      .then(success => {
        user.password = password;
        console.log(user.password);
        user.save(updatedPW => {
          res.status(200);
          res.json({ "New password": user.password });
        });
      })
      .catch(err => {
        res.status(422);
        res.json({ "Recovery answer incorrect": err.message });
      });
  });
};

module.exports = {
  register,
  login,
  changePassword
};
