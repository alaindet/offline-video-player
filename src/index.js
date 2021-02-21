const express = require('express');
const open = require('open');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const yargs = require('yargs/yargs');
const log = require('./utils/log.util');
const { hideBin } = require('yargs/helpers');

// Import config
const paths = require('./config/paths.config');
const sessionConfig = require('./config/session.config');

// Import controllers
const homeCtrl = require('./controllers/home.controller');
const videoCtrl = require('./controllers/video.controller');
const videoSourceCtrl = require ('./controllers/source.controller');
const bookmarkCtrl = require('./controllers/bookmark.controller');
const progressCtrl = require('./controllers/progress.controller');
const trackingCtrl = require('./controllers/tracking.controller');

// Import services
const videosCache = require('./services/videos-cache.service');
const videosPathCache = require('./services/videos-path-cache.service');
const videosTracking = require('./services/videos-tracking.service');

// Parse CLI options
const argv = yargs(hideBin(process.argv)).argv;

// Setup Express
const app = express();
app.use(cookieParser(sessionConfig.secret));
app.use(session(sessionConfig));
app.use(flash());
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', paths.VIEWS);
app.use(express.static(paths.PUBLIC));
app.use(express.json());

// Change videos path if needed
if (argv['videos-path']) {
  videosPathCache.set(argv['videos-path']);
}

// TODO: Set subtitles language

(async () => {

  // Setup services
  await videosCache.init(!!argv['force-cache']);
  videosTracking.init(!!argv['force-tracking']);

  // Routes
  app.get('/', homeCtrl.getHome);
  app.get('/videos/:urlpath/source', videoSourceCtrl.getVideo);
  app.get('/videos/:urlpath/subtitles', videoSourceCtrl.getSubtitles);
  app.get('/videos/:urlpath', videoCtrl.getVideo);
  app.patch('/videos/:urlpath/bookmark', bookmarkCtrl.saveBookmark);
  app.patch('/videos/:urlpath/watched', trackingCtrl.markVideoAsWatched);
  app.post('/progress', progressCtrl.uploadSetup, progressCtrl.importFile);
  app.get('/progress', progressCtrl.exportFile);

  // Bootstrap
  const port = argv['port'] || 4242;

  const bootstrap = () => {
    log.write(`Application started on port ${port}`);
    if (!!argv['open']) {
      open(`http://localhost:${port}`);
    }
  };

  app.listen(port, bootstrap);
})();
