const alerts = require('../data/alerts');
const bookmark = require('../services/bookmark');

const postBookmarkVideo = (req, res) => {
  const urlPath = req.params.urlpath;
  bookmark.set(urlPath);
  const url = `/video/${urlPath}?alert=${alerts.BOOKMARK_SAVED}`;
  return res.redirect(303, url);
};

module.exports = {
  postBookmarkVideo,
};
