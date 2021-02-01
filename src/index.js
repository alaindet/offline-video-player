const path = require('path');
const fs = require('fs');
const express = require('express');

const rootController = require('./controllers/root');
const videosController = require('./controllers/video');
const videoSourcesController = require ('./controllers/video-source');

const app = express();
const viewsDir = path.join(__dirname, 'views');
const publicDir = path.join(__dirname, 'public');

// Cache videos
const cachePath = path.join(__dirname, 'cache', 'assets.json');
if (!fs.existsSync(cachePath)) {
  console.error('Cache file does not exist. Run "npm run parse-assets"');
  process.exit(1);
}
const videos = JSON.parse(fs.readFileSync(cachePath));

app.set('view engine', 'ejs');
app.set('views', viewsDir);
app.use(express.static(publicDir));
app.use(rootController);
app.use(videosController);
app.use(videoSourcesController);

app.listen(3000, () => {
  console.log('Application started on port 3000')
});
