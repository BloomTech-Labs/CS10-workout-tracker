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


module.exports = {
  fetchPerformanceDoc
}