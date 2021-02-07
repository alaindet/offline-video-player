(() => {

  const onAlertClose = (event) => {
    event.target.closest('.alert').remove();
  };

  APP.addAlert = (message, timeout = 2000) => {
    
    APP.elements.alerts.innerHTML += `
      <div class="alert">
        <span class="alert-content">${message}</span>
        <button class="alert-close">&times;</button>
      </div>
    `;

    if (timeout !== -1) {
      setTimeout(() => APP.elements.alerts.innerHTML = '', timeout);
    }

  };

  APP.registerSelectors({
    alerts: '.alerts',
    alert: '.alert',
  });

  APP.registerRootEventHandlers([
    { selector: '.alert-close', event: 'click', handler: onAlertClose },
  ]);

})();
