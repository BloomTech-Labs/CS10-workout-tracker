const {
  register,
  login,
  // changePassword,
  forgotPassword,
  resetPassword,
  sendGridTest,
  addProgress
} = require("./controllers/UserControllers");

module.exports = app => {
  app.route("/register").post(register);
  app.route("/login").post(login);
  // app.route("/changepw").put(changePassword);
  app.route("/forgot_password").post(forgotPassword);
  app.route("/reset_password").post(resetPassword);
  app.route("/test").post(sendGridTest);
  app.route("/progress").post(addProgress);
};
