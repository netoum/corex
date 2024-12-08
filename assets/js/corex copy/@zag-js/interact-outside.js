'use strict';

var domEvent = require('../@zag-js/dom-event');
var domQuery = require('../@zag-js/dom-query');
var utils = require('../@zag-js/utils');

// src/index.ts

// src/frame-utils.ts
function getWindowFrames(win) {
  const frames = {
    each(cb) {
      for (let i = 0; i < win.frames?.length; i += 1) {
        const frame = win.frames[i];
        if (frame) cb(frame);
      }
    },
    addEventListener(event, listener, options) {
      frames.each((frame) => {
        try {
          frame.document.addEventListener(event, listener, options);
        } catch {
        }
      });
      return () => {
        try {
          frames.removeEventListener(event, listener, options);
        } catch {
        }
      };
    },
    removeEventListener(event, listener, options) {
      frames.each((frame) => {
        try {
          frame.document.removeEventListener(event, listener, options);
        } catch {
        }
      });
    }
  };
  return frames;
}
function getParentWindow(win) {
  const parent = win.frameElement != null ? win.parent : null;
  return {
    addEventListener: (event, listener, options) => {
      try {
        parent?.addEventListener(event, listener, options);
      } catch {
      }
      return () => {
        try {
          parent?.removeEventListener(event, listener, options);
        } catch {
        }
      };
    },
    removeEventListener: (event, listener, options) => {
      try {
        parent?.removeEventListener(event, listener, options);
      } catch {
      }
    }
  };
}

// src/index.ts
var POINTER_OUTSIDE_EVENT = "pointerdown.outside";
var FOCUS_OUTSIDE_EVENT = "focus.outside";
function isComposedPathFocusable(composedPath) {
  for (const node of composedPath) {
    if (domQuery.isHTMLElement(node) && domQuery.isFocusable(node)) return true;
  }
  return false;
}
var isPointerEvent = (event) => "clientY" in event;
function isEventPointWithin(node, event) {
  if (!isPointerEvent(event) || !node) return false;
  const rect = node.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return false;
  return rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
}
function isEventWithinScrollbar(event, target) {
  if (!target || !isPointerEvent(event)) return false;
  const isScrollableY = target.scrollHeight > target.clientHeight;
  const onScrollbarY = isScrollableY && event.clientX > target.clientWidth;
  const isScrollableX = target.scrollWidth > target.clientWidth;
  const onScrollbarX = isScrollableX && event.clientY > target.clientHeight;
  return onScrollbarY || onScrollbarX;
}
function trackInteractOutsideImpl(node, options) {
  const { exclude, onFocusOutside, onPointerDownOutside, onInteractOutside, defer } = options;
  if (!node) return;
  const doc = domQuery.getDocument(node);
  const win = domQuery.getWindow(node);
  const frames = getWindowFrames(win);
  const parentWin = getParentWindow(win);
  function isEventOutside(event) {
    const target = domQuery.getEventTarget(event);
    if (!domQuery.isHTMLElement(target)) return false;
    if (domQuery.contains(node, target)) return false;
    if (isEventPointWithin(node, event)) return false;
    if (isEventWithinScrollbar(event, target)) return false;
    const scrollParent = domQuery.getNearestOverflowAncestor(node);
    if (isEventWithinScrollbar(event, scrollParent)) return false;
    return !exclude?.(target);
  }
  const pointerdownCleanups = /* @__PURE__ */ new Set();
  function onPointerDown(event) {
    function handler() {
      const func = defer ? domQuery.raf : (v) => v();
      const composedPath = event.composedPath?.() ?? [event.target];
      func(() => {
        if (!node || !isEventOutside(event)) return;
        if (onPointerDownOutside || onInteractOutside) {
          const handler2 = utils.callAll(onPointerDownOutside, onInteractOutside);
          node.addEventListener(POINTER_OUTSIDE_EVENT, handler2, { once: true });
        }
        domEvent.fireCustomEvent(node, POINTER_OUTSIDE_EVENT, {
          bubbles: false,
          cancelable: true,
          detail: {
            originalEvent: event,
            contextmenu: domEvent.isContextMenuEvent(event),
            focusable: isComposedPathFocusable(composedPath)
          }
        });
      });
    }
    if (event.pointerType === "touch") {
      pointerdownCleanups.forEach((fn) => fn());
      pointerdownCleanups.add(domEvent.addDomEvent(doc, "click", handler, { once: true }));
      pointerdownCleanups.add(parentWin.addEventListener("click", handler, { once: true }));
      pointerdownCleanups.add(frames.addEventListener("click", handler, { once: true }));
    } else {
      handler();
    }
  }
  const cleanups = /* @__PURE__ */ new Set();
  const timer = setTimeout(() => {
    cleanups.add(domEvent.addDomEvent(doc, "pointerdown", onPointerDown, true));
    cleanups.add(parentWin.addEventListener("pointerdown", onPointerDown, true));
    cleanups.add(frames.addEventListener("pointerdown", onPointerDown, true));
  }, 0);
  function onFocusin(event) {
    const func = defer ? domQuery.raf : (v) => v();
    func(() => {
      if (!node || !isEventOutside(event)) return;
      if (onFocusOutside || onInteractOutside) {
        const handler = utils.callAll(onFocusOutside, onInteractOutside);
        node.addEventListener(FOCUS_OUTSIDE_EVENT, handler, { once: true });
      }
      domEvent.fireCustomEvent(node, FOCUS_OUTSIDE_EVENT, {
        bubbles: false,
        cancelable: true,
        detail: {
          originalEvent: event,
          contextmenu: false,
          focusable: domQuery.isFocusable(domQuery.getEventTarget(event))
        }
      });
    });
  }
  cleanups.add(domEvent.addDomEvent(doc, "focusin", onFocusin, true));
  cleanups.add(parentWin.addEventListener("focusin", onFocusin, true));
  cleanups.add(frames.addEventListener("focusin", onFocusin, true));
  return () => {
    clearTimeout(timer);
    pointerdownCleanups.forEach((fn) => fn());
    cleanups.forEach((fn) => fn());
  };
}
function trackInteractOutside(nodeOrFn, options) {
  const { defer } = options;
  const func = defer ? domQuery.raf : (v) => v();
  const cleanups = [];
  cleanups.push(
    func(() => {
      const node = typeof nodeOrFn === "function" ? nodeOrFn() : nodeOrFn;
      cleanups.push(trackInteractOutsideImpl(node, options));
    })
  );
  return () => {
    cleanups.forEach((fn) => fn?.());
  };
}

exports.trackInteractOutside = trackInteractOutside;