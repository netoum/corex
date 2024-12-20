"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  MAX_Z_INDEX: () => MAX_Z_INDEX,
  ariaAttr: () => ariaAttr,
  contains: () => contains,
  createScope: () => createScope,
  dataAttr: () => dataAttr,
  defaultItemToId: () => defaultItemToId,
  getActiveElement: () => getActiveElement,
  getBeforeInputValue: () => getBeforeInputValue,
  getByText: () => getByText,
  getByTypeahead: () => getByTypeahead,
  getComputedStyle: () => getComputedStyle,
  getDataUrl: () => getDataUrl,
  getDocument: () => getDocument,
  getDocumentElement: () => getDocumentElement,
  getEventTarget: () => getEventTarget,
  getFirstFocusable: () => getFirstFocusable,
  getFirstTabbable: () => getFirstTabbable,
  getFocusables: () => getFocusables,
  getInitialFocus: () => getInitialFocus,
  getLastTabbable: () => getLastTabbable,
  getNearestOverflowAncestor: () => getNearestOverflowAncestor,
  getNextTabbable: () => getNextTabbable,
  getNodeName: () => getNodeName,
  getOverflowAncestors: () => getOverflowAncestors,
  getParentNode: () => getParentNode,
  getPlatform: () => getPlatform,
  getScrollPosition: () => getScrollPosition,
  getTabbableEdges: () => getTabbableEdges,
  getTabbables: () => getTabbables,
  getWindow: () => getWindow,
  indexOfId: () => indexOfId,
  isApple: () => isApple,
  isComposingEvent: () => isComposingEvent,
  isDocument: () => isDocument,
  isDom: () => isDom,
  isDownloadingEvent: () => isDownloadingEvent,
  isEditableElement: () => isEditableElement,
  isFirefox: () => isFirefox,
  isFocusable: () => isFocusable,
  isHTMLElement: () => isHTMLElement,
  isHiddenElement: () => isHiddenElement,
  isInView: () => isInView,
  isIos: () => isIos,
  isMac: () => isMac,
  isModKey: () => isModKey,
  isNode: () => isNode,
  isOpeningInNewTab: () => isOpeningInNewTab,
  isOverflowElement: () => isOverflowElement,
  isRootElement: () => isRootElement,
  isSafari: () => isSafari,
  isSelfTarget: () => isSelfTarget,
  isShadowRoot: () => isShadowRoot,
  isTabbable: () => isTabbable,
  isTouchDevice: () => isTouchDevice,
  isValidTabEvent: () => isValidTabEvent,
  isVisualViewport: () => isVisualViewport,
  isWebKit: () => isWebKit,
  isWindow: () => isWindow,
  itemById: () => itemById,
  nextById: () => nextById,
  nextTick: () => nextTick,
  observeAttributes: () => observeAttributes,
  observeChildren: () => observeChildren,
  prevById: () => prevById,
  proxyTabFocus: () => proxyTabFocus,
  query: () => query,
  queryAll: () => queryAll,
  raf: () => raf,
  scrollIntoView: () => scrollIntoView,
  set: () => set,
  setAttribute: () => setAttribute,
  setProperty: () => setProperty,
  setStyle: () => setStyle,
  visuallyHiddenStyle: () => visuallyHiddenStyle,
  waitForElement: () => waitForElement,
  waitForElements: () => waitForElements
});
module.exports = __toCommonJS(src_exports);

// src/attrs.ts
var dataAttr = (guard) => guard ? "" : void 0;
var ariaAttr = (guard) => guard ? "true" : void 0;

// src/constants.ts
var MAX_Z_INDEX = 2147483647;

