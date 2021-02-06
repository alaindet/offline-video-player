const progress = require('./progress.service');
const videosCache = require('./videos-cache.service');
const lastSeenVideo = require('./last-seen-video.service');
const log = require('../utils/log.util');
const trimExcessSpaces = require('../utils/trim-excess-spaces.util');

const STORE_KEY = 'videos-tracking';

const get = () => progress.get(STORE_KEY);

const store = (data) => progress.set(STORE_KEY, data);

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
 * Generates a map of videos based on cached file
 * Initializes all values as false (aka "not seen yet")
 */
const build = () => {

  log.write('Start building videos tracking');

  const tracking = {};
  for (const video of videosCache.get()) {
    tracking[video.urlPath] = false;
  }
  store(tracking);

  log.write('Videos tracking built');
};

const markVideoAsSeen = (urlPath) => {
  const tracking = get();
  tracking[urlPath] = true;
  lastSeenVideo.set(urlPath);
  return store(tracking);
};

const init = (force = false) => {

  log.write('Initialize videos tracking');

  if (force || !get()) {
    build();
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
  markVideoAsSeen,
  countWatchedVideos,
};
