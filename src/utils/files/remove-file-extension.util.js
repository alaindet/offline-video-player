const removeFileExtension = (fullPath) => {
  const lastDot = fullPath.lastIndexOf('.');
  return fullPath.slice(0, lastDot);
};

module.exports = removeFileExtension;
