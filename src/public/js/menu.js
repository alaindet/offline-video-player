(() => {

  const onMenuOpen = () => {
    APP.elements.menu.classList.add('shown');
  };

  const onMenuClose = () => {
    APP.elements.menu.classList.remove('shown');
  };

  APP.registerSelectors({
    menu: '.menu',
    menuOpen: '#menu-open',
    menuClose: '.menu-close',
  });

  APP.registerEventHandlers([
    { element: 'menuOpen', event: 'click', handler: onMenuOpen },
    { element: 'menuClose', event: 'click', handler: onMenuClose },
  ]);

})();
