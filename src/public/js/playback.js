const PLAYBACK_STEP = 0.25;
const PLAYBACK_MIN = 0.5;
const PLAYBACK_MAX = 2.5;

const updatePlaybackRate = (rate) => {
  elements.video.playbackRate = rate;
  elements.playbackRate.innerHTML = Number(rate).toFixed(2) + 'x';
};

const onPlaybackSlowerClick = () => {
  const rate = elements.video.playbackRate;
  updatePlaybackRate(Math.max(rate - 0.25, PLAYBACK_MIN));
};

const onPlaybackResetClick = () => {
  updatePlaybackRate(1.0);
};

const onPlaybackFasterClick = () => {
  const rate = elements.video.playbackRate;
  updatePlaybackRate(Math.min(rate + 0.25, PLAYBACK_MAX));
};

document.addEventListener('DOMContentLoaded', () => {

  selectElements({
    video: document.querySelector('.video-player'),
    playbackRate: document.querySelector('#playback-rate'),
    playbackSlower: document.querySelector('#playback-slower'),
    playbackReset: document.querySelector('#playback-reset'),
    playbackFaster: document.querySelector('#playback-faster'),
  });

  elements.playbackSlower.addEventListener('click', onPlaybackSlowerClick);
  elements.playbackReset.addEventListener('click', onPlaybackResetClick);
  elements.playbackFaster.addEventListener('click', onPlaybackFasterClick);
});
