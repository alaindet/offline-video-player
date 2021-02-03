const recordTimeInMilliseconds = (callback) => {
  const timeStart = new Date();
  callback();
  const timeEnd = new Date();
  return timeEnd - timeStart;
};

const recordTimeinSeconds = (callback) => {  
  const milliseconds = recordTimeInMilliseconds(callback);
  return Math.round(milliseconds / 1000);
};

module.exports = {
  recordTimeInMilliseconds,
  recordTimeinSeconds,
};
