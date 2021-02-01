const path = require('path');
const fs = require('fs');

const bookmarkPath = path.join(__dirname, '..', '..', 'storage', 'bookmark.json');

const get = () => {
  const data = fs.readFileSync(bookmarkPath);
  return JSON.parse(date);
};

const set = (urlPath) => {
  const bookmark = { urlPath };
  const data = JSON.stringify(bookmark);
  fs.writeFileSync(bookmarkPath);
};

module.exports = {
  get,
  set,
};
