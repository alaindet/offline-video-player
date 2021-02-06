(() => {

  const PLAYBACK_STEP = 0.25;
  const PLAYBACK_MIN = 0.5;
  const PLAYBACK_MAX = 3.0;

  const getPlaybackRate = () => APP.elements.video.playbackRate;

  const updatePlaybackRate = (rate) => {
    APP.elements.video.playbackRate = rate;
    APP.elements.playbackReset.innerHTML = Number(rate).toFixed(2) + 'x';
  };

  const onPlaybackSlowerClick = () => {
    const rate = getPlaybackRate();
    updatePlaybackRate(Math.max(rate - PLAYBACK_STEP, PLAYBACK_MIN));
  };

  const onPlaybackResetClick = () => {
    updatePlaybackRate(1.0);
  };

  const onPlaybackFasterClick = () => {
    const rate = getPlaybackRate();
    updatePlaybackRate(Math.min(rate + PLAYBACK_STEP, PLAYBACK_MAX));
  };

  const onVideoEnded = (event) => {
    const nextVideo = event.target.getAttribute('data-next-video');
    if (nextVideo !== 'no') {
      window.location = nextVideo;
    }
  };

  APP.registerSelectors({
    video: '.video-player',
    playbackSlower: '#playback-slower',
    playbackReset: '#playback-reset',
    playbackFaster: '#playback-faster',
  });

  APP.registerEventHandlers([
    { element: 'video', event: 'ended', handler: onVideoEnded },
    { element: 'playbackSlower', event: 'click', handler: onPlaybackSlowerClick },
    { element: 'playbackReset', event: 'click', handler: onPlaybackResetClick },
    { element: 'playbackFaster', event: 'click', handler: onPlaybackFasterClick },
  ]);

})();
