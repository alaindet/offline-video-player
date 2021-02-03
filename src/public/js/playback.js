const PLAYBACK_STEP = 0.25;
const PLAYBACK_MIN = 0.5;
const PLAYBACK_MAX = 3.0;

const updatePlaybackRate = (rate) => {
  elements.video.playbackRate = rate;
  elements.playbackReset.innerHTML = Number(rate).toFixed(2) + 'x';
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

const onVideoEnded = (event) => {
  const nextVideo = event.target.getAttribute('data-next-video');
  if (nextVideo !== 'no') {
    window.location = nextVideo;
  }
};

document.addEventListener('DOMContentLoaded', () => {

  selectElements({
    video: document.querySelector('.video-player'),
    playbackSlower: document.querySelector('#playback-slower'),
    playbackReset: document.querySelector('#playback-reset'),
    playbackFaster: document.querySelector('#playback-faster'),
  });

  elements.video?.addEventListener('ended', onVideoEnded);
  elements.playbackSlower?.addEventListener('click', onPlaybackSlowerClick);
  elements.playbackReset?.addEventListener('click', onPlaybackResetClick);
  elements.playbackFaster?.addEventListener('click', onPlaybackFasterClick);
});
