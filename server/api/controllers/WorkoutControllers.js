const Exercise = require("../models/Exercise");
const Performance = require("../models/Performance");
const User = require("../models/User");
const Routine = require("../models/Routine");
const Workout = require("../models/Workout");

const fetchWorkoutDoc = (req, res) => {
  const { workoutId } = req.body;
  Workout.findById(workoutId)
    .populate("performances")
    .populate("user")
    .populate("routine")
    .populate("workout")
    .then(workoutDocument => {
      return res.status(200).json(workoutDocument);
    })
    .catch(err => {
      return res.status(404).json({ err });
    });
};

// this is for displaying the scheduled workouts onto the calendar
const fetchAllWorkouts = (req, res) => {
  const { userId } = req;
  Workout.find({ user: userId })
    .populate({ path: "performances", populate: { path: "exercise" } })
    .populate({ path: "routine", populate: { path: "exercises" } })
    .then(workouts => {
      res.status(200).json(workouts);
    })
    .catch(err => {
      res.json("Can not find workouts!");
    });
};

// This is substantially the most complicated route - it absorbs a lot of complexity
// to make things easier later on. Here a step-by-step rundown:
//   1. We extract the necessary info from the request for the Workout - which routine
//   we're performing, who we are, when we're doing it (defaults to now) and any note.
//   2. We create a new Workout document to represent the upcoming Workout. At this point, the Workout
//   still doesn't have its actual list of exercises to perform.
//   3. We add the Workout documentId to the list of Workouts performed for this Routine.
//   4. We grab the Routine document for the Workout and use its `exercises` prop to grab the
//   relevant Exercise documents
//   5. We iterate over the Exercise documents and create a Performance document for each exercise.
//   6. We add each Performance document to the `performances` field in Workout and the `performanceLog` field in Exercise
//   7. Each future Performance of an exercise now has a MongoDB document in the Performance collection.
//   This document is referenced in the records of the corresponding Exercise and Workout.
//   8. Our final step is to save the Workout to the embedded calendar for the User, along with a date.
// const scheduleWorkout = (req, res) => {
//   const { routineId, date, note } = req.body;
//   const userId = req.userId;
//   const workoutParams = { routine: routineId, user: userId, date, note };
//   const newWorkout = new Workout(workoutParams);
//   console.log(
//     "Made this new Workout document - about to link it up:",
//     newWorkout
//   );
//   newWorkout
//     .save()
//     .then(savedWorkout => {
//       console.log("Saved this Workout doc: ", savedWorkout);
//       return savedWorkout;
//     })
//     .then(savedWorkout => {
//       Routine.findByIdAndUpdate(routineId, {
//         $push: { workoutLog: savedWorkout._id }
//       })
//         .then(workoutRoutine => {
//           workoutRoutine.populate("exercises", (err, hydratedRoutine) => {
//             if (err) {
//               res.status(400);
//               res.json({
//                 msg:
//                   "Failed to hydrate the Routine document used by your Workout",
//                 err
//               });
//             }
//             hydratedRoutine.exercises.forEach(exercise => {
//               const futureExercisePerformance = new Performance({
//                 exerciseName: exercise.name,
//                 exercise: exercise._id,
//                 date,
//                 user: userId // added user ref for fetchAllPerformanceDocs controller. See PerformanceControllers
//               });
//               futureExercisePerformance
//                 .save()
//                 .then(scheduledPerformance => {
//                   Workout.findByIdAndUpdate(savedWorkout._id, {
//                     $push: { performances: scheduledPerformance._id }
//                   })
//                     .then(workoutWithPerformanceRecord => {
//                       Exercise.findByIdAndUpdate(exercise._id, {
//                         $push: { performanceLog: scheduledPerformance._id }
//                       })
//                         .then(exerciseWithUpdatedPerformanceLog => {
//                           console.log("Successfully scheduled a performance.");
//                         })
//                         .catch(err => {
//                           res.status(410).json({
//                             msg:
//                               "Failed to update Exercise log with the upcoming Performance",
//                             err
//                           });
//                         });
//                     })
//                     .catch(err => {
//                       res.status(410).json({
//                         msg:
//                           "Failed to update Workout log with the upcoming Performance",
//                         err
//                       });
//                     });
//                 })
//                 .catch(err => {
//                   res.status(410).json({
//                     msg:
//                       "There was an issue creating the new Performance document: ",
//                     err
//                   });
//                 });
//             });
//             User.findByIdAndUpdate(userId, {
//               $push: {
//                 calendar: {
//                   // date: Date.now(), // Will fix with a projection onto the date header on the request that provides a default.
//                   date: savedWorkout.date,
//                   workout: savedWorkout._id
//                 }
//               }
//             })
//               .then(updatedUser => {
//                 savedWorkout.populate(
//                   { path: "routine", populate: { path: "exercises" } },
//                   (err, hydratedWorkout) => {
//                     if (err) {
//                       res.status(400);
//                       res.json({
//                         msg: "Failed to hydrate the Workout document",
//                         err
//                       });
//                     }
//                     return res.status(201).json({
//                       msg: "Succeeded in scheduling workout!",
//                       updatedUser,
//                       hydratedWorkout
//                     });
//                   }
//                 );
//               })
//               .catch(err => {
//                 res.status(409).json({
//                   msg:
//                     "Failed to update User's calendar with their new Workout.",
//                   err
//                 });
//               });
//           });
//         })
//         .catch(err => {
//           res.status(410).json({
//             msg: "Failed to update Routine log with the upcoming Workout",
//             err
//           });
//         });
//     })
//     .catch(err => {
//       res.status(410).json({
//         msg: "There was an issue creating the new Workout document: ",
//         err
//       });
//     });
// };

