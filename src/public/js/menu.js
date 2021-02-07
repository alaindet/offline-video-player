(() => {

  const onMenuOpen = () => {
    APP.elements.menu.classList.add('shown');
    APP.elements.currentVideo.scrollIntoView({ block: 'center' });
  };

  const onMenuClose = () => {
    APP.elements.menu.classList.remove('shown');
  };

  APP.registerSelectors({
    menu: '.menu',
    menuOpen: '#menu-open',
    menuClose: '#menu-close',
    currentVideo: '.video-item.active',
  });

  APP.registerEventHandlers([
    { element: 'menuOpen', event: 'click', handler: onMenuOpen },
    { element: 'menuClose', event: 'click', handler: onMenuClose },
  ]);

  APP.registerRootEventHandlers([
    {
      selector: ':not(.menu,#menu-open)',
      event: 'click',
      handler: onMenuClose,
    },
  ]);

})();
