const path = require('path');
const fs = require('fs');

const parseVideos = require('../utils/parse-videos');

const assetsDir = path.join(__dirname, '..', '..', 'videos');
const outputFile = path.join(__dirname, '..', 'cache', 'videos.json');

if (!fs.existsSync(assetsDir)) {
  console.error('The assets folder does not exist, please create it');
  process.exit(1);
}

(async () => {
  const parsedVideos = await parseVideos(assetsDir);
  const outputData = JSON.stringify(parsedVideos);
  fs.writeFileSync(outputFile, outputData);
  console.log(`Videos parsed\n${outputFile}`);
})();
