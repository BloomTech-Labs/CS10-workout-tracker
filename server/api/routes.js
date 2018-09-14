<<<<<<< HEAD
const { createNewExercise } = require("./controllers/ExerciseControllers");
const { register, login, tokenLogin } = require("./controllers/UserControllers");
const { createNewRoutine, addExerciseToRoutine } = require("./controllers/RoutineControllers");
const { scheduleWorkout } = require("./controllers/WorkoutControllers");
const { verifyToken } = require("./utilities/auth");

module.exports = app => {
  app.route("/register").post(register);
  app.route("/login").post(login);
  app.route("/auto-login").get(verifyToken, tokenLogin);
  app.route("/new-routine").post(createNewRoutine);
  app.route("/new-exercise").post(createNewExercise);
  app.route("/add-exercise").post(addExerciseToRoutine);
  app.route("/schedule-workout").post(scheduleWorkout);
=======
const {
  register,
  login,
  addProgress
} = require("./controllers/UserControllers");
module.exports = app => {
  app.route("/register").post(register);
  app.route("/login").post(login);
  app.route("/progress").post(addProgress);
>>>>>>> 4a6173c71823076606c24520ee184265c21c7ea6
};
