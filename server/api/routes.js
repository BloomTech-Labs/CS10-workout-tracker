const {
  register,
  login,
  changePassword
} = require("./controllers/UserControllers");
module.exports = app => {
  app.route("/register").post(register);
  app.route("/login").post(login);
  app.route("/changepw").put(changePassword);
};
