function onAlertClose(event) {
  event.target.closest('.alert').remove();
};

document.addEventListener('DOMContentLoaded', () => {

  selectElements({
    alert: document.querySelector('.alert'),
  });

  elements.alert?.addEventListener('click', onAlertClose);
});
