const progress = require('../services/progress.service');
const videosCache = require('../services/videos-cache.service');
const bookmark = require('../services/bookmark.service');
const lastWatchedVideo = require('../services/last-watched-video.service');

const getHome = (req, res) => {
  const videos = videosCache.get('videos');

  if (!videos[0]) {
    const title = 'No videos found';
    const message = 'No videos found. Please provide .mp4 videos in the /videos folder or set the videos folder via --videos-path option. See <a href="https://github.com/alaindet/offline-video-player">offline-video-player repository on GitHub</a> for more information.';
    console.error('ERROR', message);
    return res.status(404).render('pages/404', { title, message });
  }

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
