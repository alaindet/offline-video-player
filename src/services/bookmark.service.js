const progress = require('./progress.service');

const BOOKMARK_KEY = 'bookmark';

const get = () => progress.get(BOOKMARK_KEY);
const set = (bookmark) => progress.set(BOOKMARK_KEY, bookmark);

module.exports = {
  get,
  set,
};
