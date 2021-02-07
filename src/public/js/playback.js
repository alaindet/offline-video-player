(() => {

  const PLAYBACK_STEP = 0.25;
  const PLAYBACK_MIN = 0.5;
  const PLAYBACK_MAX = 4.0;
  const PLAYBACK_KEY = 'playback';

  const getPlaybackRate = () => APP.elements.video.playbackRate;

  const storePlaybackRate = (rate) => localStorage.setItem(PLAYBACK_KEY, rate);

  const fetchPlaybackRate = () => {
    const rate = localStorage.getItem(PLAYBACK_KEY);
    return rate ? rate : 1.0;
  };

  const updatePlaybackRate = (rate) => {
    if (!APP.elements.video) {
      return;
    }
    APP.elements.video.playbackRate = rate;
    APP.elements.playbackReset.innerHTML = Number(rate).toFixed(2) + 'x';
    storePlaybackRate(rate);
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

  // Export
  APP.fetchPlaybackRate = fetchPlaybackRate;

  // Export
  APP.updatePlaybackRate = updatePlaybackRate;

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
