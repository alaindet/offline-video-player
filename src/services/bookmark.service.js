const progress = require('./progress.service');

const STORE_KEY = 'bookmark';

const get = () => progress.get(STORE_KEY);

const set = (bookmark) => progress.set(STORE_KEY, bookmark);

module.exports = {
  get,
  set,
};
