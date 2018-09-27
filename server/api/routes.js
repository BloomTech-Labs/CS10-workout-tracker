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
  fetchHydratedRoutine,
  fetchHydratedRoutines,
  deleteRoutineDoc
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

// USER
  app.route("/register").post(register);
  app.route("/login").post(login);
  app.route("/forgot_password").post(forgotPassword);
  app.route("/reset_password").post(resetPassword);

  app.route("/auto-login").get(verifyToken, tokenLogin);
  app.route("/settings_password").post(verifyToken, changePassword);
  app.route("/settings_email").post(verifyToken, changeEmail);
  app.route("/charge").post(verifyToken, processPayment);

// PROGRESS
  app.route("/progress").post(verifyToken, addProgress);
  app.route("/progress").get(verifyToken, fetchProgress);
  app.route("/progress/:id").delete(verifyToken, deleteProgress);
  app.route("/progress/:id").put(verifyToken, updateProgress);

// ROUTINES
  app.route("/new-routine").post(verifyToken, createNewRoutine);
  app.route("/routine").get(verifyToken, fetchRoutineDoc);
  app.route("/routine").put(verifyToken, updateRoutineDoc);
  app.route("/routine").delete(verifyToken, deleteRoutineDoc)

  app.route("/routines").get(verifyToken, fetchHydratedRoutines); // Maybe different category.
  app.route("/routine-rich").post(verifyToken, fetchHydratedRoutine); // Coding this as a POST is a bit hacky. It's really more of a GET but it needs the additional request data. Could be moved to a header?

// EXERCISES
  app.route("/new-exercise").post(verifyToken, createNewExercise);
  app.route("/add-exercise").post(verifyToken, addExerciseToRoutine);
  app.route("/exercise").get(verifyToken, fetchExerciseDoc);
  app.route("/exercise").put(verifyToken, updateExerciseDoc);

// WORKOUTS
  app.route("/schedule-workout").post(verifyToken, scheduleWorkout);
  app.route("/fetch-workout").post(verifyToken, fetchWorkoutDoc);

// PERFORMANCES

};

// NOTES
// In order to pass a request body in a PUT, DELETE, or GET request, set the `data` property on the config parameter in your request.
// You will need to do this to target the document you are after when manipulating any collection other than Users
// Example: axios.delete(url, { data: { foo: "bar" } });
// Also see https://github.com/axios/axios/issues/897#issuecomment-343715381