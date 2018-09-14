const {
  register,
  login,
  forgotPassword,
  resetPassword,
  tokenLogin,
  addProgress
} = require("./controllers/UserControllers");
const { createNewExercise } = require("./controllers/ExerciseControllers");
const {
  createNewRoutine,
  addExerciseToRoutine
} = require("./controllers/RoutineControllers");
const { scheduleWorkout } = require("./controllers/WorkoutControllers");
const { verifyToken } = require("./utilities/auth");

module.exports = app => {
  app.route("/register").post(register);
  app.route("/login").post(login);
  app.route("/forgot_password").post(forgotPassword);
  app.route("/reset_password").post(resetPassword);
  app.route("/progress").post(addProgress);
  app.route("/auto-login").get(verifyToken, tokenLogin);
  app.route("/new-routine").post(createNewRoutine);
  app.route("/new-exercise").post(createNewExercise);
  app.route("/add-exercise").post(addExerciseToRoutine);
  app.route("/schedule-workout").post(scheduleWorkout);
};
