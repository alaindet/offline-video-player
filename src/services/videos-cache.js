const path = require('path');
const fs = require('fs');
const glob = require('glob');
const { getVideoDurationInSeconds } = require('get-video-duration');
const humanizeDuration = require('humanize-duration');
const kebabCase = require('kebab-case');

const paths = require('../config/paths');
const getFileName = require('../utils/get-filename');

const read = () => {
  const file = path.join(paths.CACHE, 'videos.json');
  if (!fs.existsSync(file)) {
    console.error('Cache file does not exist. Run "npm run parse-videos"');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(file));
};

const getVideoPaths = (dir, ext = 'mp4') => {
  const fullPaths = glob.sync(`${dir}/**/*.${ext}`);
  return fullPaths.length ? fullPaths : [];
};

const parse = async (videoPaths) => {
  const parsed = [];

  for (const fullPath of videoPaths) {
    const rawDuration = await getVideoDurationInSeconds(fullPath);
    const roundedDuration = Math.round(rawDuration) * 1000;
    const duration = humanizeDuration(roundedDuration);
    const name = getFileName(fullPath);
    const urlPath = kebabCase(name);
    parsed.push({ name, duration, fullPath, urlPath });
  }

  return parsed;
};

module.exports = {
  read,
  getVideoPaths,
  parse,
};
