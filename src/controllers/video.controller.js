const videosCache = require('../services/videos-cache.service');

const getVideo = (req, res) => {

  const alerts = req.flash('alert');

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

  res.render('pages/video', {
    pageTitle: video.name,
    videos,
    currentVideo: video.urlPath,
    video: videos[videoIndex],
    prevVideoPath: prevVideo ? prevVideo.urlPath : null,
    nextVideoPath: nextVideo ? nextVideo.urlPath : null,
    alerts: req.flash('alert'),
  });
};

module.exports = {
  getVideo,
};
