(() => {

  const interval = 1000;
  const threshold = 0.9;
  let seen = 0;
  let timer = null;
  let rate = 1.0;

  const onVideoRateChange = (event) => {
    const playbackRate = event.target.playbackRate;
    rate = playbackRate;
  };

  const markVideoAsSeen = async () => {
    const urlPath = APP.elements.video?.getAttribute('data-current-video');
    const data = { urlPath };
    await fetch('/video/seen', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  const checkVideoCompletion = () => {
    seen += (interval / 1000) * rate;
    const duration = APP.elements.video.duration;
    const completion = seen / duration;
    if (completion > threshold) {
      markVideoAsSeen();
      stopTimer();
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
  });

  APP.registerEventHandlers([
    { element: 'video', event: 'play', handler: onStartCheckingVideoCompletion },
    { element: 'video', event: 'playing', handler: onStartCheckingVideoCompletion },
    { element: 'video', event: 'pause', handler: onStopCheckingVideoCompletion },
    { element: 'video', event: 'seeking', handler: onStopCheckingVideoCompletion },
    { element: 'video', event: 'waiting', handler: onStopCheckingVideoCompletion },
    { element: 'video', event: 'abort', handler: onStopCheckingVideoCompletion },
    { element: 'video', event: 'ratechange', handler: onVideoRateChange },
  ]);

})();
