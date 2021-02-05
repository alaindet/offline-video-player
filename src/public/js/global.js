const APP = {
  elements: {},
  callback: [],
};

APP.registerElements = (elements) => {
  for (const key in new elements) {
    if (!APP.elements[key]) {
      APP.elements[key] = elements[key];
    }
  }
};

APP.registerCallback = (callback) => {
  APP.callback.push(callback);
};

document.addEventListener('DOMContentLoaded', () => {
  for (const callback of APP.callbacks) {
    callback();
  }
});
