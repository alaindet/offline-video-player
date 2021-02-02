const express = require('express');
const open = require('open');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

// Config
const paths = require('./config/paths.config');
const sessionConfig = require('./config/session.config');
const expressConfig = require('./config/express.config');

// Controllers
const homeController = require('./controllers/home.controller');
const videoController = require('./controllers/video.controller');
const videoSourceController = require ('./controllers/source.controller');
const bookmarkController = require('./controllers/bookmark.controller');

// Setup
const app = express();
app.use(cookieParser(sessionConfig.secret));
app.use(session(sessionConfig));
app.use(flash());
app.set('view engine', 'ejs');
app.set('views', paths.VIEWS);
app.use(express.static(paths.PUBLIC));

// Routes
app.get('/', homeController.getHome);
app.get('/source/:urlpath', videoSourceController.getVideoSource);
app.get('/video/:urlpath', videoController.getVideo);
app.post('/video/:urlpath/bookmark', bookmarkController.postBookmarkVideo);

// Bootstrap
app.listen(expressConfig.PORT, () => {
  console.log(`Application started on port ${expressConfig.PORT}`);
  open(`http://localhost:${expressConfig.PORT}`);
});
