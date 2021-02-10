const path = require('path');
const fs = require('fs');
const normalizePath = require('normalize-path');
const paths = require('../config/paths.config');

const VIDEOS_PATH_CACHE_FILE = path.join(paths.CACHE, 'videos-path.json');

const set = (rawVideosPath) => {
  const videosPath = normalizePath(rawVideosPath);
  const data = JSON.stringify({ path: videosPath });
  fs.writeFileSync(VIDEOS_PATH_CACHE_FILE, data);
};

const get = () => {
  if (!fs.existsSync(VIDEOS_PATH_CACHE_FILE)) {
    return paths.VIDEOS;
  }
  const fileContent = fs.readFileSync(VIDEOS_PATH_CACHE_FILE);
  const data = JSON.parse(fileContent);
  return data.path;
};

const exists = () => fs.existsSync(get());

module.exports = {
  set,
  get,
  exists,
};
