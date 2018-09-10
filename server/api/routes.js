const { register, login } = require("./controllers/UserControllers");
module.exports = app => {
  app.route("/register").post(register);
  app.route("/login").post(login);
};
