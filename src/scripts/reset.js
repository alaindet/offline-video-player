const path = require('path');
const fs = require('fs');
const paths = require('../config/paths.config');

const cacheFile = path.join(paths.CACHE, 'videos.json');
const progressFile = path.join(paths.STORAGE, 'progress.json');

fs.unlinkSync(cacheFile);
console.log(`Deleted cache file => ${cacheFile}`);

fs.unlinkSync(progressFile);
console.log(`Deleted progress file => ${progressFile}`);

console.log('All generated files deleted');
