const Exercise = require("../models/Exercise");
const Performance = require("../models/Performance");
const User = require("../models/User");
const Routine = require("../models/Routine");
const Workout = require("../models/Workout");

const scheduleWorkout = (req, res) => {
  const { routineId, userId, date, note } = req.body;
  const workoutParams = { routine: routineId, user: userId, date, note };
  const newWorkout = new Workout(workoutParams);
  console.log("Made this new Workout document - about to link it up:", newWorkout);
  newWorkout
    .save()
    .then(savedWorkout => {
      console.log("Saved this Workout doc: ", savedWorkout);
      return savedWorkout;
    })
    .then(savedWorkout => {
      Routine.findByIdAndUpdate(routineId, {
        $push: { workoutLog: savedWorkout._id }
      })
        .then(workoutRoutine => {
          workoutRoutine.populate("exercises", (err, hydratedRoutine) => {
            if (err) {
              res.status(400);
              res.json({
                msg:
                  "Failed to hydrate the Routine document used by your Workout",
                err
              });
            }
            hydratedRoutine.exercises.forEach(exercise => {
              const futureExercisePerformance = new Performance({
                exercise: exercise._id,
                date
              });
              futureExercisePerformance
                .save()
                .then(scheduledPerformance => {
                  Workout.findByIdAndUpdate(savedWorkout._id, {
                    $push: { performances: scheduledPerformance._id }
                  })
                    .then(workoutWithPerformanceRecord => {
                      Exercise.findByIdAndUpdate(exercise._id, {
                        $push: { performanceLog: scheduledPerformance._id }
                      })
                        .then(exerciseWithUpdatedPerformanceLog => {
                          console.log("Successfully scheduled a performance.");
                        })
                        .catch(err => {
                          res
                            .status(410)
                            .json({
                              msg:
                                "Failed to update Exercise log with the upcoming Performance",
                              err
                            });
                        });
                    })
                    .catch(err => {
                      res
                        .status(410)
                        .json({
                          msg:
                            "Failed to update Workout log with the upcoming Performance",
                          err
                        });
                    });
                })
                .catch(err => {
                  res
                    .status(410)
                    .json({
                      msg:
                        "There was an issue creating the new Performance document: ",
                      err
                    });
                });
            });
            User.findByIdAndUpdate(userId, {
              $push: {
                calendar: {
                  date: Date.now(), // Will fix with a projection onto the date header on the request that provides a default.
                  workout: savedWorkout._id
                }
              }
            })
              .then(updatedUser => {
                return res.status(201).json({
                  msg: "Succeeded in scheduling workout!",
                  updatedUser
                });
              })
              .catch(err => {
                res.status(409).json({
                  msg:
                    "Failed to update User's calendar with their new Workout.",
                  err
                });
              });
          });
        })
        .catch(err => {
          res
            .status(410)
            .json({
              msg: "Failed to update Routine log with the upcoming Workout",
              err
            });
        });
    })
    .catch(err => {
      res
        .status(410)
        .json({
          msg: "There was an issue creating the new Workout document: ",
          err
        });
    });
};

module.exports = {
  scheduleWorkout
};
