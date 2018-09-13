const { createNewExercise } = require("./controllers/ExerciseControllers");
const { register, login, tokenLogin } = require("./controllers/UserControllers");
const { createNewWorkout, addExerciseToWorkout } = require("./controllers/WorkoutControllers");
const { verifyToken } = require("./utilities/auth");

module.exports = app => {
  app.route("/register").post(register);
  app.route("/login").post(login);
  app.route("/auto-login").get(verifyToken, tokenLogin);
  app.route("/new-workout").post(createNewWorkout);
  app.route("/new-exercise").post(createNewExercise);
  app.route("/add-exercise").post(addExerciseToWorkout);
};
