const timestamp = require('./timestamp.util');

const asyncRecordTimeInMilliseconds = async (fn) => {
  const start = timestamp();
  try {
    await fn();
  } catch (error) {
    console.error('ERROR', error);
  }
  return timestamp() - start;
};

const asyncRecordTimeInSeconds = async (fn) => {
  const milliseconds = await asyncRecordTimeInMilliseconds(fn);
  return Math.ceil(milliseconds / 1000);
};

const recordTimeInMilliseconds = (fn) => {
  const start = timestamp();
  fn();
  return timestamp() - start;
};

const recordTimeinSeconds = (fn) => {
  const milliseconds = recordTimeInMilliseconds(fn);
  return Math.ceil(milliseconds / 1000);
};

module.exports = {
  asyncRecordTimeInMilliseconds,
  asyncRecordTimeInSeconds,
  recordTimeInMilliseconds,
  recordTimeinSeconds,
};
