const getHome = (videos) => (req, res) => {
  res.render('pages/videos', {
    pageTitle: 'Video Streaming App',
    videos,
  });
};

module.exports = {
  getHome,
};
