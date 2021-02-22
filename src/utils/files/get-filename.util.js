const getFileName = (fullPath, withExtension = false) => {
  const separator = fullPath.includes('/') ? '/' : '\\';
  const segments = fullPath.split(separator);
  const lastSegment = segments[segments.length - 1];
  if (withExtension) {
    return lastSegment;
  }
  return lastSegment.slice(0, lastSegment.lastIndexOf('.'));
};

module.exports = getFileName;
