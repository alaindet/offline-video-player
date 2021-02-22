const multer = require('multer');
const paths = require('../config/paths.config');
const progress = require('../services/progress.service');
const { getFormattedTimestamp } = require('../utils/time/get-formatted-timestamp.util');

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
  const timestamp = getFormattedTimestamp();
  const filename = `progress_${timestamp}.json`;
  res.download(progress.progressPath, filename);
};

module.exports = {
  importFile,
  uploadSetup,
  exportFile,
};
