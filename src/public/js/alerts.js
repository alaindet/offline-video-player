(() => {

  const onAlertClose = (event) => {
    event.target.closest('.alert').remove();
  };

  APP.registerElements({
    alert: document.querySelector('.alert'),
  });

  APP.registerCallback(() => {
    APP.elements?.alert.addEventListener('click', onAlertClose);
  });

})();
