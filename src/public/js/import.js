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

  APP.registerSelectors({
    progressInput: '#progress-input',
    progressBanner: '#progress-input-banner',
  });

  APP.registerEventHandlers([
    { element: 'progressInput', event: 'change', handler: onProgressInputChange },
    { element: 'progressInput', event: 'click', handler: onProgressInputClick },
    { element: 'progressBanner', event: 'click', handler: onProgressBannerClick },
  ]);

})();
