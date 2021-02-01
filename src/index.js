const path = require('path');
const fs = require('fs');
const express = require('express');
const open = require('open');

const { getHome } = require('./controllers/root');
const { getVideo } = require('./controllers/video');
const { getVideoSource } = require ('./controllers/video-source');
const { postBookmarkVideo } = require('./controllers/bookmark-video');

const app = express();
const viewsDir = path.join(__dirname, 'views');
const publicDir = path.join(__dirname, 'public');
const STREAM_CHUNK_SIZE = CHUNK_SIZE = 8 * 1024 * 1024; // 1Mb
const PORT = 3000;

// Get cached videos
const cachePath = path.join(__dirname, '..', 'cache', 'videos.json');
if (!fs.existsSync(cachePath)) {
  console.error('Cache file does not exist. Run "npm run parse-videos"');
  process.exit(1);
}
const videos = JSON.parse(fs.readFileSync(cachePath));

app.set('view engine', 'ejs');
app.set('views', viewsDir);
app.use(express.static(publicDir));

app.get('/', getHome(videos));
app.get('/video-source/:urlpath', getVideoSource(videos, STREAM_CHUNK_SIZE));
app.get('/video/:urlpath', getVideo(videos));
app.post('/video/:urlpath/bookmark', postBookmarkVideo);

app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}`);
  open(`http://localhost:${PORT}`);
});
