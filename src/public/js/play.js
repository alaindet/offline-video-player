(() => {

  const onVideoInit = () => {
    if (!APP.elements.video) {
      return;
    }

    // Select <video>
    const video = APP.elements.video;

    // Update playback rate from local storage
    APP.updatePlaybackRate(APP?.fetchPlaybackRate());

    // Set currentTime if provided
    const currentTime = video?.getAttribute('data-current-time');
    if (currentTime) {
      video.currentTime = currentTime;
    }

    // Play
    video.play();
  };

  APP.registerSelectors({
    video: '.video-player',
  });

  APP.registerCallback(onVideoInit);

})();
