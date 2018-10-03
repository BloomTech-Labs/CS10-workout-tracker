const scheduleWorkout = async (workoutDoc, routineId, userId, date, next) => {
  try {
    const workoutRoutine = await Routine.findByIdAndUpdate(routineId, {
      $push: { workoutLog: workoutDoc._id }
    });
    const hydratedWorkoutRoutine = await workoutRoutine.populate("exercises");
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
    await Promise.all(promisesToSchedulePerformances);
    const updatedUser = await User.findByIdAndUpdate(userId, {
      $push: {
        calendar: {
          // date: Date.now(), // Will fix with a projection onto the date header on the request that provides a default.
          date: workoutDoc.date,
          workout: workoutDoc._id
        }
      }
    });
    const hydratedWorkout = await workoutDoc.populate({
      path: "routine",
      populate: { path: "exercises" }
    });
    const success = {
        status: 201,
        msg: "Succeeded in scheduling workout!",
        updatedUser,
        hydratedWorkout
    }
    return next(success);
  } catch (err) {
      const error = {
          status: 500,
          msg: "Error scheduling the workout", err
      }
    return next(error);
  }
};
