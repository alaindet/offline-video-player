# Offline Video Player

Offline Video Player is an Express MVC application for watching many short videos in sequence, comfortably. It tracks progress and lets you export/import it as a portable JSON file.


## Features

- Simple and fast
- Progress is automatically tracked
- Import/export progress as a JSON file
- Set playback rate up to 4.00x
- Manually bookmark videos at specific time (only one video can be bookmarked at a time)
- *Previous* and *Next* buttons
- List showing *watched* and *to watch* videos
- Progress bar


## Known Limitations

Offline Video Player is admittedly a specific solution to a specific problem, so it strives for ease of use, ease of development and tries to provide as few features as needed. For this reason, there's a number of shortcuts and known limitations to it

- It only works with `.mp4` files
- Changing any `.mp4` file in the `/videos` folder could disrupt the saved progress
- Initial build of the cache can take from a few seconds **up to several minutes** depending on your machine and the number of videos; however, this should only happens once, the first time you run the app
- Saved progress as well as cache is persisted as JSON files, no database involved
- Being served locally, some best practices were skipped, i.e.: most operations are synchronous
- Zero builds: frontend is not minified, backend only implements the basic CommonJS syntax


## Requirements

- Node.js version 12+ installed, [Download here](https://nodejs.org/it/download/)


## Usage

1. Install
   ```
   git clone https://github.com/alaindet/offline-video-player.git
   cd offline-video-player
   npm install
   ```

2. Move your `.mp4` video files into the `/videos` folder

3. Start
   ```
   npm start
   ```


## Scripts

- `npm run start` The default command to start the app. Options are
  - `--open` (Default: `true`) Open the browser as soon as the app starts
  - `--port` (Default `4242`) The port to serve the app on
  - `--force-cache` (Default `false`) Force to rebuild the videos cache file
  - `--force-tracking` (Default `false`) Force to rebuild and reset the videos tracking
  - `--videos-path` (Default: `/videos`) Change the videos folder (accepts only *full paths*)
- `npm run build-cache` Rebuild the videos cache file from videos folder. Options are
  - `--videos-path` (Default: `/videos`) Change the videos folder (accepts only *full paths*)
- `npm run build-tracking` Rebuild the videos tracking feature
- `npm run reset` Reset all generated files (WARNING: Deletes progress)


## Options

- To pass options to a NPM script, preceed them with a `--`, ex.:

  ```
  npm start -- --port=4242 --force-cache
  ```

- If you are on **Windows**, please escape backslashes or wrap paths into double quotes. This does not work

  ```
  # NOPE
  npm start -- --videos-path=C:\your\specific\path # IT DOES NOT WORK!
  ```
  
  but these two work
  
  ```
  # YEP
  npm start -- --videos-path="C:\your\specific\path"
  npm start -- --videos-path=C:\\your\\specific\\path
  ```
