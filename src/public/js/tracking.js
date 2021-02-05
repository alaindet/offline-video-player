(() => {

  const TRACKING_INTERVAL = 1000;
  const TRACKING_THRESHOLD = 0.9;
  let TRACKING_TIMER = null;

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
    const currentTime = APP.elements.video.currentTime;
    const duration = APP.elements.video.duration;
    const completion = currentTime / duration;

    if (completion > TRACKING_THRESHOLD) {
      markVideoAsSeen();
    }
  };

  const startTimer = () => {
    TRACKING_TIMER = setInterval(() => checkVideoCompletion(), TRACKING_INTERVAL);
  };

  const stopTimer = () => {
    if (TRACKING_TIMER !== null) {
      clearInterval(TRACKING_TIMER);
    }
  };

  const onStopCheckingVideoCompletion = (event) => {
    stopTimer();
  };

  const onStartCheckingVideoCompletion = (event) => {
    stopTimer();
    startTimer();
  };

  APP.registerElements({
    video: document.querySelector('.video-player'),
  });


  APP.registerCallback(() => {
    elements.video?.addEventListener('play', onStartCheckingVideoCompletion);
    elements.video?.addEventListener('playing', onStartCheckingVideoCompletion);
    elements.video?.addEventListener('pause', onStopCheckingVideoCompletion);
    elements.video?.addEventListener('seeking', onStopCheckingVideoCompletion);
    elements.video?.addEventListener('waiting', onStopCheckingVideoCompletion);
    elements.video?.addEventListener('abort', onStopCheckingVideoCompletion);
  });

})();
