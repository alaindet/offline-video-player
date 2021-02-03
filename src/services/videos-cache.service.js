const path = require('path');
const fs = require('fs');
const glob = require('glob');
const { getVideoDurationInSeconds } = require('get-video-duration');
const humanizeDuration = require('humanize-duration');
const kebabCase = require('kebab-case');
const { orderBy } = require('natural-orderby');
const paths = require('../config/paths.config');
const getFileName = require('../utils/get-filename.util');
const { recordTimeinSeconds } = require('../utils/record-time.util');

const videosCacheFile = path.join(paths.CACHE, 'videos.json');

const isVideosDir = () => fs.existsSync(paths.VIDEOS);

const isVideosCacheFile = () => fs.existsSync(videosCacheFile);

const getVideoPaths = (dir, ext = 'mp4') => {
  const globResult = glob.sync(`${dir}/**/*.${ext}`);
  const fullPaths = globResult.length ? globResult : [];
  return orderBy(fullPaths);
};

const buildCache = () => {
  if (!isVideosDir()) {
    throw new Error('/videos directory does not exist, please create it');
  }
  console.log('Start building videos cache file');
  const timeTaken = recordTimeinSeconds(async () => {
    const files = getVideoPaths(paths.VIDEOS);
    const parsed = await parse(files);
    const outputData = JSON.stringify(parsed);
    fs.writeFileSync(videosCacheFile, outputData);
  });
  console.log(`Videos cache file built in ${timeTaken} seconds`);
};

const init = () => {
  console.log('Initialize videos cache service');
  if (!isVideosCacheFile()) {
    buildCache();
  }
};

const get = () => {
  if (!isVideosCacheFile()) {
    throw new Error('Videos cache file does not exist. Run "npm run parse-videos"');
  }
  const rawData = fs.readFileSync(videosCacheFile);
  return JSON.parse(rawData);
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
  init,
  buildCache,
  get,
};
