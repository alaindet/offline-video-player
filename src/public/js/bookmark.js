(() => {

  const onBookmarkClick = async () => {
    const urlPath = APP.elements.video?.getAttribute('data-current-video');
    const currentTime = APP.elements.video.currentTime;
    const bookmark = { urlPath, currentTime };
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookmark),
    };
    const response = await fetch(`/video/${urlPath}/bookmark`, options);
    const body = await response.json();
    APP.addAlert(body.message);
  };

  APP.registerSelectors({
    video: '.video-player',
    bookmark: '#bookmark',
  });

  APP.registerEventHandlers([
    { element: 'bookmark', event: 'click', handler: () => onBookmarkClick() },
  ]);

})();
