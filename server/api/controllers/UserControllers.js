const User = require("../models/User");

const register = (req, res) => {
  const { username, password } = req.body;

  const newUser = new User({ username, password });
  newUser
    .save()
    .then(createdUser => {
      res.json(createdUser);
    })
    .catch(err => {
      res.status(422);
      res.json({ "Error creating user": err.message });
    });
};

module.exports = {
  register
};
