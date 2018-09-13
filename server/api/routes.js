const { register, login } = require("./controllers/UserControllers");
const { createExercise } = require("./controllers/ExerciseControllers");
module.exports = app => {
  app.route("/register").post(register);
  app.route("/login").post(login);
  app.route("/newexercise").post(createExercise);
};
