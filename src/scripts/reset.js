const path = require('path');
const fs = require('fs');
const paths = require('../config/paths.config');
const log = require('../utils/log.util');

const cacheFile = path.join(paths.CACHE, 'videos.json');
const progressFile = path.join(paths.STORAGE, 'progress.json');

fs.unlinkSync(cacheFile);
log.write(`Deleted cache file => ${cacheFile}`);

fs.unlinkSync(progressFile);
log.write(`Deleted progress file => ${progressFile}`);
log.write('All generated files deleted');
