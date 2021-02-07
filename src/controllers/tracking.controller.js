const videoTracking = require('../services/videos-tracking.service');

const markVideoAsWatched = (req, res) => {
  const urlPath = req.params.urlpath;
  videoTracking.markVideoAsWatched(urlPath);
  const message = `Video "${urlPath}" has been marked as watched`;
  res.send({ message });
};

module.exports = {
  markVideoAsWatched,
};
