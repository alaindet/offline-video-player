const bookmark = require('../services/bookmark.service');

const saveBookmark = (req, res) => {
  const urlPath = req.params.urlpath;
  bookmark.set(urlPath);
  return res.send({
    message: 'The bookmark has been saved',
  })
};

module.exports = {
  saveBookmark,
};
