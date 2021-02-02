const videosCache = require('../services/videos-cache');

const getHome = (req, res) => {

  // TODO: Remove
  req.flash('alert', 'The bookmark has been saved');
  const alerts = req.flash('alert');

  res.render('pages/videos', {
    pageTitle: 'Offline Video Player',
    videos: videosCache.read(),
    alerts,
  });
};

module.exports = {
  getHome,
};
