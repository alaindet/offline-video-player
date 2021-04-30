const videosCache = require('../services/videos-cache.service');
const videosTracking = require('../services/videos-tracking.service');
const getLanguageLabel = require('../utils/subtitles/get-language-label');

const buildViewData = (req) => {

  const currentTime = req.query.t;
  const videosCacheContent = videosCache.get();
  const videos = videosCacheContent['videos'];

  let subtitles = null;
  if (videosCacheContent['subtitles'] && videosCacheContent['subtitles'] !== 'false') {
    const lang = videosCacheContent['subtitles'];
    const label = getLanguageLabel(lang);
    subtitles = { lang, label };
  }

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
    subtitles,
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
    const title = 'No video found';
    const message = error.message;
    return res.status(404).render('pages/404', { message });
  }
};

module.exports = {
  getVideo,
};
