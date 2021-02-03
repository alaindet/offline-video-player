const express = require('express');
const open = require('open');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const paths = require('./config/paths.config');
const sessionConfig = require('./config/session.config');
const homeController = require('./controllers/home.controller');
const videoController = require('./controllers/video.controller');
const videoSourceController = require ('./controllers/source.controller');
const bookmarkController = require('./controllers/bookmark.controller');
const progressController = require('./controllers/progress.controller');
const videosCache = require('./services/videos-cache.service');

// TODO: This recorder works!
// const someExecutor = (yep: Function, nope: Function) => setTimeout(() => yep(42), 1000);
// const getTimestamp = () => (new Date()).valueOf();
// const printPromise = async (): Promise<void> => {
//     const prom = new Promise(someExecutor);
//     const result = await prom;
//     console.log('print promise', result);
// };
// const recordTime = async (callback: any): Promise<number> => {
//     console.log('Starting...');
//     const start = getTimestamp();
//     try {
//         await callback();
//     } catch (error) {
//         console.error('ERROR', error);
//     }
//     const end = getTimestamp();
//     const diff: number = end - start;
//     console.log(`Stopping... ${diff}`);
//     return diff;
// };
// (async () => console.log(
//     await recordTime(printPromise)
// ))();

// Setup
const argv = yargs(hideBin(process.argv)).argv;
const app = express();
app.use(cookieParser(sessionConfig.secret));
app.use(session(sessionConfig));
app.use(flash());
app.set('view engine', 'ejs');
app.set('views', paths.VIEWS);
app.use(express.static(paths.PUBLIC));
videosCache.init();

if (argv['force-parse']) {
  videosCache.buildCache();
}

// Routes
app.get('/', homeController.getHome);
app.get('/source/:urlpath', videoSourceController.getVideoSource);
app.get('/video/:urlpath', videoController.getVideo);
app.post('/video/:urlpath/bookmark', bookmarkController.saveBookmark);
app.post('/progress', progressController.uploadSetup, progressController.importFile);
app.get('/progress', progressController.exportFile);

// Bootstrap
const shouldOpen = !!argv['open'];
const port = argv['port'] || 3000;
app.listen(port, () => {
  console.log(`Application started on port ${port}`);
  if (shouldOpen) {
    open(`http://localhost:${port}`);
  }
});
