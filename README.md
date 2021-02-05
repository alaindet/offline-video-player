# Offline Video Player

Offline Video Player is an an Express MVC application for watching many short videos in sequence, comfortably.


## Philosophy and Known Limitations (TODO)

- Persistence is managed with local JSON files
- All filesystem operations are synchronous
- No build pipeline, no concatenation and no minification of JS and CSS files


## Options

You can pass options to `npm start` (ex.: `npm start -- --port=4242`)

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
- [ ] Scroll to current video on "Open menu" click
- [ ] Add complete README.md
- [ ] Add CHANGELOG.md
- [x] Add favicon
- [ ] Add "Philosophy and Known Limitations" section to README.md
- [x] Add "last seen video" feature
- [ ] Use https://www.npmjs.com/package/lowdb
