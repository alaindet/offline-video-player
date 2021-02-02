const path = require('path');
const fs = require('fs');

const paths = require('../config/paths.config');
const progressPath = path.join(paths.STORAGE, 'progess.json');

const load = () => {
  if (!fs.existsSync(progressPath)) {
    console.error('Progress file does not exist');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(progressPath));
};

const store = (data) => {
  const serializedData = JSON.stringify(data);
  fs.writeFileSync(serializedData);
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

const exportData = () => {
  const data = load();
  return data;
};

module.exports = {
  get,
  set,
  exportData,
};