// const scheduleWorkout = (workoutDoc, routineId, userId, date, next) => {
//   console.log("ARGUMENTS", workoutDoc, routineId, userId, date, next);

//   Routine.findByIdAndUpdate(routineId, {
//     $push: { workoutLog: workoutDoc._id }
//   })
//     .then(workoutRoutine => {
//       workoutRoutine.populate("exercises", (err, hydratedRoutine) => {
//         console.log("JUST POPULATED THE EXERCISES");
//         if (err) {
//           const error = {
//             status: 400,
//             msg: "Failed to hydrate the Routine document used by your Workout",
//             err
//           };
//           return next(error);
//         }

//         hydratedRoutine.exercises.forEach(exercise => {
//           console.log("ABOUT TO CREATE A PERFORMANCE RECORD");
//           const futureExercisePerformance = new Performance({
//             exerciseName: exercise.name,
//             exercise: exercise._id,
//             date,
//             user: userId // added user ref for fetchAllPerformanceDocs controller. See PerformanceControllers
//           });
//           futureExercisePerformance
//             .save()
//             .then(scheduledPerformance => {
//               Workout.findByIdAndUpdate(
//                 workoutDoc._id,
//                 {
//                   $push: { performances: scheduledPerformance._id }
//                 },
//                 { new: true }
//               )
//                 .then(workoutWithPerformanceRecord => {
//                   Exercise.findByIdAndUpdate(exercise._id, {
//                     $push: { performanceLog: scheduledPerformance._id }
//                   })
//                     .then(exerciseWithUpdatedPerformanceLog => {
//                       console.log("Successfully scheduled a performance.");
//                     })
//                     .catch(err => {
//                       const error = {
//                         status: 410,
//                         msg:
//                           "Failed to update Exercise log with the upcoming Performance",
//                         err
//                       };
//                       return next(error);
//                     });
//                 })
//                 .catch(err => {
//                   const error = {
//                     status: 410,
//                     msg:
//                       "Failed to update Workout log with the upcoming Performance",
//                     err
//                   };
//                 });
//             })
//             .catch(err => {
//               const error = {
//                 status: 410,
//                 msg: "There was an issue creating the new Performance document",
//                 err
//               };
//               return next(error);
//             });
//         });
//         User.findByIdAndUpdate(userId, {
//           $push: {
//             calendar: {
//               // date: Date.now(), // Will fix with a projection onto the date header on the request that provides a default.
//               date: workoutDoc.date,
//               workout: workoutDoc._id
//             }
//           }
//         })
//           .then(updatedUser => {
//             workoutDoc.populate(
//               { path: "routine", populate: { path: "exercises" } },
//               (err, hydratedWorkout) => {
//                 if (err) {
//                   const error = {
//                     status: 400,
//                     msg: "Failed to hydrate the Workout document",
//                     err
//                   };
//                   return next(error);
//                 }

//                 const success = {
//                   status: 201,
//                   msg: "Succeeded in scheduling workout!",
//                   updatedUser,
//                   hydratedWorkout
//                 };
//                 return next(success);
//               }
//             );
//           })
//           .catch(err => {
//             const error = {
//               status: 409,
//               msg: "Failed to update User's calendar with their new Workout.",
//               err
//             };
//             return next(error);
//           });
//       });
//     })
//     .catch(err => {
//       const error = {
//         status: 410,
//         msg: "Failed to update Routine log with the upcoming Workout",
//         err
//       };
//       return next(error);
//     });
// };

