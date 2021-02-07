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
const homeController = require('./controllers/home.controller');
const videoController = require('./controllers/video.controller');
const videoSourceController = require ('./controllers/source.controller');
const bookmarkController = require('./controllers/bookmark.controller');
const progressController = require('./controllers/progress.controller');
const trackingController = require('./controllers/tracking.controller');

// Import services
const videosCache = require('./services/videos-cache.service');
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

(async () => {

  // Setup services
  await videosCache.init(!!argv['force-cache']);
  videosTracking.init(!!argv['force-tracking']);

  // Routes
  app.get('/', homeController.getHome);
  app.get('/source/:urlpath', videoSourceController.getVideoSource);
  app.get('/video/:urlpath', videoController.getVideo);
  app.patch('/video/:urlpath/bookmark', bookmarkController.saveBookmark);
  app.patch('/video/:urlpath/seen', trackingController.markVideoAsSeen);
  app.post(
    '/progress',
    progressController.uploadSetup,
    progressController.importFile,
  );
  app.get('/progress', progressController.exportFile);

  // Bootstrap
  const port = argv['port'] || 3000;

  const bootstrap = () => {
    log.write(`Application started on port ${port}`);
    if (!!argv['open']) {
      open(`http://localhost:${port}`);
    }
  };

  app.listen(port, bootstrap);
})();
