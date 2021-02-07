(() => {

  const onBookmarkClick = async () => {
    const urlPath = APP.elements.video?.getAttribute('data-current-video');
    const options = { method: 'PATCH' };
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
