(() => {

  const onProgressInputChange = (event) => {
    event.target.closest('form').submit();
  };

  const onProgressInputClick = (event) => {
    event.stopPropagation();
  };

  const onProgressBannerClick = (event) => {
    event.stopPropagation();
    APP.elements.progressInput.click();
  };

  APP.registerElements({
    progressInput: document.querySelector('#progress-input'),
    progressBanner: document.querySelector('#progress-input-banner'),
  });

  APP.registerCallback(() => {
    elements.progressInput?.addEventListener('change', onProgressInputChange);
    elements.progressInput?.addEventListener('click', onProgressInputClick);
    elements.progressBanner?.addEventListener('click', onProgressBannerClick);
  });

})();
