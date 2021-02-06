const APP = {
  elements: {},
  selectors: {},
  eventHandlers: [],
  rootEventHandlers: [],
};

APP.registerSelectors = (selectors) => {
  APP.selectors = { ...APP.selectors, ...selectors };
};

APP.registerEventHandlers = (eventHandlers) => {
  APP.eventHandlers = [...APP.eventHandlers, ...eventHandlers];
};

APP.registerRootEventHandlers = (rootEventHandlers) => {
  APP.rootEventHandlers = [...APP.rootEventHandlers, ...rootEventHandlers];
};

const initSelectors = () => {
  for (const key in APP.selectors) {
    const selector = APP.selectors[key];
    APP.elements[key] = document.querySelector(selector);
  }
};

const initRootEventHandlers = () => {
  for (const rootEventHandler of APP.rootEventHandlers) {
    const { selector, event, handler } = rootEventHandler;
    document.addEventListener(event, (docEvent) => {
      const element = docEvent.target;
      if (element.matches(selector)) {
        handler(docEvent);
      }
    });
  }
};

const initEventHandlers = () => {
  for (const eventHandler of APP.eventHandlers) {
    const { element, event, handler } = eventHandler;
    const targetElement = APP.elements[element];
    if (targetElement) {
      targetElement.addEventListener(event, handler);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initSelectors();
  initRootEventHandlers();
  initEventHandlers();
});
