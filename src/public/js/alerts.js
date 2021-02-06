(() => {

  const onAlertClose = (event) => {
    event.target.closest('.alert').remove();
  };

  APP.addAlert = (message) => {
    APP.elements.alerts.innerHTML += `
      <div class="alert">
        <span class="alert-content">${message}</span>
        <button class="alert-close">&times;</button>
      </div>
    `;
  };

  APP.registerSelectors({
    alerts: '.alerts',
    alert: '.alert',
  });

  APP.registerRootEventHandlers([
    { selector: '.alert-close', event: 'click', handler: onAlertClose },
  ]);

})();
