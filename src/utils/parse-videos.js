const path = require('path');
const fs = require('fs');
const { getVideoDurationInSeconds } = require('get-video-duration');
const humanizeDuration = require('humanize-duration');
const glob = require('glob');
const kebabCase = require('kebab-case');

const getFileName = require('./get-filename');

/**
 * Reads a folder to find videos, then parses their duration
 * @param {*} assetsDir 
 */
const parseVideos = async (assetsDir) => {

  const fullPaths = glob.sync(`${assetsDir}/**/*.mp4`);
  if (fullPaths.length === 0) {
    return [];
  }

  const durations = [];
  for (const fullPath of fullPaths) {
    const rawDuration = await getVideoDurationInSeconds(fullPath);
    const roundedDuration = Math.round(rawDuration) * 1000;
    const duration = humanizeDuration(roundedDuration);
    const name = getFileName(fullPath);
    const urlPath = kebabCase(name);
    durations.push({ name, duration, fullPath, urlPath });
  }

  return durations;
};

module.exports = parseVideos;
