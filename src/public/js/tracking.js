(() => {

  const interval = 1000;
  const threshold = 12; // 12 seconds
  let timer = null;

  const markVideoAsWatched = async (event) => {
    const action = event.target.checked ? 'mark' : 'unmark';
    const urlPath = APP.elements.video?.getAttribute('data-current-video');
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urlPath, action }),
    };
    const response = await fetch(`/video/${urlPath}/watched`, options);
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
    { element: 'markAsWatched', event: 'click', handler: (e) => markVideoAsWatched(e) },
    { element: 'video', event: 'play', handler: onStartCheckingVideoCompletion },
    { element: 'video', event: 'playing', handler: onStartCheckingVideoCompletion },
    { element: 'video', event: 'pause', handler: onStopCheckingVideoCompletion },
    { element: 'video', event: 'seeking', handler: onStopCheckingVideoCompletion },
    { element: 'video', event: 'waiting', handler: onStopCheckingVideoCompletion },
    { element: 'video', event: 'abort', handler: onStopCheckingVideoCompletion },
  ]);

})();
