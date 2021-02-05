(() => {

  const onMenuOpen = () => {
    APP.elements.menu.classList.add('shown');
  };

  const onMenuClose = () => {
    APP.elements.menu.classList.remove('shown');
  };

  APP.registerElements({
    menu: document.querySelector('.menu'),
    menuOpen: document.querySelector('#menu-open'),
    menuClose: document.querySelector('.menu-close'),
  });

  APP.registerCallback(() => {
    APP.elements.menuOpen?.addEventListener('click', onMenuOpen);
    APP.elements.menuClose?.addEventListener('click', onMenuClose);
  });

})();
