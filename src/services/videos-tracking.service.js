const progress = require('./progress.service');
const videosCache = require('./videos-cache.service');
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

  console.log('Start building videos tracking');

  const tracking = {};
  for (const video of videosCache.get()) {
    tracking[video.urlPath] = false;
  }
  store(tracking);

  console.log('Videos tracking built');
};

const markVideoAsSeen = (urlPath) => {
  const tracking = get();
  tracking[urlPath] = true;
  return store(tracking);
};

const init = (force = false) => {

  console.log('Initialize videos tracking');

  if (force || !get()) {
    build();
    return;
  }

  console.log(trimExcessSpaces(`
    Videos tracking already exists, skipping generation. \
    To reset progress, run "npm run build-tracking"
  `));
};

module.exports = {
  get,
  build,
  init,
  markVideoAsSeen,
  countWatchedVideos,
};
