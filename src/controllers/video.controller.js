const videosCache = require('../services/videos-cache.service');
const videosTracking = require('../services/videos-tracking.service');

const buildViewData = () => {

  const videos = videosCache.get();
  const urlPath = req.params.urlpath;
  const videosIndex = videos.findIndex(v => v.urlPath === urlPath);

  if (videosIndex === -1) {
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
    prevVideoPath: prevVideo ? prevVideo.urlPath : null,
    nextVideoPath: nextVideo ? nextVideo.urlPath : null,
    alerts: req.flash('alert'),
    videosTracking: videosTrackingMap,
    videosWatched: videoTracking.countWatchedVideos(),
  };
};

const getVideo = (req, res) => {

  let data;
  try {
    data = buildViewData();
  } catch (error) {
    // TODO
  }

  const videos = videosCache.get();
  const urlPath = req.params.urlpath;
  const videoIndex = videos.findIndex(vid => vid.urlPath === urlPath);

  if (videoIndex === -1) {
    return res.status(404).send({
      message: `Video with path ${urlPath} not found`,
    });
  }

  const video = videos[videoIndex];
  const prevVideo = videos[videoIndex - 1];
  const nextVideo = videos[videoIndex + 1];
  const videosTrackingMap = videosTracking.get();
  let videosWatched = 0;
  for (const key in videosTrackingMap) {
    if (videosTrackingMap[key]) {
      videosWatched++;
    }
  }

  res.render('pages/video', {
    pageTitle: video.name,
    videos,
    currentVideo: video.urlPath,
    video: videos[videoIndex],
    prevVideoPath: prevVideo ? prevVideo.urlPath : null,
    nextVideoPath: nextVideo ? nextVideo.urlPath : null,
    alerts: req.flash('alert'),
    videosTracking: videosTrackingMap,
    videosWatched,
  });
};

module.exports = {
  getVideo,
};
