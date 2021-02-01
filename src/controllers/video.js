const alert = require('../data/alerts');

const getVideo = (videos) => (req, res) => {

  const urlPath = req.params.urlpath;
  const videoIndex = videos.findIndex(vid => vid.urlPath === urlPath);

  if (videoIndex === -1) {
    return res.status(404).send({
      message: `Video with path ${urlPath} not found`,
    });
  }

  const video = videos[videoIndex];

  const prevVideo = videos[videoIndex - 1];
  const prevVideoPath = prevVideo ? prevVideo.urlPath : null;

  const nextVideo = videos[videoIndex + 1];
  const nextVideoPath = nextVideo ? nextVideo.urlPath : null;

  res.render('pages/video', {
    pageTitle: video.name,
    videos,
    video,
    prevVideoPath: prevVideoPath,
    nextVideoPath: nextVideoPath,
  });
};

module.exports = {
  getVideo,
};
