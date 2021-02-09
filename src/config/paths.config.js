const path = require('path');

const SRC = path.join(__dirname, '..');
const VIEWS = path.join(SRC, 'views');
const PUBLIC = path.join(SRC, 'public');
const ROOT = path.join(__dirname, '..', '..');
const CACHE = path.join(ROOT, 'cache');
const STORAGE = path.join(ROOT, 'storage');
let VIDEOS = path.join(ROOT, 'videos');

const setVideosPath = videosPath => VIDEOS = videosPath;

const getVideosPath = () => VIDEOS;

module.exports = {
  SRC,
  VIEWS,
  PUBLIC,
  ROOT,
  CACHE,
  STORAGE,
  setVideosPath,
  getVideosPath,
};
