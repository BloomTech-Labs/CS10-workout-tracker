const {
  register,
  login,
  forgotPassword,
  resetPassword,
  tokenLogin,
  changePassword,
  changeEmail,
  processPayment
} = require("./controllers/UserControllers");
const {
  createNewExercise,
  fetchExerciseDoc,
  updateExerciseDoc
} = require("./controllers/ExerciseControllers");
const {
  createNewRoutine,
  addExerciseToRoutine,
  fetchRoutineDoc,
  updateRoutineDoc,
  fetchHydratedRoutines
} = require("./controllers/RoutineControllers");
const { scheduleWorkout, fetchWorkoutDoc } = require("./controllers/WorkoutControllers");
const {
  addProgress,
  fetchProgress,
  deleteProgress,
  updateProgress
} = require("./controllers/ProgressControllers");
const { verifyToken } = require("./utilities/auth");

module.exports = app => {
  app.route("/register").post(register);
  app.route("/login").post(login);
  app.route("/progress").post(verifyToken, addProgress);
  app.route("/progress").get(verifyToken, fetchProgress);
  app.route("/progress/:id").delete(verifyToken, deleteProgress);
  app.route("/progress/:id").put(verifyToken, updateProgress);
  app.route("/forgot_password").post(forgotPassword);
  app.route("/reset_password").post(resetPassword);
  app.route("/settings_password").post(verifyToken, changePassword);
  app.route("/settings_email").post(verifyToken, changeEmail);
  app.route("/charge").post(verifyToken, processPayment);
  app.route("/auto-login").get(verifyToken, tokenLogin);
  app.route("/new-routine").post(verifyToken, createNewRoutine);
  app.route("/new-exercise").post(verifyToken, createNewExercise);
  app.route("/add-exercise").post(verifyToken, addExerciseToRoutine);
  app.route("/schedule-workout").post(verifyToken, scheduleWorkout);
  app.route("/fetch-workout").post(verifyToken, fetchWorkoutDoc);

  app.route("/routine").get(verifyToken, fetchRoutineDoc);
  app.route("/routine").put(verifyToken, updateRoutineDoc);
  app.route("/routines").get(verifyToken, fetchHydratedRoutines);

  app.route("/exercise").get(verifyToken, fetchExerciseDoc);
  app.route("/exercise").put(verifyToken, updateExerciseDoc);

};
