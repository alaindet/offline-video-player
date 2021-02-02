let elements = {};

const selectElements = () => {
  return {
    menu: document.querySelector('.menu'),
    menuOpen: document.querySelector('#menu-open'),
    menuClose: document.querySelector('.menu-close'),
  };
};

const onMenuOpen = () => {
  elements.menu.classList.add('shown');
};

const onMenuClose = () => {
  elements.menu.classList.remove('shown');
};

const init = () => {
  elements = selectElements();
  elements.menuOpen.addEventListener('click', onMenuOpen);
  elements.menuClose.addEventListener('click', onMenuClose);
};

document.addEventListener('DOMContentLoaded', init);
