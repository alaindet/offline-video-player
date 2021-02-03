const asyncRecordTimeInMilliseconds = async (callback) => {
  const timeStart = (new Date()).valueOf();
  try {
    await callback();
  } catch (error) {
    console.error('ERROR', error);
  }
  const timeEnd = (new Date()).valueOf();
  return timeEnd - timeStart;
};

const asyncRecordTimeInSeconds = async (callback) => {
  const milliseconds = await recordTimeInMilliseconds(callback);
  return Math.round(milliseconds / 1000);
};

const recordTimeInMilliseconds = (callback) => {
  const timeStart = (new Date()).valueOf();
  callback();
  const timeEnd = (new Date()).valueOf();
  return timeEnd - timeStart;
};

const recordTimeinSeconds = (callback) => {
  const milliseconds = recordTimeInMilliseconds(callback);
  return Math.round(milliseconds / 1000);
};

module.exports = {
  asyncRecordTimeInMilliseconds,
  asyncRecordTimeInSeconds,
  recordTimeInMilliseconds,
  recordTimeinSeconds,
};
