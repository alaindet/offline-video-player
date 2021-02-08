const videosCache = require('../services/videos-cache.service');
const videosTracking = require('../services/videos-tracking.service');

const buildViewData = (req) => {

  const currentTime = req.query.t;
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
    video,
    videos,
    currentVideo: video.urlPath,
    prevVideo: prevVideo ? prevVideo.urlPath : null,
    nextVideo: nextVideo ? nextVideo.urlPath : null,
    videosTracking: videosTrackingMap,
    videosWatched: videosTracking.countWatchedVideos(),
    currentTime: currentTime ? currentTime : null,
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
