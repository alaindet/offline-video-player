const path = require('path');
const fs = require('fs');
const express = require('express');

// Cache
const cachePath = path.join(__dirname, '..', 'cache', 'assets.json');
if (!fs.existsSync(cachePath)) {
  console.error('Cache file does not exist. Run "npm run parse-assets"');
  process.exit(1);
}
const videos = JSON.parse(fs.readFileSync(cachePath));

const router = express.Router();
const CHUNK_SIZE = 8 * 1024 * 1024; // 1Mb

router.get('/video-source/:urlpath', (req, res) => {

  const range = req.headers.range;
  if (!range) {
    const message = 'Required Range header';
    res.status(400).send({ message });
    return;
  }

  const urlPath = req.params.urlpath;
  const video = videos.find(i => i.urlPath === urlPath);
  const videoPath = video.fullPath;
  const videoSize = fs.statSync(videoPath).size;
  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
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
});

module.exports = router;
