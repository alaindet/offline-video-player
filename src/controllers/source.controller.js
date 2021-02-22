const fs = require('fs');
const srt2vtt = require('srt-to-vtt');

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

const getVideoFromCache = (urlpath) => {
  const videos = videosCache.get('videos');
  return videos.find(vid => vid.urlPath === urlpath);
};

// Export
const getVideo = (req, res) => {

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

  const video = getVideoFromCache(req.params.urlpath);
  const { fullPath } = video;
  const fileSize = fs.statSync(fullPath).size;
  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + config.STREAM_CHUNK_SIZE, fileSize - 1);
  const contentLength = end - start + 1;
  const headers = buildHeaders(start, end, fileSize, contentLength);
  res.writeHead(206, headers);
  const stream = fs.createReadStream(fullPath, { start, end });
  stream.pipe(res);
};

// Export
const getSubtitles = (req, res) => {
  const video = getVideoFromCache(req.params.urlpath);
  const { subtitlesPath } = video;

  if (!fs.existsSync(subtitlesPath)) {
    return res.status(400).send({
      message: 'Subtitles not found',
    });
  }

  fs.createReadStream(subtitlesPath)
    .pipe(srt2vtt())
    .pipe(res);
};

module.exports = {
  getVideo,
  getSubtitles,
};
