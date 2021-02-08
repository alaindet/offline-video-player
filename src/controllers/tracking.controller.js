const videoTracking = require('../services/videos-tracking.service');

const markVideoAsWatched = (req, res) => {
  const urlPath = req.body.urlPath;
  const action = req.body.action;
  videoTracking.markVideoAsWatched(urlPath, action);
  const message = `Video "${urlPath}" has been ${action}ed as watched`;
  res.send({ message });
};

module.exports = {
  markVideoAsWatched,
};
