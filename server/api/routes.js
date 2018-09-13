const {
  register,
  login,
  addProgress
} = require("./controllers/UserControllers");
module.exports = app => {
  app.route("/register").post(register);
  app.route("/login").post(login);
  app.route("/progress/:user").post(addProgress);
};
