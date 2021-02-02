const onMenuOpen = () => {
  elements.menu.classList.add('shown');
};

const onMenuClose = () => {
  elements.menu.classList.remove('shown');
};

document.addEventListener('DOMContentLoaded', () => {

  selectElements({
    menu: document.querySelector('.menu'),
    menuOpen: document.querySelector('#menu-open'),
    menuClose: document.querySelector('.menu-close'),
  });

  elements.menuOpen?.addEventListener('click', onMenuOpen);
  elements.menuClose?.addEventListener('click', onMenuClose);
});