const scheduleWorkout = async (workoutDoc, routineId, userId, date, next) => {
  try {
    const workoutRoutine = await Routine.findByIdAndUpdate(routineId, {
      $push: { workoutLog: workoutDoc._id }
    });
    workoutRoutine.populate(
      "exercises",
      async (err, hydratedWorkoutRoutine) => {
        if (err) {
          reject(err);
        }
        const promisesToSchedulePerformances = hydratedWorkoutRoutine.exercises.map(
          async exercise => {
            const futureExercisePerformance = new Performance({
              exerciseName: exercise.name,
              exercise: exercise._id,
              date,
              user: userId // added user ref for fetchAllPerformanceDocs controller. See PerformanceControllers
            });
            const scheduledPerformance = await futureExercisePerformance.save();
            const workoutWithPerformanceRecord = await Workout.findByIdAndUpdate(
              workoutDoc._id,
              {
                $push: { performances: scheduledPerformance._id }
              },
              { new: true }
            );
            const exerciseWithUpdatedPerformanceLog = await Exercise.findByIdAndUpdate(
              exercise._id,
              {
                $push: { performanceLog: scheduledPerformance._id }
              }
            );
            return true;
          }
        );
        const promiseResults = await Promise.all(
          promisesToSchedulePerformances
        );
        console.log("PROMISE RESULTS", promiseResults);
        const updatedUser = await User.findByIdAndUpdate(userId, {
          $push: {
            calendar: {
              // date: Date.now(), // Will fix with a projection onto the date header on the request that provides a default.
              date: workoutDoc.date,
              workout: workoutDoc._id
            }
          }
        });
        const updatedWorkoutDoc = await Workout.findById(workoutDoc._id);
        const hydratedWorkout = await updatedWorkoutDoc.populate(
          [
            {
              path: "routine",
              populate: { path: "exercises" }
            },
            {
              path: "performances"
            }
          ],
          (err, hydratedWorkout) => {
            if (err) {
              reject(err);
            }
            const success = {
              status: 201,
              msg: "Succeeded in scheduling workout!",
              updatedUser,
              hydratedWorkout
            };
            return next(success);
          }
        );
      }
    );
  } catch (err) {
    const error = {
      status: 500,
      msg: "Error scheduling the workout",
      err
    };
    return next(error);
  }
};

const createAndScheduleWorkout = (req, res) => {
  const { routineId, date, note } = req.body;
  const userId = req.userId;
  const workoutParams = { routine: routineId, user: userId, date, note };
  const newWorkout = new Workout(workoutParams);

  newWorkout
    .save()
    .then(savedWorkout => {
      scheduleWorkout(
        savedWorkout,
        routineId,
        userId,
        date,
        schedulingResult => {
          res.status(schedulingResult.status).json(schedulingResult);
        }
      );
    })
    .catch(err => {
      res.status(410).json({
        msg: "There was an issue creating the new Workout document: ",
        err
      });
    });
};

const copyWorkoutRange = (req, res) => {
  const { startDate, endDate, shiftDistance } = req.body;
  const { userId } = req;

  User.findById(userId)
    .populate("calendar.workout")

    .then(foundUser => {
      const filteredCalendar = foundUser.calendar.filter(calendarEntry => {
        return (
          Date.parse(calendarEntry.date) >= Date.parse(startDate) &&
          Date.parse(calendarEntry.date) <=
            Date.parse(endDate) +
              86000399 /* 86000399 ms / day. This is an additional 
          buffer on the end date, to ensure the workout on the end date is captured. */
        );
      });
      console.log("END DATE", endDate);
      console.log("FILTERED CALENDAR", filteredCalendar);
      const numberOfWorkoutsToSchedule = filteredCalendar.length;
      const scheduledWorkouts = [];
      filteredCalendar.forEach((workoutInRange, index) => {
        const routineId = workoutInRange.workout.routine;
        const millisecondsDate =
          Date.parse(workoutInRange.date) + shiftDistance;
        const unixDate = new Date(millisecondsDate);
        const newWorkout = new Workout({
          routine: routineId,
          user: userId,
          date: unixDate
        });
        newWorkout
          .save()
          .then(savedWorkout => {
            scheduleWorkout(
              savedWorkout,
              routineId,
              userId,
              savedWorkout.date,
              schedulingResult => {
                scheduledWorkouts.push(schedulingResult);
                console.log(
                  "SCHEDULED WORKOUTS",
                  scheduledWorkouts,
                  "INDEX",
                  index
                );
                if (scheduledWorkouts.length === numberOfWorkoutsToSchedule) {
                  console.log(
                    "INDEX AND NUMBER OF WORKOUTS TO SCHEDULE",
                    index,
                    numberOfWorkoutsToSchedule,
                    scheduledWorkouts
                  );
                  res.status(201).json(scheduledWorkouts);
                }
              }
            );
          })
          .catch(err => {
            res.status(500).json({ err });
          });
      });
    });
};

const deleteWorkout = (req, res) => {
  const { id } = req.params;
  console.log("TESTING DELETE WORKOUT");
  Workout.findByIdAndRemove({ _id: id }).then(removedWorkout => {
    console.log(removedWorkout);
    let user_id = removedWorkout.user;
    let routine_id = removedWorkout.routine;

    User.findByIdAndUpdate(user_id, { $pull: { calendar: { workout: id } } })
      .then(removedRefFromUser => {
        Routine.findByIdAndUpdate(routine_id, { $pull: { workoutLog: id } })
          .then(removedRefFromRoutine => {
            res.status(201).json({
              msg: "DELETED SUCCESSFULLY",
              removedRefFromUser,
              removedRefFromRoutine
            });
          })
          .catch(err => {
            res
              .status(500)
              .json({ msg: "FAILED TO DELETE REF FROM ROUTINE COLLECTION" });
          });
      })
      .catch(err => {
        res
          .status(500)
          .json({ msg: "FAILED TO DELETE REF FROM USER COLLECTION" });
      });
  });
};

module.exports = {
  scheduleWorkout,
  fetchWorkoutDoc,
  fetchAllWorkouts,
  copyWorkoutRange,
  createAndScheduleWorkout,
  deleteWorkout
};
