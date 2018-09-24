const Performance = require("../models/Performance");

const fetchPerformanceDoc = (req, res) => {
  const { performanceId } = req.body;
  Performance.findById(performanceId)
    .then(performanceDocument => {
      return res.status(200).json(performanceDocument);
    })
    .catch(err => {
      return res.status(404).json({ err });
    })
}

const fetchPerformancesForAllExercisesInARoutine = (req, res) => {
  const { performanceIds } = req.params;
  Performance.find({
    '_id': {
      $in: [
        performanceIds.forEach(id => mongoose.Types.ObjectId(id))
      ]
    }
  })
    .then(allPerformances => {
      res.status(200)
      res.json(allPerformances)
    })
    .catch(err => {
      res.status(500)
      res.json({ err })
    })
 
}


module.exports = {
  fetchPerformanceDoc,
  fetchPerformancesForAllExercisesInARoutine
}