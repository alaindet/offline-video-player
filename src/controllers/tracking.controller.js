const videoTracking = require('../services/videos-tracking.service');

// API endpoint
const markAsSeen = (req, res) => {
  const urlPath = req.params.urlpath;
  videoTracking.markVideoAsSeen(urlPath);
  res.status(201).send({
    message: `Video with id ${urlPath} has been marked as "seen"`,
  });
};

module.exports = {
  markAsSeen,
};
