const onAlertClose = (element) => {
  element.remove();
};

document.addEventListener('DOMContentLoaded', () => {

  selectElements({
    alert: document.querySelector('.alert'),
  });

  elements.alert.addEventListener('click', onAlertClose);
});
