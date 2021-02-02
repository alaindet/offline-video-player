const videosCache = require('../services/videos-cache');

const getHome = (req, res) => {

  // TODO: Remove
  req.flash('alert', 'The bookmark has been saved');
  const alerts = req.flash('alerts');

  res.render('pages/videos', {
    pageTitle: 'Video Streaming App',
    videos: videosCache.read(),
    alerts: alerts ? alerts : [],
  });
};

module.exports = {
  getHome,
};
