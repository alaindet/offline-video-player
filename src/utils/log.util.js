const write = (message, prefix = '◆') => {
  console.log(`${prefix} ${message}`);
};

module.exports = {
  write,
};
