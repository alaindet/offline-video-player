const path = require('path');
const fs = require('fs');

const paths = require('../config/paths');
const videosCache = require('../services/videos-cache');

const TIME_LABEL = 'parse-videos';
const videosDir = path.join(paths.VIDEOS);
const outputFile = path.join(paths.CACHE, 'videos.json');

if (!fs.existsSync(videosDir)) {
  console.error('The /videos folder does not exist, please create it');
  process.exit(1);
}

(async () => {
  console.time(TIME_LABEL);
  const files = videosCache.getVideoPaths(videosDir);
  const parsed = await videosCache.parse(files);
  const outputData = JSON.stringify(parsed);
  fs.writeFileSync(outputFile, outputData);
  console.timeEnd(TIME_LABEL);
  console.log(`Videos parsed\n${outputFile}`);
})();
