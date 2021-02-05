const videoTracking = require('../services/videos-tracking.service');

const markVideoAsSeen = (req, res) => {
  const urlPath = req.body.urlPath;
  videoTracking.markVideoAsSeen(urlPath);
  const message = `Video with id ${urlPath} has been marked as "seen"`;
  res.send({ message });
};

module.exports = {
  markVideoAsSeen,
};
