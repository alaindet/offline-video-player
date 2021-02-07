const videoTracking = require('../services/videos-tracking.service');

const markVideoAsSeen = (req, res) => {
  const urlPath = req.params.urlpath;
  videoTracking.markVideoAsSeen(urlPath);
  const message = `Video "${urlPath}" has been marked as seen`;
  res.send({ message });
};

module.exports = {
  markVideoAsSeen,
};
