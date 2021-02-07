(() => {

  const interval = 2000;
  const threshold = 0.8;
  let seen = 0;
  let timer = null;
  let rate = 1.0;

  const onTrackingInit = () => {
    rate = APP.fetchPlaybackRate();
  };

  const onVideoRateChange = (event) => {
    const playbackRate = event.target.playbackRate;
    rate = playbackRate;
  };

  const markVideoAsSeen = async () => {
    const urlPath = APP.elements.video?.getAttribute('data-current-video');
    const response = await fetch(`/video/${urlPath}/seen`, { method: 'PATCH' });
    const body = await response.json();
    APP.addAlert(body.message);
    stopTimer();
  }

  const checkVideoCompletion = () => {
    seen += (interval / 1000) * rate;
    const duration = APP.elements.video.duration;
    const completion = seen / duration;
    if (completion > threshold) {
      markVideoAsSeen();
    }
  };

  const startTimer = () => {
    timer = setInterval(() => checkVideoCompletion(), interval);
  };

  const stopTimer = () => {
    if (timer !== null) {
      clearInterval(timer);
    }
  };

  const onStopCheckingVideoCompletion = (event) => {
    stopTimer();
  };

  const onStartCheckingVideoCompletion = (event) => {
    stopTimer();
    startTimer();
  };

  APP.registerSelectors({
    video: '.video-player',
    markAsSeen: '#mark-as-seen',
  });

  APP.registerEventHandlers([
    { element: 'markAsSeen', event: 'click', handler: () => markVideoAsSeen() },
    { element: 'video', event: 'play', handler: onStartCheckingVideoCompletion },
    { element: 'video', event: 'playing', handler: onStartCheckingVideoCompletion },
    { element: 'video', event: 'pause', handler: onStopCheckingVideoCompletion },
    { element: 'video', event: 'seeking', handler: onStopCheckingVideoCompletion },
    { element: 'video', event: 'waiting', handler: onStopCheckingVideoCompletion },
    { element: 'video', event: 'abort', handler: onStopCheckingVideoCompletion },
    { element: 'video', event: 'ratechange', handler: onVideoRateChange },
  ]);

  APP.registerCallback(onTrackingInit);

})();
