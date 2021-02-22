const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { getVideoDurationInSeconds } = require('get-video-duration');
const { orderBy } = require('natural-orderby');
const paths = require('../config/paths.config');
const videosPathCache = require('./videos-path-cache.service');
const getFileName = require('../utils/files/get-filename.util');
const getDuration = require('../utils/time/get-duration');
const { asyncRecordTimeInSeconds } = require('../utils/time/record-time.util');
const toForwardSlash = require('../utils/files/to-forward-slash.util');
const toKebabCase = require('../utils/string/to-kebab-case.util');
const trimExcessSpaces = require('../utils/string/trim-excess-spaces.util');
const log = require('../utils/log.util');
const extractPartialPath = require('../utils/files/extract-partial-path');
const removeFileExtension = require('../utils/files/remove-file-extension.util');

// Default values
const VIDEO_EXT = 'mp4';
const SUBTITLES_EXT = 'srt';
const SUBTITLES_LANG = 'en';

const VIDEOS_CACHE_FILE = path.join(paths.CACHE, 'videos.json');
const VIDEOS_GLOB = VIDEO_EXT;

const isVideosCacheFile = () => fs.existsSync(VIDEOS_CACHE_FILE);

const getVideoPaths = (dir, ext = VIDEOS_GLOB) => {
  const globResult = glob.sync(`${dir}/**/*.${ext}`);
  const fullPaths = globResult.length ? globResult : [];
  return orderBy(fullPaths);
};

/**
 * Export
 *
 * @param {string | boolean} options.subtitles Ex.: 'en', 'it', true
 */
const build = async (options = {}) => {

  if (!videosPathCache.exists()) {
    throw new Error(trimExcessSpaces(`
      Videos folder does not exist, \
      please create it or provide it via --videos-path option
    `));
  }

  log.write('Start building videos cache (please wait)');

  const timeTaken = await asyncRecordTimeInSeconds(async () => {

    const videosPath = videosPathCache.get();
    const files = getVideoPaths(videosPath);

    // Fallback to default value
    if (options.subtitles === true) {
      options.subtitles = SUBTITLES_LANG;
    }

    const parsedVideos = await parseVideos(files, {
      strippablePath: toForwardSlash(videosPath),
      subtitlesLang: options.subtitles,
    });

    const output = JSON.stringify({
      videos: parsedVideos,
      subtitles: options.subtitles,
    });

    fs.writeFileSync(VIDEOS_CACHE_FILE, output);
  });

  log.write(`Videos cache file built in ~ ${timeTaken} seconds`);
};

/**
 * Export
 *
 * @param {boolean} options.force
 * @param {string | boolean} options.subtitles Ex.: 'en', 'it', true
 */
const init = async (options = {}) => {

  log.write('Initialize videos cache');

  if (options.force || !isVideosCacheFile()) {
    const { force, ...buildOptions } = options;
    await build(buildOptions);
    return;
  }

  log.write(trimExcessSpaces(`
    Videos cache file already exists, skipping generation. \
    To reset the cache, run "npm run build-cache"
  `));
};

/**
 * Export
 *
 * @param {string} prop A property to read, if none return all
 */
const get = (prop) => {
  if (!isVideosCacheFile()) {
    throw new Error(trimExcessSpaces(`
      Videos cache file does not exist. \
      Run "npm run build-cache" to generate
    `));
  }
  const rawData = fs.readFileSync(VIDEOS_CACHE_FILE);
  const data = JSON.parse(rawData);

  return prop && data[prop] ? data[prop] : data;
};

const getSubtitlesPath = (fullPath, lang) => {
  const filename = removeFileExtension(fullPath);

  const attempt1 = `${filename}.${SUBTITLES_EXT}`;
  if (fs.existsSync(attempt1)) {
    return attempt1;
  }

  const attempt2 = `${filename}.${lang}.${SUBTITLES_EXT}`;
  if (fs.existsSync(attempt2)) {
    return attempt2;
  }

  return null;
};

const parseVideos = async (videoPaths, options) => {

  const { strippablePath, subtitlesLang } = options;
  const parsed = [];

  for (const fullPath of videoPaths) {

    const rawDuration = await getVideoDurationInSeconds(fullPath);
    const duration = getDuration(Math.round(rawDuration));
    const name = getFileName(fullPath);
    const partialPath = extractPartialPath(fullPath, strippablePath);
    const urlPath = toKebabCase(partialPath);

    let subtitlesPath = null;
    if (subtitlesLang) {
      subtitlesPath = getSubtitlesPath(fullPath, subtitlesLang);
    }

    parsed.push({
      name,
      duration,
      urlPath,
      fullPath,
      subtitlesPath,
    });
  }

  return parsed;
};

module.exports = {
  init,
  build,
  get,
};
