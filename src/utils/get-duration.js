/**
 * Converts seconds into a string like 'HH:ii:ss'
 * Ex.:
 * 3820 => '01:03:40'
 * 42 => '00:00:42'
 */
const getDuration = (totalSeconds) => {
  let temp = Math.round(totalSeconds);
  const seconds = temp - 60 * Math.floor(temp / 60);
  temp = (temp - seconds) / 60;
  const minutes = temp - 60 * Math.floor(temp / 60);
  temp = (temp - minutes) / 60;
  const hours = temp;
  return [hours, minutes, seconds]
    .map(i => String(i).padStart(2, '0'))
    .join(':');
};

module.exports = getDuration;
