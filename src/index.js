const express = require('express');
const open = require('open');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

const paths = require('./config/paths');
const sessionConfig = require('./config/session');
const expressConfig = require('./config/express');
const { getHome } = require('./controllers/root');
const { getVideo } = require('./controllers/video');
const { getVideoSource } = require ('./controllers/video-source');
const { postBookmarkVideo } = require('./controllers/bookmark-video');

const app = express();
app.use(cookieParser(sessionConfig.secret));
app.use(session(sessionConfig));
app.use(flash());
app.set('view engine', 'ejs');
app.set('views', paths.VIEWS);
app.use(express.static(paths.PUBLIC));

app.get('/', getHome);
app.get('/video-source/:urlpath', getVideoSource);
app.get('/video/:urlpath', getVideo);
app.post('/video/:urlpath/bookmark', postBookmarkVideo);

app.listen(expressConfig.PORT, () => {
  console.log(`Application started on port ${expressConfig.PORT}`);
  open(`http://localhost:${expressConfig.PORT}`);
});
