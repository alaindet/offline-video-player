(() => {

  const PLAYBACK_STEP = 0.25;
  const PLAYBACK_MIN = 0.5;
  const PLAYBACK_MAX = 3.0;

  const updatePlaybackRate = (rate) => {
    APP.elements.video.playbackRate = rate;
    APP.elements.playbackReset.innerHTML = Number(rate).toFixed(2) + 'x';
  };

  const onPlaybackSlowerClick = () => {
    const rate = APP.elements.video.playbackRate;
    updatePlaybackRate(Math.max(rate - PLAYBACK_STEP, PLAYBACK_MIN));
  };

  const onPlaybackResetClick = () => {
    updatePlaybackRate(1.0);
  };

  const onPlaybackFasterClick = () => {
    const rate = APP.elements.video.playbackRate;
    updatePlaybackRate(Math.min(rate + PLAYBACK_STEP, PLAYBACK_MAX));
  };

  const onVideoEnded = (event) => {
    const nextVideo = event.target.getAttribute('data-next-video');
    if (nextVideo !== 'no') {
      window.location = nextVideo;
    }
  };


  APP.registerElements({
    video: document.querySelector('.video-player'),
    playbackSlower: document.querySelector('#playback-slower'),
    playbackReset: document.querySelector('#playback-reset'),
    playbackFaster: document.querySelector('#playback-faster'),
  });

  APP.registerCallback(() => {
    APP.elements.video?.addEventListener('ended', onVideoEnded);
    APP.elements.playbackSlower?.addEventListener('click', onPlaybackSlowerClick);
    APP.elements.playbackReset?.addEventListener('click', onPlaybackResetClick);
    APP.elements.playbackFaster?.addEventListener('click', onPlaybackFasterClick);
  });

})();
