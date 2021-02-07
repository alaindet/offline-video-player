const path = require('path');
const fs = require('fs');
const glob = require('glob');
const { getVideoDurationInSeconds } = require('get-video-duration');
const humanizeDuration = require('humanize-duration');
const { orderBy } = require('natural-orderby');
const paths = require('../config/paths.config');
const getFileName = require('../utils/get-filename.util');
const { asyncRecordTimeInSeconds } = require('../utils/record-time.util');
const toForwardSlash = require('../utils/to-forward-slash.util');
const toKebabCase = require('../utils/to-kebab-case.util');
const trimExcessSpaces = require('../utils/trim-excess-spaces.util');
const log = require('../utils/log.util');

const videosCacheFile = path.join(paths.CACHE, 'videos.json');
const COMMON_STRIPPABLE_PATH = toForwardSlash(paths.VIDEOS);

const isVideosDir = () => fs.existsSync(paths.VIDEOS);

const isVideosCacheFile = () => fs.existsSync(videosCacheFile);

const getVideoPaths = (dir, ext = 'mp4') => {
  const globResult = glob.sync(`${dir}/**/*.${ext}`);
  const fullPaths = globResult.length ? globResult : [];
  return orderBy(fullPaths);
};

const build = async () => {

  if (!isVideosDir()) {
    throw new Error(trimExcessSpaces(`
      /videos directory does not exist, \
      please create it
    `));
  }

  log.write('Start building videos cache (please wait)');

  const timeTaken = await asyncRecordTimeInSeconds(async () => {
    const files = getVideoPaths(paths.VIDEOS);
    const parsed = await parse(files);
    const outputData = JSON.stringify(parsed);
    fs.writeFileSync(videosCacheFile, outputData);
  });

  log.write(`Videos cache file built in ~ ${timeTaken} seconds`);
};

const init = async (force = false) => {

  log.write('Initialize videos cache');

  if (force || !isVideosCacheFile()) {
    await build();
    return;
  }

  log.write(trimExcessSpaces(`
    Videos cache file already exists, skipping generation. \
    To reset the cache, run "npm run build-cache"
  `));
};

const get = () => {
  if (!isVideosCacheFile()) {
    throw new Error(trimExcessSpaces(`
      Videos cache file does not exist. \
      Run "npm run build-cache" to generate
    `));
  }
  const rawData = fs.readFileSync(videosCacheFile);
  return JSON.parse(rawData);
};

/**
 * Extracts a partial path from a full path, by stripping the initial slash,
 * the file extension and optionally a common path at the beginning
 */
const extractPartialPath = (fullPath, commonPath) => {
  let partial = fullPath;
  partial = partial.replace(commonPath, '');
  const lastDot = partial.lastIndexOf('.');
  return partial.slice(1, lastDot);
};

const parse = async (videoPaths) => {
  const parsed = [];

  for (const fullPath of videoPaths) {
    const rawDuration = await getVideoDurationInSeconds(fullPath);
    const roundedDuration = Math.round(rawDuration) * 1000;
    const duration = humanizeDuration(roundedDuration);
    const name = getFileName(fullPath);
    const partialPath = extractPartialPath(fullPath, COMMON_STRIPPABLE_PATH);
    const urlPath = toKebabCase(partialPath);
    parsed.push({ name, duration, fullPath, urlPath });
  }

  return parsed;
};

module.exports = {
  init,
  build,
  get,
};
