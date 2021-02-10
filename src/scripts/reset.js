const path = require('path');
const fs = require('fs');
const paths = require('../config/paths.config');
const log = require('../utils/log.util');

const files = [
  {
    name: 'videos cache',
    path: path.join(paths.CACHE, 'videos.json'),
  },
  {
    name: 'videos path cache',
    path: path.join(paths.CACHE, 'videos-path.json'),
  },
  {
    name: 'progress',
    path: path.join(paths.STORAGE, 'progress.json'),
  },
];

for (const file of files) {
  if (fs.existsSync(file.path)) {
    fs.unlinkSync(file.path);
    log.write(`Deleted ${file.name} file => ${file.path}`);
  } else {
    log.write(`Missing ${file.name} file => ${file.path}`);
  }
}
