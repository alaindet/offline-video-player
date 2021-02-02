const fs = require('fs');

const videosCache = require('../services/videos-cache');
const config = require('../config/video');

const getVideoSource = (req, res) => {

  // Check range headers
  const range = req.headers.range;
  if (!range) {
    const message = 'Required Range header';
    res.status(400).send({ message });
    return;
  }

  const urlPath = req.params.urlpath;
  const videos = videosCache.read();
  const video = videos.find(vid => vid.urlPath === urlPath);
  const videoPath = video.fullPath;
  const videoSize = fs.statSync(videoPath).size;
  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + config.STREAM_CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start + 1;
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video/mp4',
  };

  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
};

module.exports = {
  getVideoSource,
};
