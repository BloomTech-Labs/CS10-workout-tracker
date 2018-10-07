const Performance = require("../models/Performance");

const fetchPerformanceDoc = (req, res) => {
  const { performanceId } = req.body;
  Performance.findById(performanceId)
    .then(performanceDocument => {
      return res.status(200).json(performanceDocument);
    })
    .catch(err => {
      return res.status(404).json({ err });
    });
};


const fetchAllPerformanceDocs = (req, res) => {
  const { userId } = req;
  Performance.find({ user: userId })
    .then(performances => {
      res.status(200).json(performances);
    })
    .catch(err => {
      res.json("Can not find user's performances!");
    });
};

const checkOffPerformance = (req, res) => {
  const { id } = req.params;
  Performance.findById(id)
    .then(performanceDocument => {
      performanceDocument.completed = !performanceDocument.completed
      performanceDocument.save()
        .then(savedDoc => {
          res.json(savedDoc)
        })
        .catch(err => {
          res.json({msg: "Can't update performance."})
        })
    })
    .catch(err => {
      res.status(500).json({ err })
    })
}


module.exports = {
  fetchPerformanceDoc,
  checkOffPerformance,
  fetchAllPerformanceDocs
}
