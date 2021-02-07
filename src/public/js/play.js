(() => {

  const onVideoInit = () => {
    if (!APP.elements.video) {
      return;
    }
    const video = APP.elements.video;
    APP.updatePlaybackRate(APP?.fetchPlaybackRate());
    video.play();
  };

  APP.registerSelectors({
    video: '.video-player',
  });

  APP.registerCallback(onVideoInit);

})();
