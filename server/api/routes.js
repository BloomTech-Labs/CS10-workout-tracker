const {
  register,
  login,
  addProgress,
  fetchProgress
} = require("./controllers/UserControllers");
module.exports = app => {
  app.route("/register").post(register);
  app.route("/login").post(login);
  app.route("/progress").post(addProgress);
  app.route("/fetchprogress/:username").get(fetchProgress);
};
