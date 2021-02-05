const videosCache = require('../services/videos-cache.service');
const videosTracking = require('../services/videos-tracking.service');

const buildViewData = (req) => {

  const videos = videosCache.get();
  const urlPath = req.params.urlpath;
  const videoIndex = videos.findIndex(v => v.urlPath === urlPath);

  if (videoIndex === -1) {
    throw new Error(`Video with path ${urlPath} not found`);
  }

  const video = videos[videoIndex];
  const prevVideo = videos[videoIndex - 1];
  const nextVideo = videos[videoIndex + 1];
  const videosTrackingMap = videosTracking.get();

  return {
    pageTitle: video.name,
    alerts: req.flash('alert'),
    video,
    videos,
    currentVideo: video.urlPath,
    prevVideoPath: prevVideo ? prevVideo.urlPath : null,
    nextVideoPath: nextVideo ? nextVideo.urlPath : null,
    videosTracking: videosTrackingMap,
    videosWatched: videosTracking.countWatchedVideos(),
  };
};

const getVideo = (req, res) => {
  try {
    data = buildViewData(req);
    res.render('pages/video', data);
  } catch (error) {
    console.error('ERROR', error);
    const message = error.message;
    return res.status(404).render('pages/404', { message });
  }
};

module.exports = {
  getVideo,
};
