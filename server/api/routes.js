const { register } = require("./controllers/UserControllers");
module.exports = app => {
  app.route("/register").post(register);
};
