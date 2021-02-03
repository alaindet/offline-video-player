const path = require('path');
const fs = require('fs');

const paths = require('../config/paths.config');
const progressPath = path.join(paths.STORAGE, 'progress.json');

const isProgressFile = () => fs.existsSync(progressPath);

const load = () => {
  if (!isProgressFile()) {
    return {};
  }
  const rawData = fs.readFileSync(progressPath);
  return JSON.parse(rawData);
};

const store = (data) => {
  const serializedData = JSON.stringify(data);
  fs.writeFileSync(progressPath, serializedData);
};

const get = (key) => {
  const data = load();
  return data[key] ? data[key] : null;
};

const set = (key, value) => {
  const data = load();
  data[key] = value;
  store(data);
};

module.exports = {
  get,
  set,
  isProgressFile,
  progressPath,
};
