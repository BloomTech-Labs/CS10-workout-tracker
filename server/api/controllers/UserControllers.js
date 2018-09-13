const User = require("../models/User");
// const jwt = require("jsonwebtoken");
const { generateToken } = require("../utilities/auth");
require("dotenv").config();

const secret = process.env.SECRET;

// function generateToken(user) {
//   const options = {
//     expiresIn: "30m"
//   };
//   const payload = { name: user.username };

//   return jwt.sign(payload, secret, options);
// }

const register = (req, res) => {
  const { username, password } = req.body;

  const newUser = new User({ username, password });
  newUser
    .save()
    .then(createdUser => {
      const token = generateToken(createdUser.username);
      res.json({ createdUser, token });
    })
    .catch(err => {
      res.status(422);
      res.json({ "Error creating user": err.message });
    });
};

const login = (req, res) => {
  console.log("Trying to log in. Got this http request: ", req.body);
  const { username, password } = req.body;

  User.findOne({ username: username.toLowerCase() })
    .then(user => {
      console.log(`Found ${username} in the User collection:`, user);
      user
        .checkPassword(password)
        .then(success => {
          console.log(`${username}'s password was correct. Procuring a token...`);
          res.status(200);
          const token = generateToken(username);
          console.log(`Procured a token for ${username}:`, token);
          res.json({ user, token });
        })
        .catch(err => {
          console.log(`Failed to match ${username}'s PW.`);
          res.status(422);
          res.json({ "Password incorrect": err.message });
        });
    })
    .catch(err => {
      res.status(404);
      res.json({ "Username not found": err.message });
    });
};

const tokenLogin = (req, res) => {
  const username = req.username;

  User.findOne({ username: username.toLowerCase() })
    .then(user => {
          res.status(200);
          const token = generateToken(user.username);
          res.json({ user, token });
        })
    .catch(err => {
      res.status(404);
      res.json({ "Failed to login with your token: ": err.message });
    });
}

const ping = (req, res) => {
  const { username } = req.body;
  res.status(200);
  res.json({ "message": "The tokenized username is ok!", "tokenizedUsername": username });
}

module.exports = {
  register,
  login,
  tokenLogin,
  ping,
};
