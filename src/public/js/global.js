const APP = {
  elements: {},
  callbacks: [],
};

APP.registerElements = (elements) => {
  APP.elements = { ...APP.elements, ...elements };
};

APP.registerCallback = (callback) => {
  APP.callbacks = [...APP.callbacks, callback];
};

document.addEventListener('DOMContentLoaded', () => {
  for (const callback of APP.callbacks) {
    callback();
  }
});
