const {
  register,
  login,
  forgotPassword,
  resetPassword,
<<<<<<< HEAD
  tokenLogin,
  addProgress,
  changePassword,
  changeEmail
=======
  tokenLogin
>>>>>>> cc8d49d27e0be53f8dadb657faa1090b6449eb84
} = require("./controllers/UserControllers");
const { createNewExercise } = require("./controllers/ExerciseControllers");
const { createNewRoutine, addExerciseToRoutine } = require("./controllers/RoutineControllers");
const { scheduleWorkout } = require("./controllers/WorkoutControllers");
const { addProgress, fetchProgress, deleteProgress } = require("./controllers/ProgressControllers");
const { verifyToken } = require("./utilities/auth");


module.exports = app => {
  app.route("/register").post(register);
  app.route("/login").post(login);
  app.route("/progress").post(verifyToken, addProgress);
  app.route("/progress").get(verifyToken, fetchProgress);
  app.route("/progress/:id").delete(verifyToken, deleteProgress);
  app.route("/forgot_password").post(forgotPassword);
  app.route("/reset_password").post(resetPassword);
<<<<<<< HEAD
  app.route("/settings_password").post(changePassword);
  app.route("/settings_email").post(changeEmail);
  app.route("/progress").post(addProgress);
=======
>>>>>>> cc8d49d27e0be53f8dadb657faa1090b6449eb84
  app.route("/auto-login").get(verifyToken, tokenLogin);
  app.route("/new-routine").post(createNewRoutine);
  app.route("/new-exercise").post(createNewExercise);
  app.route("/add-exercise").post(addExerciseToRoutine);
  app.route("/schedule-workout").post(scheduleWorkout);
};
