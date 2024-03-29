const progress = require('./progress.service');

const STORE_KEY = 'last-watched-video';

const get = () => progress.get(STORE_KEY);

const set = (data) => progress.set(STORE_KEY, data);

module.exports = {
  get,
  set,
};
