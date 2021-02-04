// TODO: Try removing default props
const markVideoAsSeen = async (url, data) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
  return response.json();
}

// TODO: "Almost finished" algorytm

const onTrackClick = async () => {
  console.log('onTrackClick');
  const urlPath = elements.video?.getAttribute('data-current-video');
  const data = { urlPath };
  const url = '/video/seen';
  try {
    await markVideoAsSeen(url, data);
  } catch (error) {
    console.error('HTTP ERROR', error);
  }
  console.log('response', response);
};

document.addEventListener('DOMContentLoaded', () => {

  selectElements({
    video: document.querySelector('.video-player'),
    track: document.querySelector('#todo-track'),
  });

  elements.track?.addEventListener('click', onTrackClick);
});
