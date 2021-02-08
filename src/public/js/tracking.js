(() => {

  const interval = 1000;
  const threshold = 12; // 12 seconds
  let timer = null;

  const markVideoAsWatched = async () => {
    const urlPath = APP.elements.video?.getAttribute('data-current-video');
    const response = await fetch(`/video/${urlPath}/watched`, { method: 'PATCH' });
    const body = await response.json();
    APP.addAlert(body.message);
    stopTimer();
  };

  const checkVideoCompletion = () => {
    const currentTime = APP.elements.video.currentTime;
    const duration = APP.elements.video.duration;
    if (currentTime > duration - threshold) {
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
  ]);

})();
