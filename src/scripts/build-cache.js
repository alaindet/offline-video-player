const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const videosCache = require('../services/videos-cache.service');
const videosPathCache = require('../services/videos-path-cache.service');

// Parse CLI options
const argv = yargs(hideBin(process.argv)).argv;

// Change videos path if needed
if (argv['videos-path']) {
  videosPathCache.set(argv['videos-path']);
}

videosCache.build();
