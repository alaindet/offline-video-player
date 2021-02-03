const asyncRecordTimeInMilliseconds = async (callback) => {
  const timeStart = new Date();
  await callback();
  const timeEnd = new Date();
  return timeEnd - timeStart;
};

const asyncRecordTimeInSeconds = async (callback) => {
  const milliseconds = await recordTimeInMilliseconds(callback);
  return Math.round(milliseconds / 1000);
};

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
  asyncRecordTimeInMilliseconds,
  asyncRecordTimeInSeconds,
  recordTimeInMilliseconds,
  recordTimeinSeconds,
};
