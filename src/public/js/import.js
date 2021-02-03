const onProgressInputChange = (event) => {
  event.target.closest('form').submit();
};

const onProgressInputClick = (event) => {
  event.stopPropagation();
};

const onProgressBannerClick = (event) => {
  event.stopPropagation();
  elements.progressInput.click();
};

document.addEventListener('DOMContentLoaded', () => {

  selectElements({
    progressInput: document.querySelector('#progress-input'),
    progressBanner: document.querySelector('#progress-input-banner'),
  });

  elements.progressInput?.addEventListener('change', onProgressInputChange);
  elements.progressInput?.addEventListener('click', onProgressInputClick);
  elements.progressBanner?.addEventListener('click', onProgressBannerClick);
});
