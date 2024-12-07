'use strict';

var domQuery = require('../@zag-js/dom-query');
var focusTrap = require('focus-trap');

// src/index.ts
function trapFocus(el, options = {}) {
  let trap;
  domQuery.raf(() => {
    const contentEl = typeof el === "function" ? el() : el;
    if (!contentEl) return;
    trap = focusTrap.createFocusTrap(contentEl, {
      escapeDeactivates: false,
      allowOutsideClick: true,
      preventScroll: true,
      returnFocusOnDeactivate: true,
      delayInitialFocus: false,
      fallbackFocus: contentEl,
      ...options,
      document: domQuery.getDocument(contentEl)
    });
    try {
      trap.activate();
    } catch {
    }
  });
  return function destroy() {
    trap?.deactivate();
  };
}

Object.defineProperty(exports, "createFocusTrap", {
  enumerable: true,
  get: function () { return focusTrap.createFocusTrap; }
});
exports.trapFocus = trapFocus;