// src/is.ts
var isHTMLElement = (v) => typeof v === "object" && v?.nodeType === Node.ELEMENT_NODE && typeof v?.nodeName === "string";
var isDocument = (el) => el.nodeType === Node.DOCUMENT_NODE;
var isWindow = (el) => el != null && el === el.window;
var isVisualViewport = (el) => el != null && el.constructor.name === "VisualViewport";
var getNodeName = (node) => {
  if (isHTMLElement(node)) return node.localName || "";
  return "#document";
};
function isRootElement(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
var isNode = (el) => el.nodeType !== void 0;
var isShadowRoot = (el) => el && isNode(el) && el.nodeType === Node.DOCUMENT_FRAGMENT_NODE && "host" in el;

// src/contains.ts
function contains(parent, child) {
  if (!parent || !child) return false;
  if (!isHTMLElement(parent) || !isHTMLElement(child)) return false;
  return parent === child || parent.contains(child);
}

// src/env.ts
function getDocument(el) {
  if (isDocument(el)) return el;
  if (isWindow(el)) return el.document;
  return el?.ownerDocument ?? document;
}
function getDocumentElement(el) {
  return getDocument(el).documentElement;
}
function getWindow(el) {
  if (isShadowRoot(el)) return getWindow(el.host);
  if (isDocument(el)) return el.defaultView ?? window;
  if (isHTMLElement(el)) return el.ownerDocument?.defaultView ?? window;
  return window;
}
function getActiveElement(el) {
  const doc = getDocument(el);
  let activeElement = doc.activeElement;
  while (activeElement?.shadowRoot) {
    const el2 = activeElement.shadowRoot.activeElement;
    if (el2 === activeElement) break;
    else activeElement = el2;
  }
  return activeElement;
}

// src/data-url.ts
function getDataUrl(svg, opts) {
  const { type, quality = 0.92 } = opts;
  if (!svg) throw new Error("[get-data-url]: could not find the svg element");
  const win = getWindow(svg);
  const doc = win.document;
  const serializer = new win.XMLSerializer();
  const source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(svg);
  const svgString = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
  if (type === "image/svg+xml") {
    return Promise.resolve(svgString);
  }
  const svgBounds = svg.getBoundingClientRect();
  const dpr = win.devicePixelRatio || 1;
  const canvas = doc.createElement("canvas");
  const image = new win.Image();
  image.src = svgString;
  canvas.width = svgBounds.width * dpr;
  canvas.height = svgBounds.height * dpr;
  const context = canvas.getContext("2d");
  context.scale(dpr, dpr);
  return new Promise((resolve) => {
    image.onload = () => {
      context.drawImage(image, 0, 0);
      resolve(canvas.toDataURL(type, quality));
    };
  });
}

// src/platform.ts
var isDom = () => typeof document !== "undefined";
function getPlatform() {
  const agent = navigator.userAgentData;
  return agent?.platform ?? navigator.platform;
}
var pt = (v) => isDom() && v.test(getPlatform());
var ua = (v) => isDom() && v.test(navigator.userAgent);
var vn = (v) => isDom() && v.test(navigator.vendor);
var isTouchDevice = () => isDom() && !!navigator.maxTouchPoints;
var isMac = () => pt(/^Mac/);
var isSafari = () => isApple() && vn(/apple/i);
var isFirefox = () => ua(/firefox\//i);
var isApple = () => pt(/mac|iphone|ipad|ipod/i);
var isIos = () => pt(/iP(hone|ad|od)|iOS/);
var isWebKit = () => ua(/AppleWebKit/);
var isModKey = (event) => isApple() ? event.metaKey : event.ctrlKey;

// src/event.ts
function getBeforeInputValue(event) {
  const { selectionStart, selectionEnd, value } = event.currentTarget;
  return value.slice(0, selectionStart) + event.data + value.slice(selectionEnd);
}
function getComposedPath(event) {
  return event.composedPath?.() ?? event.nativeEvent?.composedPath?.();
}
function getEventTarget(event) {
  const composedPath = getComposedPath(event);
  return composedPath?.[0] ?? event.target;
}
var isSelfTarget = (event) => {
  return contains(event.currentTarget, getEventTarget(event));
};
function isOpeningInNewTab(event) {
  const element = event.currentTarget;
  if (!element) return false;
  const isAppleDevice = isApple();
  if (isAppleDevice && !event.metaKey) return false;
  if (!isAppleDevice && !event.ctrlKey) return false;
  const localName = element.localName;
  if (localName === "a") return true;
  if (localName === "button" && element.type === "submit") return true;
  if (localName === "input" && element.type === "submit") return true;
  return false;
}
function isDownloadingEvent(event) {
  const element = event.currentTarget;
  if (!element) return false;
  const localName = element.localName;
  if (!event.altKey) return false;
  if (localName === "a") return true;
  if (localName === "button" && element.type === "submit") return true;
  if (localName === "input" && element.type === "submit") return true;
  return false;
}
function isComposingEvent(event) {
  return event.nativeEvent?.isComposing ?? event.isComposing;
}

// src/get-by-id.ts
var defaultItemToId = (v) => v.id;
function itemById(v, id, itemToId = defaultItemToId) {
  return v.find((item) => itemToId(item) === id);
}
function indexOfId(v, id, itemToId = defaultItemToId) {
  const item = itemById(v, id, itemToId);
  return item ? v.indexOf(item) : -1;
}
function nextById(v, id, loop = true) {
  let idx = indexOfId(v, id);
  idx = loop ? (idx + 1) % v.length : Math.min(idx + 1, v.length - 1);
  return v[idx];
}
function prevById(v, id, loop = true) {
  let idx = indexOfId(v, id);
  if (idx === -1) return loop ? v[v.length - 1] : null;
  idx = loop ? (idx - 1 + v.length) % v.length : Math.max(0, idx - 1);
  return v[idx];
}

// src/sanitize.ts
var sanitize = (str) => str.split("").map((char) => {
  const code = char.charCodeAt(0);
  if (code > 0 && code < 128) return char;
  if (code >= 128 && code <= 255) return `/x${code.toString(16)}`.replace("/", "\\");
  return "";
}).join("").trim();

// src/get-by-text.ts
var getValueText = (item) => sanitize(item.dataset.valuetext ?? item.textContent ?? "");
var match = (valueText, query2) => valueText.trim().toLowerCase().startsWith(query2.toLowerCase());
var wrap = (v, idx) => {
  return v.map((_, index) => v[(Math.max(idx, 0) + index) % v.length]);
};
function getByText(v, text, currentId, itemToId = defaultItemToId) {
  const index = currentId ? indexOfId(v, currentId, itemToId) : -1;
  let items = currentId ? wrap(v, index) : v;
  const isSingleKey = text.length === 1;
  if (isSingleKey) {
    items = items.filter((item) => itemToId(item) !== currentId);
  }
  return items.find((item) => match(getValueText(item), text));
}

// src/get-by-typeahead.ts
function getByTypeaheadImpl(_items, options) {
  const { state, activeId, key, timeout = 350, itemToId } = options;
  const search = state.keysSoFar + key;
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const query2 = isRepeated ? search[0] : search;
  let items = _items.slice();
  const next = getByText(items, query2, activeId, itemToId);
  function cleanup() {
    clearTimeout(state.timer);
    state.timer = -1;
  }
  function update(value) {
    state.keysSoFar = value;
    cleanup();
    if (value !== "") {
      state.timer = +setTimeout(() => {
        update("");
        cleanup();
      }, timeout);
    }
  }
  update(search);
  return next;
}
var getByTypeahead = /* @__PURE__ */ Object.assign(getByTypeaheadImpl, {
  defaultOptions: { keysSoFar: "", timer: -1 },
  isValidEvent: isValidTypeaheadEvent
});
function isValidTypeaheadEvent(event) {
  return event.key.length === 1 && !event.ctrlKey && !event.metaKey;
}

// src/get-computed-style.ts
var styleCache = /* @__PURE__ */ new WeakMap();
function getComputedStyle(el) {
  if (!styleCache.has(el)) {
    styleCache.set(el, getWindow(el).getComputedStyle(el));
  }
  return styleCache.get(el);
}

// src/get-parent-node.ts
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}

// src/get-scroll-position.ts
function getScrollPosition(element) {
  if (isHTMLElement(element)) {
    return { scrollLeft: element.scrollLeft, scrollTop: element.scrollTop };
  }
  return { scrollLeft: element.scrollX, scrollTop: element.scrollY };
}

// src/tabbable.ts
var isHTMLElement2 = (element) => typeof element === "object" && element !== null && element.nodeType === 1;
var isFrame = (element) => isHTMLElement2(element) && element.tagName === "IFRAME";
function isVisible(el) {
  if (!isHTMLElement2(el)) return false;
  return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
}
function hasNegativeTabIndex(element) {
  const tabIndex = parseInt(element.getAttribute("tabindex") || "0", 10);
  return tabIndex < 0;
}
var focusableSelector = "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false']), details > summary:first-of-type";
var getFocusables = (container, includeContainer = false) => {
  if (!container) return [];
  const elements = Array.from(container.querySelectorAll(focusableSelector));
  const include = includeContainer == true || includeContainer == "if-empty" && elements.length === 0;
  if (include && isHTMLElement2(container) && isFocusable(container)) {
    elements.unshift(container);
  }
  const focusableElements = elements.filter(isFocusable);
  focusableElements.forEach((element, i) => {
    if (isFrame(element) && element.contentDocument) {
      const frameBody = element.contentDocument.body;
      focusableElements.splice(i, 1, ...getFocusables(frameBody));
    }
  });
  return focusableElements;
};
function isFocusable(element) {
  if (!element || element.closest("[inert]")) return false;
  return element.matches(focusableSelector) && isVisible(element);
}
function getFirstFocusable(container, includeContainer) {
  const [first] = getFocusables(container, includeContainer);
  return first || null;
}
function getTabbables(container, includeContainer) {
  if (!container) return [];
  const elements = Array.from(container.querySelectorAll(focusableSelector));
  const tabbableElements = elements.filter(isTabbable);
  if (includeContainer && isTabbable(container)) {
    tabbableElements.unshift(container);
  }
  tabbableElements.forEach((element, i) => {
    if (isFrame(element) && element.contentDocument) {
      const frameBody = element.contentDocument.body;
      const allFrameTabbable = getTabbables(frameBody);
      tabbableElements.splice(i, 1, ...allFrameTabbable);
    }
  });
  if (!tabbableElements.length && includeContainer) {
    return elements;
  }
  return tabbableElements;
}
function isTabbable(el) {
  if (el != null && el.tabIndex > 0) return true;
  return isFocusable(el) && !hasNegativeTabIndex(el);
}
function getFirstTabbable(container, includeContainer) {
  const [first] = getTabbables(container, includeContainer);
  return first || null;
}
function getLastTabbable(container, includeContainer) {
  const elements = getTabbables(container, includeContainer);
  return elements[elements.length - 1] || null;
}
function getTabbableEdges(container, includeContainer) {
  const elements = getTabbables(container, includeContainer);
  const first = elements[0] || null;
  const last = elements[elements.length - 1] || null;
  return [first, last];
}
function getNextTabbable(container, current) {
  const tabbables = getTabbables(container);
  const doc = container?.ownerDocument || document;
  const currentElement = current ?? doc.activeElement;
  if (!currentElement) return null;
  const index = tabbables.indexOf(currentElement);
  return tabbables[index + 1] || null;
}

// src/initial-focus.ts
function getInitialFocus(options) {
  const { root, getInitialEl, filter, enabled = true } = options;
  if (!enabled) return;
  let node = null;
  node || (node = typeof getInitialEl === "function" ? getInitialEl() : getInitialEl);
  node || (node = root?.querySelector("[data-autofocus],[autofocus]"));
  if (!node) {
    const tabbables = getTabbables(root);
    node = filter ? tabbables.filter(filter)[0] : tabbables[0];
  }
  return node || root || void 0;
}
function isValidTabEvent(event) {
  const container = event.currentTarget;
  if (!container) return false;
  const [firstTabbable, lastTabbable] = getTabbableEdges(container);
  const doc = container.ownerDocument || document;
  if (doc.activeElement === firstTabbable && event.shiftKey) return false;
  if (doc.activeElement === lastTabbable && !event.shiftKey) return false;
  if (!firstTabbable && !lastTabbable) return false;
  return true;
}

// src/is-editable-element.ts
function isEditableElement(el) {
  if (el == null || !isHTMLElement(el)) {
    return false;
  }
  try {
    const win = getWindow(el);
    return el instanceof win.HTMLInputElement && el.selectionStart != null || /(textarea|select)/.test(el.localName) || el.isContentEditable;
  } catch {
    return false;
  }
}

// src/is-hidden-element.ts
function isHiddenElement(node) {
  if (node.parentElement && isHiddenElement(node.parentElement)) return true;
  return node.hidden;
}

// src/is-overflow-element.ts
var OVERFLOW_RE = /auto|scroll|overlay|hidden|clip/;
function isOverflowElement(el) {
  const win = getWindow(el);
  const { overflow, overflowX, overflowY, display } = win.getComputedStyle(el);
  return OVERFLOW_RE.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}

// src/raf.ts
function nextTick(fn) {
  const set2 = /* @__PURE__ */ new Set();
  function raf2(fn2) {
    const id = globalThis.requestAnimationFrame(fn2);
    set2.add(() => globalThis.cancelAnimationFrame(id));
  }
  raf2(() => raf2(fn));
  return function cleanup() {
    set2.forEach((fn2) => fn2());
  };
}
function raf(fn) {
  const id = globalThis.requestAnimationFrame(fn);
  return () => {
    globalThis.cancelAnimationFrame(id);
  };
}

// src/observe-attributes.ts
function observeAttributesImpl(node, options) {
  if (!node) return;
  const { attributes, callback: fn } = options;
  const win = node.ownerDocument.defaultView || window;
  const obs = new win.MutationObserver((changes) => {
    for (const change of changes) {
      if (change.type === "attributes" && change.attributeName && attributes.includes(change.attributeName)) {
        fn(change);
      }
    }
  });
  obs.observe(node, { attributes: true, attributeFilter: attributes });
  return () => obs.disconnect();
}
function observeAttributes(nodeOrFn, options) {
  const { defer } = options;
  const func = defer ? raf : (v) => v();
  const cleanups2 = [];
  cleanups2.push(
    func(() => {
      const node = typeof nodeOrFn === "function" ? nodeOrFn() : nodeOrFn;
      cleanups2.push(observeAttributesImpl(node, options));
    })
  );
  return () => {
    cleanups2.forEach((fn) => fn?.());
  };
}

// src/observe-children.ts
function observeChildrenImpl(node, options) {
  const { callback: fn } = options;
  if (!node) return;
  const win = node.ownerDocument.defaultView || window;
  const obs = new win.MutationObserver(fn);
  obs.observe(node, { childList: true, subtree: true });
  return () => obs.disconnect();
}
function observeChildren(nodeOrFn, options) {
  const { defer } = options;
  const func = defer ? raf : (v) => v();
  const cleanups2 = [];
  cleanups2.push(
    func(() => {
      const node = typeof nodeOrFn === "function" ? nodeOrFn() : nodeOrFn;
      cleanups2.push(observeChildrenImpl(node, options));
    })
  );
  return () => {
    cleanups2.forEach((fn) => fn?.());
  };
}

// src/overflow.ts
function getNearestOverflowAncestor(el) {
  const parentNode = getParentNode(el);
  if (isRootElement(parentNode)) {
    return getDocument(parentNode).body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(el, list = []) {
  const scrollableAncestor = getNearestOverflowAncestor(el);
  const isBody = scrollableAncestor === el.ownerDocument.body;
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, []));
}
var getRect = (el) => {
  if (isHTMLElement(el)) {
    return el.getBoundingClientRect();
  }
  if (isVisualViewport(el)) {
    return { top: 0, left: 0, bottom: el.height, right: el.width };
  }
  return { top: 0, left: 0, bottom: el.innerHeight, right: el.innerWidth };
};
function isInView(el, ancestor) {
  if (!isHTMLElement(el)) return true;
  const ancestorRect = getRect(ancestor);
  const elRect = el.getBoundingClientRect();
  return elRect.top >= ancestorRect.top && elRect.left >= ancestorRect.left && elRect.bottom <= ancestorRect.bottom && elRect.right <= ancestorRect.right;
}

// src/proxy-tab-focus.ts
function proxyTabFocusImpl(container, options = {}) {
  const { triggerElement, onFocus } = options;
  const doc = container?.ownerDocument || document;
  const body = doc.body;
  function onKeyDown(event) {
    if (event.key !== "Tab") return;
    let elementToFocus = null;
    const [firstTabbable, lastTabbable] = getTabbableEdges(container, true);
    const noTabbableElements = !firstTabbable && !lastTabbable;
    if (event.shiftKey && (doc.activeElement === firstTabbable || noTabbableElements)) {
      elementToFocus = triggerElement;
    } else if (!event.shiftKey && doc.activeElement === triggerElement) {
      elementToFocus = firstTabbable;
    } else if (!event.shiftKey && (doc.activeElement === lastTabbable || noTabbableElements)) {
      elementToFocus = getNextTabbable(body, triggerElement);
    }
    if (!elementToFocus) return;
    event.preventDefault();
    if (typeof onFocus === "function") {
      onFocus(elementToFocus);
    } else {
      elementToFocus.focus();
    }
  }
  doc?.addEventListener("keydown", onKeyDown, true);
  return () => {
    doc?.removeEventListener("keydown", onKeyDown, true);
  };
}
function proxyTabFocus(container, options) {
  const { defer, triggerElement, ...restOptions } = options;
  const func = defer ? raf : (v) => v();
  const cleanups2 = [];
  cleanups2.push(
    func(() => {
      const node = typeof container === "function" ? container() : container;
      const trigger = typeof triggerElement === "function" ? triggerElement() : triggerElement;
      cleanups2.push(proxyTabFocusImpl(node, { triggerElement: trigger, ...restOptions }));
    })
  );
  return () => {
    cleanups2.forEach((fn) => fn?.());
  };
}

// src/query.ts
function queryAll(root, selector) {
  return Array.from(root?.querySelectorAll(selector) ?? []);
}
function query(root, selector) {
  return root?.querySelector(selector) ?? null;
}

// src/scope.ts
function createScope(methods) {
  const dom = {
    getRootNode: (ctx) => ctx.getRootNode?.() ?? document,
    getDoc: (ctx) => getDocument(dom.getRootNode(ctx)),
    getWin: (ctx) => dom.getDoc(ctx).defaultView ?? window,
    getActiveElement: (ctx) => dom.getRootNode(ctx).activeElement,
    isActiveElement: (ctx, elem) => elem === dom.getActiveElement(ctx),
    getById: (ctx, id) => dom.getRootNode(ctx).getElementById(id),
    setValue: (elem, value) => {
      if (elem == null || value == null) return;
      const valueAsString = value.toString();
      if (elem.value === valueAsString) return;
      elem.value = value.toString();
    }
  };
  return { ...dom, ...methods };
}

// src/scroll-into-view.ts
function isScrollable(el) {
  return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
}
function scrollIntoView(el, options) {
  const { rootEl, ...scrollOptions } = options || {};
  if (!el || !rootEl) {
    return;
  }
  if (!isOverflowElement(rootEl) || !isScrollable(rootEl)) {
    return;
  }
  el.scrollIntoView(scrollOptions);
}

// src/set.ts
var cleanups = /* @__PURE__ */ new WeakMap();
function set(element, key, setup) {
  if (!cleanups.has(element)) {
    cleanups.set(element, /* @__PURE__ */ new Map());
  }
  const elementCleanups = cleanups.get(element);
  const prevCleanup = elementCleanups.get(key);
  if (!prevCleanup) {
    elementCleanups.set(key, setup());
    return () => {
      elementCleanups.get(key)?.();
      elementCleanups.delete(key);
    };
  }
  const cleanup = setup();
  const nextCleanup = () => {
    cleanup();
    prevCleanup();
    elementCleanups.delete(key);
  };
  elementCleanups.set(key, nextCleanup);
  return () => {
    const isCurrent = elementCleanups.get(key) === nextCleanup;
    if (!isCurrent) return;
    cleanup();
    elementCleanups.set(key, prevCleanup);
  };
}
function setAttribute(element, attr, value) {
  const setup = () => {
    const previousValue = element.getAttribute(attr);
    element.setAttribute(attr, value);
    return () => {
      if (previousValue == null) {
        element.removeAttribute(attr);
      } else {
        element.setAttribute(attr, previousValue);
      }
    };
  };
  return set(element, attr, setup);
}
function setProperty(element, property, value) {
  const setup = () => {
    const exists = property in element;
    const previousValue = element[property];
    element[property] = value;
    return () => {
      if (!exists) {
        delete element[property];
      } else {
        element[property] = previousValue;
      }
    };
  };
  return set(element, property, setup);
}
function setStyle(element, style) {
  if (!element) return () => {
  };
  const setup = () => {
    const prevStyle = element.style.cssText;
    Object.assign(element.style, style);
    return () => {
      element.style.cssText = prevStyle;
    };
  };
  return set(element, "style", setup);
}

// src/visually-hidden.ts
var visuallyHiddenStyle = {
  border: "0",
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: "0",
  position: "absolute",
  width: "1px",
  whiteSpace: "nowrap",
  wordWrap: "normal"
};

// src/wait-for.ts
var fps = 1e3 / 60;
function waitForElement(query2, cb) {
  const el = query2();
  if (isHTMLElement(el) && el.isConnected) {
    cb(el);
    return () => void 0;
  } else {
    const timerId = setInterval(() => {
      const el2 = query2();
      if (isHTMLElement(el2) && el2.isConnected) {
        cb(el2);
        clearInterval(timerId);
      }
    }, fps);
    return () => clearInterval(timerId);
  }
}
function waitForElements(queries, cb) {
  const cleanups2 = [];
  queries?.forEach((query2) => {
    const clean = waitForElement(query2, cb);
    cleanups2.push(clean);
  });
  return () => {
    cleanups2.forEach((fn) => fn());
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MAX_Z_INDEX,
  ariaAttr,
  contains,
  createScope,
  dataAttr,
  defaultItemToId,
  getActiveElement,
  getBeforeInputValue,
  getByText,
  getByTypeahead,
  getComputedStyle,
  getDataUrl,
  getDocument,
  getDocumentElement,
  getEventTarget,
  getFirstFocusable,
  getFirstTabbable,
  getFocusables,
  getInitialFocus,
  getLastTabbable,
  getNearestOverflowAncestor,
  getNextTabbable,
  getNodeName,
  getOverflowAncestors,
  getParentNode,
  getPlatform,
  getScrollPosition,
  getTabbableEdges,
  getTabbables,
  getWindow,
  indexOfId,
  isApple,
  isComposingEvent,
  isDocument,
  isDom,
  isDownloadingEvent,
  isEditableElement,
  isFirefox,
  isFocusable,
  isHTMLElement,
  isHiddenElement,
  isInView,
  isIos,
  isMac,
  isModKey,
  isNode,
  isOpeningInNewTab,
  isOverflowElement,
  isRootElement,
  isSafari,
  isSelfTarget,
  isShadowRoot,
  isTabbable,
  isTouchDevice,
  isValidTabEvent,
  isVisualViewport,
  isWebKit,
  isWindow,
  itemById,
  nextById,
  nextTick,
  observeAttributes,
  observeChildren,
  prevById,
  proxyTabFocus,
  query,
  queryAll,
  raf,
  scrollIntoView,
  set,
  setAttribute,
  setProperty,
  setStyle,
  visuallyHiddenStyle,
  waitForElement,
  waitForElements
});
//# sourceMappingURL=index.js.map