/**
 * Extracts a partial path from a full path, by stripping the initial slash,
 * the file extension and optionally a common path at the beginning
 *
 * Ex.:
 * fullPath = '/some/unnecessary/complex/path/some_file_name.dat'
 * commonPath = '/some/unnecessary/complex/path';
 * extractPartialPath(fullPath, commonPath) // 'some_file_name'
 */
const extractPartialPath = (fullPath, commonPath) => {
  let partial = fullPath;
  partial = partial.replace(commonPath, '');
  const lastDot = partial.lastIndexOf('.');
  return partial.slice(1, lastDot);
};

module.exports = extractPartialPath;
