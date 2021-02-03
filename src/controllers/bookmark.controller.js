const bookmark = require('../services/bookmark.service');

const saveBookmark = (req, res) => {
  const urlPath = req.params.urlpath;
  bookmark.set(urlPath);
  req.flash('alert', 'The bookmark has been saved');
  const url = `/video/${urlPath}`;
  return res.redirect(303, url);
};

module.exports = {
  saveBookmark,
};