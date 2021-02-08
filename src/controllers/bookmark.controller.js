const bookmarkService = require('../services/bookmark.service');

const saveBookmark = (req, res) => {
  const urlPath = req.body.urlPath;
  const currentTime = req.body.currentTime;
  const bookmark = { urlPath, currentTime };
  bookmarkService.set(bookmark);
  return res.send({
    message: 'The bookmark has been saved',
  })
};

module.exports = {
  saveBookmark,
};
