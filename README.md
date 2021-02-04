# Offline Video Player

Offline Video Player is an an Express MVC application for watching many short videos in sequence, comfortably.

## Options

You can pass options to `npm start` like `npm start -- --port=4242`. Options are

- `--open` (Default: `true`) Opens the browser as soon as the app starts
- `--port` (Default `3000`) The port to serve the app on
- `--force-cache` (Default `false`) Forces to rebuild the videos cache file
- `--force-tracking` (Default `false`) Forces to rebuild and reset the videos tracking

## Scripts

- `npm run start` The default command to start the app
- `npm run dev` Runs the app in watch mode via Nodemon (for development)
- `npm run build-cache` Builds the videos cache file
- `npm run build-tracking` Builds the videos tracking (tracks progress)
- `npm run reset` Reset all generated files (WARNING: Deletes progress)

## Todo
- [x] LICENSE
- [x] Add .gitkeep to cache and videos dirs
- [x] Add bookmark feature
- [x] Add home link button
- [x] Highlight current video in menu
- [x] Put current video title
- [x] Fetch alert in video page
- [x] Show alert on video page
- [x] Create form on video page to bookmark
- [x] Show time needed to parse videos on parse-videos NPM script
- [x] Automatically play next video
- [x] Use config data
- [x] Export `progress.json`
- [x] Import `progress.json`
- [x] Fix wrong sorting (ex. `video9.mp4` > `video91.mp4`)
- [ ] Scroll to current video on "Open menu" click
- [x] Fix cold start: missing videos cache file (race condition?)
- [x] Add tracking feature (CSS class in videos list)
- [x] Add tracking feature (API endpoint)
- [x] Add tracking feature (async call in Browser)
- [x] Add tracking feature ("enough video watched" algorytm)
- [ ] README.md
- [ ] Add favicon
- [ ] Add progress bar
- [ ] Add CHANGELOG.md
- [ ] Add "Philosophy and Known Limitations" section to README.md
- [ ] Add "last seen video" feature
