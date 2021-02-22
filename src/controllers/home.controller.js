const progress = require('../services/progress.service');
const videosCache = require('../services/videos-cache.service');
const bookmark = require('../services/bookmark.service');
const lastWatchedVideo = require('../services/last-watched-video.service');

const getHome = (req, res) => {
  const videos = videosCache.get('videos');
  res.render('pages/home', {
    pageTitle: 'Offline Video Player',
    firstVideo: videos[0].urlPath,
    alerts: req.flash('alert'),
    bookmark: bookmark.get(),
    isProgress: progress.isProgressFile(),
    lastWatchedVideo: lastWatchedVideo.get(),
  });
};

module.exports = {
  getHome,
};
