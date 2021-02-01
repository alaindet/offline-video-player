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

router.get('/', (req, res) => {
  res.render('pages/videos', {
    pageTitle: 'Video Streaming App',
    videos,
  });
});

module.exports = router;
