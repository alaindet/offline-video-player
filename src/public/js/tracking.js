const TRACKING_INTERVAL = 3000;
let TRACKING_SEEN = 0;
let TRACKING_TIMER = null;
let TRACKING_DURATION = 0;
let TRACKING_THRESHOLD = 0.9;

const markVideoAsSeen = async () => {
  const urlPath = elements.video?.getAttribute('data-current-video');
  const data = { urlPath };
  try {
    // TODO: Try removing default props
    const response = await fetch('/video/seen', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    console.log(response.json());
  } catch (error) {
    console.error('HTTP ERROR', error);
  }
}

const checkVideoCompletion = () => {

  // TODO
  console.log('checking video completion...');

  const increment = TRACKING_INTERVAL / 1000;
  TRACKING_SEEN += increment;
  const completion = TRACKING_SEEN / TRACKING_DURATION;

  if (completion > TRACKING_THRESHOLD) {
    // TODO
    console.log('mark as seen...');
  }
};

const onStopCheckingVideoCompletion = (event) => {
  console.log('onStopCheckingVideoCompletion', event.type);
  if (TRACKING_TIMER !== null) {
    clearInterval(TRACKING_INTERVAL);
  }
};

const onStartCheckingVideoCompletion = (event) => {
  console.log('onStopCheckingVideoCompletion', event.type);
  if (TRACKING_TIMER !== null) {
    clearInterval(TRACKING_INTERVAL);
  }
  TRACKING_TIMER = setInterval(checkVideoCompletion, TRACKING_INTERVAL);
};

const initDuration = () => {
  TRACKING_DURATION = elements.video?.duration;
}

document.addEventListener('DOMContentLoaded', () => {

  selectElements({
    video: document.querySelector('.video-player'),
  });

  initDuration();

  elements.video?.addEventListener('play', onStartCheckingVideoCompletion);
  elements.video?.addEventListener('playing', onStartCheckingVideoCompletion);
  elements.video?.addEventListener('pause', onStopCheckingVideoCompletion);
  elements.video?.addEventListener('seeking', onStopCheckingVideoCompletion);
  elements.video?.addEventListener('waiting', onStopCheckingVideoCompletion);
  elements.video?.addEventListener('waiting', onStopCheckingVideoCompletion);
});
