const progress = require('./progress.service');
const videosCache = require('./videos-cache.service');
const lastWatchedVideo = require('./last-watched-video.service');
const trimExcessSpaces = require('../utils/string/trim-excess-spaces.util');
const log = require('../utils/log.util');

const STORE_KEY = 'videos-tracking';

/**
 * Export
 */
const get = () => progress.get(STORE_KEY);

const store = (data) => progress.set(STORE_KEY, data);

/**
 * Export
 */
const countWatchedVideos = () => {
  let count = 0;
  const map = get();
  for (const key in map) {
    if (map[key]) {
      count++;
    }
  }
  return count;
};

/**
 * Export
 *
 * Generates a map of videos based on cached file
 * Initializes all values as false (aka "not watched yet")
 */
const build = (options) => {

  log.write('Start building videos tracking');

  const tracking = {};
  for (const video of videosCache.get('videos')) {
    tracking[video.urlPath] = false;
  }
  store(tracking);

  log.write('Videos tracking built');
};

/**
 * Export
 */
const markVideoAsWatched = (urlPath, action = 'mark') => {
  const tracking = get();
  tracking[urlPath] = (action === 'mark');
  lastWatchedVideo.set(urlPath);
  return store(tracking);
};

/**
 * Export
 *
 * @param {boolean} options.force
 */
const init = (options = {}) => {

  log.write('Initialize videos tracking');

  if (options.force || !get()) {
    const { force, ...buildOptions } = options;
    build(buildOptions);
    return;
  }

  log.write(trimExcessSpaces(`
    Videos tracking already exists, skipping generation. \
    To reset the progress, run "npm run build-tracking"
  `));
};

module.exports = {
  get,
  build,
  init,
  markVideoAsWatched,
  countWatchedVideos,
};
