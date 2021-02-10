const fs = require('fs');

const videosCache = require('../services/videos-cache.service');
const config = require('../config/video.config');

const buildHeaders = (start, end, size, contentLength) => {
  return {
    'Content-Range': `bytes ${start}-${end}/${size}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video/mp4',
  };
};

const getVideoFullPath = (urlpath) => {
  const videos = videosCache.get();
  const video = videos.find(vid => vid.urlPath === urlpath);
  return video.fullPath;
};

// Export
const getVideoSource = (req, res) => {

  // Check range headers
  const range = req.headers.range;
  if (!range) {
    res.status(400).send({ message: 'Required Range header' });
    return;
  }

  // Check URL path
  const urlPath = req.params.urlpath;
  if (!urlPath) {
    res.status(400).send({ message: 'Required URL path of video' });
    return;
  }

  const filePath = getVideoFullPath(req.params.urlpath);
  const fileSize = fs.statSync(filePath).size;
  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + config.STREAM_CHUNK_SIZE, fileSize - 1);
  const contentLength = end - start + 1;
  const headers = buildHeaders(start, end, fileSize, contentLength);
  res.writeHead(206, headers);
  const stream = fs.createReadStream(filePath, { start, end });
  stream.pipe(res);
};

module.exports = {
  getVideoSource,
};
