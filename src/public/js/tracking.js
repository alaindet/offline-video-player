(() => {

  const interval = 2000;
  const threshold = 0.8;
  let watched = 0;
  let timer = null;
  let rate = 1.0;

  const onTrackingInit = () => {
    rate = APP.fetchPlaybackRate();
  };

  const onVideoRateChange = (event) => {
    const playbackRate = event.target.playbackRate;
    rate = playbackRate;
  };

  const markVideoAsWatched = async () => {
    const urlPath = APP.elements.video?.getAttribute('data-current-video');
    const response = await fetch(`/video/${urlPath}/watched`, { method: 'PATCH' });
    const body = await response.json();
    APP.addAlert(body.message);
    stopTimer();
  }

  const checkVideoCompletion = () => {
    watched += (interval / 1000) * rate;
    const duration = APP.elements.video.duration;
    const completion = watched / duration;
    if (completion > threshold) {
      markVideoAsWatched();
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
    markAsWatched: '#mark-as-watched',
  });

  APP.registerEventHandlers([
    { element: 'markAsWatched', event: 'click', handler: () => markVideoAsWatched() },
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
