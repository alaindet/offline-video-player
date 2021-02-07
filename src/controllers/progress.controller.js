const multer = require('multer');
const paths = require('../config/paths.config');
const progress = require('../services/progress.service');
const bookmark = require('../services/bookmark.service');

const upload = multer({
  storage: multer.diskStorage({
    destination: paths.STORAGE,
    filename: (req, file, cb) => cb(null, 'progress.json'),
  }),
});

const importFile = (req, res) => {
  req.flash('alert', 'The progress was imported');
  return res.redirect(303, '/');
};

const uploadSetup = upload.single('progress-file');

const exportFile = (req, res) => {
  res.download(progress.progressPath);
};

module.exports = {
  importFile,
  uploadSetup,
  exportFile,
};
