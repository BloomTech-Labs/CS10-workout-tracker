const { register, login, tokenLogin } = require("./controllers/UserControllers");
const { verifyToken } = require("./utilities/auth");

module.exports = app => {
  app.route("/register").post(register);
  app.route("/login").post(login);
  app.route("/auto-login").get(verifyToken, tokenLogin);
};
