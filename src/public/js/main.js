let playbackCurrent = 1.0;
const PLAYBACK_STEP = 0.25;
const PLAYBACK_MIN = 0.5;
const PLAYBACK_MAX = 2.5;
let elements = {};

const selectElements = () => {
  return {
    video: document.querySelector('.video-player'),
    playbackRate: document.querySelector('#playback-rate'),
    playbackSlower: document.querySelector('#playback-slower'),
    playbackReset: document.querySelector('#playback-reset'),
    playbackFaster: document.querySelector('#playback-faster'),
    menu: document.querySelector('.menu'),
    menuOpen: document.querySelector('#menu-open'),
    menuClose: document.querySelector('.menu-close'),
  };
};

const onMenuOpen = () => {
  elements.menu.classList.add('shown');
};

const onMenuClose = () => {
  elements.menu.classList.remove('shown');
};

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

const init = () => {
  elements = selectElements();
  elements.playbackSlower.addEventListener('click', onPlaybackSlowerClick);
  elements.playbackReset.addEventListener('click', onPlaybackResetClick);
  elements.playbackFaster.addEventListener('click', onPlaybackFasterClick);
  elements.menuOpen.addEventListener('click', onMenuOpen);
  elements.menuClose.addEventListener('click', onMenuClose);
};

document.addEventListener('DOMContentLoaded', init);
