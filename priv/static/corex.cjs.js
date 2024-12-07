"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// js/corex/@zag-js/anatomy.js
var require_anatomy = __commonJS({
  "js/corex/@zag-js/anatomy.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export2(src_exports, {
      createAnatomy: () => createAnatomy
    });
    module2.exports = __toCommonJS2(src_exports);
    var createAnatomy = (name, parts = []) => ({
      parts: (...values) => {
        if (isEmpty(parts)) {
          return createAnatomy(name, values);
        }
        throw new Error("createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?");
      },
      extendWith: (...values) => createAnatomy(name, [...parts, ...values]),
      rename: (newName) => createAnatomy(newName, parts),
      keys: () => parts,
      build: () => [...new Set(parts)].reduce(
        (prev, part) => Object.assign(prev, {
          [part]: {
            selector: [
              `&[data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`,
              `& [data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`
            ].join(", "),
            attrs: { "data-scope": toKebabCase(name), "data-part": toKebabCase(part) }
          }
        }),
        {}
      )
    });
    var toKebabCase = (value) => value.replace(/([A-Z])([A-Z])/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
    var isEmpty = (v) => v.length === 0;
  }
});

// js/corex/@zag-js/dom-query.js
var require_dom_query = __commonJS({
  "js/corex/@zag-js/dom-query.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export2(src_exports, {
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
      getComputedStyle: () => getComputedStyle2,
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
    module2.exports = __toCommonJS2(src_exports);
    var dataAttr = (guard) => guard ? "" : void 0;
    var ariaAttr = (guard) => guard ? "true" : void 0;
    var MAX_Z_INDEX = 2147483647;
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
    function contains(parent, child) {
      if (!parent || !child) return false;
      if (!isHTMLElement(parent) || !isHTMLElement(child)) return false;
      return parent === child || parent.contains(child);
    }
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
    var sanitize = (str) => str.split("").map((char) => {
      const code = char.charCodeAt(0);
      if (code > 0 && code < 128) return char;
      if (code >= 128 && code <= 255) return `/x${code.toString(16)}`.replace("/", "\\");
      return "";
    }).join("").trim();
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
    var styleCache = /* @__PURE__ */ new WeakMap();
    function getComputedStyle2(el) {
      if (!styleCache.has(el)) {
        styleCache.set(el, getWindow(el).getComputedStyle(el));
      }
      return styleCache.get(el);
    }
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
    function getScrollPosition(element) {
      if (isHTMLElement(element)) {
        return { scrollLeft: element.scrollLeft, scrollTop: element.scrollTop };
      }
      return { scrollLeft: element.scrollX, scrollTop: element.scrollY };
    }
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
    function isHiddenElement(node) {
      if (node.parentElement && isHiddenElement(node.parentElement)) return true;
      return node.hidden;
    }
    var OVERFLOW_RE = /auto|scroll|overlay|hidden|clip/;
    function isOverflowElement(el) {
      const win = getWindow(el);
      const { overflow, overflowX, overflowY, display } = win.getComputedStyle(el);
      return OVERFLOW_RE.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
    }
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
    function queryAll(root, selector) {
      return Array.from(root?.querySelectorAll(selector) ?? []);
    }
    function query(root, selector) {
      return root?.querySelector(selector) ?? null;
    }
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
  }
});

// js/corex/@zag-js/aria-hidden.js
var require_aria_hidden = __commonJS({
  "js/corex/@zag-js/aria-hidden.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export2(src_exports, {
      ariaHidden: () => ariaHidden
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_dom_query = require_dom_query();
    var refCountMap = /* @__PURE__ */ new WeakMap();
    var observerStack = [];
    function ariaHiddenImpl(targets, options = {}) {
      const { rootEl } = options;
      const exclude = targets.filter(Boolean);
      if (exclude.length === 0) return;
      const doc = exclude[0].ownerDocument || document;
      const win = doc.defaultView ?? window;
      const visibleNodes = new Set(exclude);
      const hiddenNodes = /* @__PURE__ */ new Set();
      const root = rootEl ?? doc.body;
      let walk = (root2) => {
        for (let element of root2.querySelectorAll("[data-live-announcer], [data-zag-top-layer]")) {
          visibleNodes.add(element);
        }
        let acceptNode = (node) => {
          if (visibleNodes.has(node) || hiddenNodes.has(node.parentElement) && node.parentElement.getAttribute("role") !== "row") {
            return NodeFilter.FILTER_REJECT;
          }
          for (let target of visibleNodes) {
            if (node.contains(target)) {
              return NodeFilter.FILTER_SKIP;
            }
          }
          return NodeFilter.FILTER_ACCEPT;
        };
        let walker = doc.createTreeWalker(root2, NodeFilter.SHOW_ELEMENT, { acceptNode });
        let acceptRoot = acceptNode(root2);
        if (acceptRoot === NodeFilter.FILTER_ACCEPT) {
          hide(root2);
        }
        if (acceptRoot !== NodeFilter.FILTER_REJECT) {
          let node = walker.nextNode();
          while (node != null) {
            hide(node);
            node = walker.nextNode();
          }
        }
      };
      let hide = (node) => {
        let refCount = refCountMap.get(node) ?? 0;
        if (node.getAttribute("aria-hidden") === "true" && refCount === 0) {
          return;
        }
        if (refCount === 0) {
          node.setAttribute("aria-hidden", "true");
        }
        hiddenNodes.add(node);
        refCountMap.set(node, refCount + 1);
      };
      if (observerStack.length) {
        observerStack[observerStack.length - 1].disconnect();
      }
      walk(root);
      const observer = new win.MutationObserver((changes) => {
        for (let change of changes) {
          if (change.type !== "childList" || change.addedNodes.length === 0) {
            continue;
          }
          if (![...visibleNodes, ...hiddenNodes].some((node) => node.contains(change.target))) {
            for (let node of change.removedNodes) {
              if (node instanceof win.Element) {
                visibleNodes.delete(node);
                hiddenNodes.delete(node);
              }
            }
            for (let node of change.addedNodes) {
              if ((node instanceof win.HTMLElement || node instanceof win.SVGElement) && (node.dataset.liveAnnouncer === "true" || node.dataset.zagTopLayer === "true")) {
                visibleNodes.add(node);
              } else if (node instanceof win.Element) {
                walk(node);
              }
            }
          }
        }
      });
      observer.observe(root, { childList: true, subtree: true });
      let observerWrapper = {
        observe() {
          observer.observe(root, { childList: true, subtree: true });
        },
        disconnect() {
          observer.disconnect();
        }
      };
      observerStack.push(observerWrapper);
      return () => {
        observer.disconnect();
        for (let node of hiddenNodes) {
          let count = refCountMap.get(node);
          if (count === 1) {
            node.removeAttribute("aria-hidden");
            refCountMap.delete(node);
          } else {
            refCountMap.set(node, count - 1);
          }
        }
        if (observerWrapper === observerStack[observerStack.length - 1]) {
          observerStack.pop();
          if (observerStack.length) {
            observerStack[observerStack.length - 1].observe();
          }
        } else {
          observerStack.splice(observerStack.indexOf(observerWrapper), 1);
        }
      };
    }
    function ariaHidden(targetsOrFn, options = {}) {
      const { defer } = options;
      const func = defer ? import_dom_query.raf : (v) => v();
      const cleanups = [];
      cleanups.push(
        func(() => {
          const targets = typeof targetsOrFn === "function" ? targetsOrFn() : targetsOrFn;
          cleanups.push(ariaHiddenImpl(targets, options));
        })
      );
      return () => {
        cleanups.forEach((fn) => fn?.());
      };
    }
  }
});

// js/corex/proxy-compare.js
var proxy_compare_exports = {};
__export(proxy_compare_exports, {
  affectedToPathList: () => affectedToPathList,
  createProxy: () => createProxy,
  getUntracked: () => getUntracked,
  isChanged: () => isChanged,
  markToTrack: () => markToTrack,
  replaceNewProxy: () => replaceNewProxy,
  trackMemo: () => trackMemo
});
var TRACK_MEMO_SYMBOL, GET_ORIGINAL_SYMBOL, AFFECTED_PROPERTY, IS_TARGET_COPIED_PROPERTY, PROXY_PROPERTY, PROXY_CACHE_PROPERTY, TARGET_CACHE_PROPERTY, HAS_KEY_PROPERTY, ALL_OWN_KEYS_PROPERTY, HAS_OWN_KEY_PROPERTY, KEYS_PROPERTY, newProxy, getProto, objectsToTrack, isObjectToTrack, isObject, needsToCopyTargetObject, copyTargetObject, createProxyHandler, getOriginalObject, createProxy, isAllOwnKeysChanged, isChanged, trackMemo, getUntracked, markToTrack, affectedToPathList, replaceNewProxy;
var init_proxy_compare = __esm({
  "js/corex/proxy-compare.js"() {
    "use strict";
    TRACK_MEMO_SYMBOL = Symbol();
    GET_ORIGINAL_SYMBOL = Symbol();
    AFFECTED_PROPERTY = "a";
    IS_TARGET_COPIED_PROPERTY = "f";
    PROXY_PROPERTY = "p";
    PROXY_CACHE_PROPERTY = "c";
    TARGET_CACHE_PROPERTY = "t";
    HAS_KEY_PROPERTY = "h";
    ALL_OWN_KEYS_PROPERTY = "w";
    HAS_OWN_KEY_PROPERTY = "o";
    KEYS_PROPERTY = "k";
    newProxy = (target, handler) => new Proxy(target, handler);
    getProto = Object.getPrototypeOf;
    objectsToTrack = /* @__PURE__ */ new WeakMap();
    isObjectToTrack = (obj) => obj && (objectsToTrack.has(obj) ? objectsToTrack.get(obj) : getProto(obj) === Object.prototype || getProto(obj) === Array.prototype);
    isObject = (x) => typeof x === "object" && x !== null;
    needsToCopyTargetObject = (obj) => Object.values(Object.getOwnPropertyDescriptors(obj)).some((descriptor) => !descriptor.configurable && !descriptor.writable);
    copyTargetObject = (obj) => {
      if (Array.isArray(obj)) {
        return Array.from(obj);
      }
      const descriptors = Object.getOwnPropertyDescriptors(obj);
      Object.values(descriptors).forEach((desc) => {
        desc.configurable = true;
      });
      return Object.create(getProto(obj), descriptors);
    };
    createProxyHandler = (origObj, isTargetCopied) => {
      const state = {
        [IS_TARGET_COPIED_PROPERTY]: isTargetCopied
      };
      let trackObject = false;
      const recordUsage = (type, key) => {
        if (!trackObject) {
          let used = state[AFFECTED_PROPERTY].get(origObj);
          if (!used) {
            used = {};
            state[AFFECTED_PROPERTY].set(origObj, used);
          }
          if (type === ALL_OWN_KEYS_PROPERTY) {
            used[ALL_OWN_KEYS_PROPERTY] = true;
          } else {
            let set = used[type];
            if (!set) {
              set = /* @__PURE__ */ new Set();
              used[type] = set;
            }
            set.add(key);
          }
        }
      };
      const recordObjectAsUsed = () => {
        trackObject = true;
        state[AFFECTED_PROPERTY].delete(origObj);
      };
      const handler = {
        get(target, key) {
          if (key === GET_ORIGINAL_SYMBOL) {
            return origObj;
          }
          recordUsage(KEYS_PROPERTY, key);
          return createProxy(Reflect.get(target, key), state[AFFECTED_PROPERTY], state[PROXY_CACHE_PROPERTY], state[TARGET_CACHE_PROPERTY]);
        },
        has(target, key) {
          if (key === TRACK_MEMO_SYMBOL) {
            recordObjectAsUsed();
            return true;
          }
          recordUsage(HAS_KEY_PROPERTY, key);
          return Reflect.has(target, key);
        },
        getOwnPropertyDescriptor(target, key) {
          recordUsage(HAS_OWN_KEY_PROPERTY, key);
          return Reflect.getOwnPropertyDescriptor(target, key);
        },
        ownKeys(target) {
          recordUsage(ALL_OWN_KEYS_PROPERTY);
          return Reflect.ownKeys(target);
        }
      };
      if (isTargetCopied) {
        handler.set = handler.deleteProperty = () => false;
      }
      return [handler, state];
    };
    getOriginalObject = (obj) => (
      // unwrap proxy
      obj[GET_ORIGINAL_SYMBOL] || // otherwise
      obj
    );
    createProxy = (obj, affected, proxyCache, targetCache) => {
      if (!isObjectToTrack(obj))
        return obj;
      let targetAndCopied = targetCache && targetCache.get(obj);
      if (!targetAndCopied) {
        const target2 = getOriginalObject(obj);
        if (needsToCopyTargetObject(target2)) {
          targetAndCopied = [target2, copyTargetObject(target2)];
        } else {
          targetAndCopied = [target2];
        }
        targetCache === null || targetCache === void 0 ? void 0 : targetCache.set(obj, targetAndCopied);
      }
      const [target, copiedTarget] = targetAndCopied;
      let handlerAndState = proxyCache && proxyCache.get(target);
      if (!handlerAndState || handlerAndState[1][IS_TARGET_COPIED_PROPERTY] !== !!copiedTarget) {
        handlerAndState = createProxyHandler(target, !!copiedTarget);
        handlerAndState[1][PROXY_PROPERTY] = newProxy(copiedTarget || target, handlerAndState[0]);
        if (proxyCache) {
          proxyCache.set(target, handlerAndState);
        }
      }
      handlerAndState[1][AFFECTED_PROPERTY] = affected;
      handlerAndState[1][PROXY_CACHE_PROPERTY] = proxyCache;
      handlerAndState[1][TARGET_CACHE_PROPERTY] = targetCache;
      return handlerAndState[1][PROXY_PROPERTY];
    };
    isAllOwnKeysChanged = (prevObj, nextObj) => {
      const prevKeys = Reflect.ownKeys(prevObj);
      const nextKeys = Reflect.ownKeys(nextObj);
      return prevKeys.length !== nextKeys.length || prevKeys.some((k, i) => k !== nextKeys[i]);
    };
    isChanged = (prevObj, nextObj, affected, cache, isEqual = Object.is) => {
      if (isEqual(prevObj, nextObj)) {
        return false;
      }
      if (!isObject(prevObj) || !isObject(nextObj))
        return true;
      const used = affected.get(getOriginalObject(prevObj));
      if (!used)
        return true;
      if (cache) {
        const hit = cache.get(prevObj);
        if (hit === nextObj) {
          return false;
        }
        cache.set(prevObj, nextObj);
      }
      let changed = null;
      for (const key of used[HAS_KEY_PROPERTY] || []) {
        changed = Reflect.has(prevObj, key) !== Reflect.has(nextObj, key);
        if (changed)
          return changed;
      }
      if (used[ALL_OWN_KEYS_PROPERTY] === true) {
        changed = isAllOwnKeysChanged(prevObj, nextObj);
        if (changed)
          return changed;
      } else {
        for (const key of used[HAS_OWN_KEY_PROPERTY] || []) {
          const hasPrev = !!Reflect.getOwnPropertyDescriptor(prevObj, key);
          const hasNext = !!Reflect.getOwnPropertyDescriptor(nextObj, key);
          changed = hasPrev !== hasNext;
          if (changed)
            return changed;
        }
      }
      for (const key of used[KEYS_PROPERTY] || []) {
        changed = isChanged(prevObj[key], nextObj[key], affected, cache, isEqual);
        if (changed)
          return changed;
      }
      if (changed === null)
        throw new Error("invalid used");
      return changed;
    };
    trackMemo = (obj) => {
      if (isObjectToTrack(obj)) {
        return TRACK_MEMO_SYMBOL in obj;
      }
      return false;
    };
    getUntracked = (obj) => {
      if (isObjectToTrack(obj)) {
        return obj[GET_ORIGINAL_SYMBOL] || null;
      }
      return null;
    };
    markToTrack = (obj, mark = true) => {
      objectsToTrack.set(obj, mark);
    };
    affectedToPathList = (obj, affected, onlyWithValues) => {
      const list = [];
      const seen = /* @__PURE__ */ new WeakSet();
      const walk = (x, path) => {
        var _a, _b, _c;
        if (seen.has(x)) {
          return;
        }
        if (isObject(x)) {
          seen.add(x);
        }
        const used = isObject(x) && affected.get(getOriginalObject(x));
        if (used) {
          (_a = used[HAS_KEY_PROPERTY]) === null || _a === void 0 ? void 0 : _a.forEach((key) => {
            const segment = `:has(${String(key)})`;
            list.push(path ? [...path, segment] : [segment]);
          });
          if (used[ALL_OWN_KEYS_PROPERTY] === true) {
            const segment = ":ownKeys";
            list.push(path ? [...path, segment] : [segment]);
          } else {
            (_b = used[HAS_OWN_KEY_PROPERTY]) === null || _b === void 0 ? void 0 : _b.forEach((key) => {
              const segment = `:hasOwn(${String(key)})`;
              list.push(path ? [...path, segment] : [segment]);
            });
          }
          (_c = used[KEYS_PROPERTY]) === null || _c === void 0 ? void 0 : _c.forEach((key) => {
            if (!onlyWithValues || "value" in (Object.getOwnPropertyDescriptor(x, key) || {})) {
              walk(x[key], path ? [...path, key] : [key]);
            }
          });
        } else if (path) {
          list.push(path);
        }
      };
      walk(obj);
      return list;
    };
    replaceNewProxy = (fn) => {
      newProxy = fn;
    };
  }
});

// js/corex/@zag-js/store.js
var require_store = __commonJS({
  "js/corex/@zag-js/store.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export2(src_exports, {
      makeGlobal: () => makeGlobal,
      proxy: () => proxy2,
      proxyWithComputed: () => proxyWithComputed,
      ref: () => ref2,
      snapshot: () => snapshot2,
      subscribe: () => subscribe2
    });
    module2.exports = __toCommonJS2(src_exports);
    function getGlobal() {
      if (typeof globalThis !== "undefined") return globalThis;
      if (typeof self !== "undefined") return self;
      if (typeof window !== "undefined") return window;
      if (typeof global !== "undefined") return global;
    }
    function makeGlobal(key, value) {
      const g = getGlobal();
      if (!g) return value();
      g[key] || (g[key] = value());
      return g[key];
    }
    var import_proxy_compare = (init_proxy_compare(), __toCommonJS(proxy_compare_exports));
    var isDev = () => true;
    var isObject2 = (x) => typeof x === "object" && x !== null;
    var proxyStateMap = makeGlobal("__zag__proxyStateMap", () => /* @__PURE__ */ new WeakMap());
    var refSet = makeGlobal("__zag__refSet", () => /* @__PURE__ */ new WeakSet());
    var buildProxyFunction = (objectIs = Object.is, newProxy2 = (target, handler) => new Proxy(target, handler), canProxy = (x) => isObject2(x) && !refSet.has(x) && (Array.isArray(x) || !(Symbol.iterator in x)) && !(x instanceof WeakMap) && !(x instanceof WeakSet) && !(x instanceof Error) && !(x instanceof Number) && !(x instanceof Date) && !(x instanceof String) && !(x instanceof RegExp) && !(x instanceof ArrayBuffer), defaultHandlePromise = (promise) => {
      switch (promise.status) {
        case "fulfilled":
          return promise.value;
        case "rejected":
          throw promise.reason;
        default:
          throw promise;
      }
    }, snapCache = /* @__PURE__ */ new WeakMap(), createSnapshot = (target, version, handlePromise = defaultHandlePromise) => {
      const cache = snapCache.get(target);
      if (cache?.[0] === version) {
        return cache[1];
      }
      const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
      (0, import_proxy_compare.markToTrack)(snap, true);
      snapCache.set(target, [version, snap]);
      Reflect.ownKeys(target).forEach((key) => {
        const value = Reflect.get(target, key);
        if (refSet.has(value)) {
          (0, import_proxy_compare.markToTrack)(value, false);
          snap[key] = value;
        } else if (value instanceof Promise) {
          Object.defineProperty(snap, key, {
            get() {
              return handlePromise(value);
            }
          });
        } else if (proxyStateMap.has(value)) {
          snap[key] = snapshot2(value, handlePromise);
        } else {
          snap[key] = value;
        }
      });
      return Object.freeze(snap);
    }, proxyCache = /* @__PURE__ */ new WeakMap(), versionHolder = [1, 1], proxyFunction2 = (initialObject) => {
      if (!isObject2(initialObject)) {
        throw new Error("object required");
      }
      const found = proxyCache.get(initialObject);
      if (found) {
        return found;
      }
      let version = versionHolder[0];
      const listeners = /* @__PURE__ */ new Set();
      const notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
        if (version !== nextVersion) {
          version = nextVersion;
          listeners.forEach((listener) => listener(op, nextVersion));
        }
      };
      let checkVersion = versionHolder[1];
      const ensureVersion = (nextCheckVersion = ++versionHolder[1]) => {
        if (checkVersion !== nextCheckVersion && !listeners.size) {
          checkVersion = nextCheckVersion;
          propProxyStates.forEach(([propProxyState]) => {
            const propVersion = propProxyState[1](nextCheckVersion);
            if (propVersion > version) {
              version = propVersion;
            }
          });
        }
        return version;
      };
      const createPropListener = (prop) => (op, nextVersion) => {
        const newOp = [...op];
        newOp[1] = [prop, ...newOp[1]];
        notifyUpdate(newOp, nextVersion);
      };
      const propProxyStates = /* @__PURE__ */ new Map();
      const addPropListener = (prop, propProxyState) => {
        if (isDev() && propProxyStates.has(prop)) {
          throw new Error("prop listener already exists");
        }
        if (listeners.size) {
          const remove = propProxyState[3](createPropListener(prop));
          propProxyStates.set(prop, [propProxyState, remove]);
        } else {
          propProxyStates.set(prop, [propProxyState]);
        }
      };
      const removePropListener = (prop) => {
        const entry = propProxyStates.get(prop);
        if (entry) {
          propProxyStates.delete(prop);
          entry[1]?.();
        }
      };
      const addListener = (listener) => {
        listeners.add(listener);
        if (listeners.size === 1) {
          propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
            if (isDev() && prevRemove) {
              throw new Error("remove already exists");
            }
            const remove = propProxyState[3](createPropListener(prop));
            propProxyStates.set(prop, [propProxyState, remove]);
          });
        }
        const removeListener = () => {
          listeners.delete(listener);
          if (listeners.size === 0) {
            propProxyStates.forEach(([propProxyState, remove], prop) => {
              if (remove) {
                remove();
                propProxyStates.set(prop, [propProxyState]);
              }
            });
          }
        };
        return removeListener;
      };
      const baseObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject));
      const handler = {
        deleteProperty(target, prop) {
          const prevValue = Reflect.get(target, prop);
          removePropListener(prop);
          const deleted = Reflect.deleteProperty(target, prop);
          if (deleted) {
            notifyUpdate(["delete", [prop], prevValue]);
          }
          return deleted;
        },
        set(target, prop, value, receiver) {
          const hasPrevValue = Reflect.has(target, prop);
          const prevValue = Reflect.get(target, prop, receiver);
          if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
            return true;
          }
          removePropListener(prop);
          if (isObject2(value)) {
            value = (0, import_proxy_compare.getUntracked)(value) || value;
          }
          let nextValue = value;
          if (Object.getOwnPropertyDescriptor(target, prop)?.set) {
          } else if (value instanceof Promise) {
            value.then((v) => {
              Object.assign(value, { status: "fulfilled", value: v });
              notifyUpdate(["resolve", [prop], v]);
            }).catch((e) => {
              Object.assign(value, { status: "rejected", reason: e });
              notifyUpdate(["reject", [prop], e]);
            });
          } else {
            if (!proxyStateMap.has(value) && canProxy(value)) {
              nextValue = proxy2(value);
            }
            const childProxyState = !refSet.has(nextValue) && proxyStateMap.get(nextValue);
            if (childProxyState) {
              addPropListener(prop, childProxyState);
            }
          }
          Reflect.set(target, prop, nextValue, receiver);
          notifyUpdate(["set", [prop], value, prevValue]);
          return true;
        }
      };
      const proxyObject = newProxy2(baseObject, handler);
      proxyCache.set(initialObject, proxyObject);
      const proxyState = [baseObject, ensureVersion, createSnapshot, addListener];
      proxyStateMap.set(proxyObject, proxyState);
      Reflect.ownKeys(initialObject).forEach((key) => {
        const desc = Object.getOwnPropertyDescriptor(initialObject, key);
        if (desc.get || desc.set) {
          Object.defineProperty(baseObject, key, desc);
        } else {
          proxyObject[key] = initialObject[key];
        }
      });
      return proxyObject;
    }) => [
      // public functions
      proxyFunction2,
      // shared state
      proxyStateMap,
      refSet,
      // internal things
      objectIs,
      newProxy2,
      canProxy,
      defaultHandlePromise,
      snapCache,
      createSnapshot,
      proxyCache,
      versionHolder
    ];
    var [proxyFunction] = buildProxyFunction();
    function proxy2(initialObject = {}) {
      return proxyFunction(initialObject);
    }
    function subscribe2(proxyObject, callback, notifyInSync) {
      const proxyState = proxyStateMap.get(proxyObject);
      if (isDev() && !proxyState) {
        console.warn("Please use proxy object");
      }
      let promise;
      const ops = [];
      const addListener = proxyState[3];
      let isListenerActive = false;
      const listener = (op) => {
        ops.push(op);
        if (notifyInSync) {
          callback(ops.splice(0));
          return;
        }
        if (!promise) {
          promise = Promise.resolve().then(() => {
            promise = void 0;
            if (isListenerActive) {
              callback(ops.splice(0));
            }
          });
        }
      };
      const removeListener = addListener(listener);
      isListenerActive = true;
      return () => {
        isListenerActive = false;
        removeListener();
      };
    }
    function snapshot2(proxyObject, handlePromise) {
      const proxyState = proxyStateMap.get(proxyObject);
      if (isDev() && !proxyState) {
        console.warn("Please use proxy object");
      }
      const [target, ensureVersion, createSnapshot] = proxyState;
      return createSnapshot(target, ensureVersion(), handlePromise);
    }
    function ref2(obj) {
      refSet.add(obj);
      return obj;
    }
    function proxyWithComputed(initialObject, computedFns) {
      const keys = Object.keys(computedFns);
      keys.forEach((key) => {
        if (Object.getOwnPropertyDescriptor(initialObject, key)) {
          throw new Error("object property already defined");
        }
        const computedFn = computedFns[key];
        const { get, set } = typeof computedFn === "function" ? { get: computedFn } : computedFn;
        const desc = {};
        desc.get = () => get(snapshot2(proxyObject));
        if (set) {
          desc.set = (newValue) => set(proxyObject, newValue);
        }
        Object.defineProperty(initialObject, key, desc);
      });
      const proxyObject = proxy2(initialObject);
      return proxyObject;
    }
  }
});

// js/corex/klona.js
var require_klona = __commonJS({
  "js/corex/klona.js"(exports) {
    "use strict";
    function set(obj, key, val) {
      if (typeof val.value === "object") val.value = klona(val.value);
      if (!val.enumerable || val.get || val.set || !val.configurable || !val.writable || key === "__proto__") {
        Object.defineProperty(obj, key, val);
      } else obj[key] = val.value;
    }
    function klona(x) {
      if (typeof x !== "object") return x;
      var i = 0, k, list, tmp, str = Object.prototype.toString.call(x);
      if (str === "[object Object]") {
        tmp = Object.create(x.__proto__ || null);
      } else if (str === "[object Array]") {
        tmp = Array(x.length);
      } else if (str === "[object Set]") {
        tmp = /* @__PURE__ */ new Set();
        x.forEach(function(val) {
          tmp.add(klona(val));
        });
      } else if (str === "[object Map]") {
        tmp = /* @__PURE__ */ new Map();
        x.forEach(function(val, key) {
          tmp.set(klona(key), klona(val));
        });
      } else if (str === "[object Date]") {
        tmp = /* @__PURE__ */ new Date(+x);
      } else if (str === "[object RegExp]") {
        tmp = new RegExp(x.source, x.flags);
      } else if (str === "[object DataView]") {
        tmp = new x.constructor(klona(x.buffer));
      } else if (str === "[object ArrayBuffer]") {
        tmp = x.slice(0);
      } else if (str.slice(-6) === "Array]") {
        tmp = new x.constructor(x);
      }
      if (tmp) {
        for (list = Object.getOwnPropertySymbols(x); i < list.length; i++) {
          set(tmp, list[i], Object.getOwnPropertyDescriptor(x, list[i]));
        }
        for (i = 0, list = Object.getOwnPropertyNames(x); i < list.length; i++) {
          if (Object.hasOwnProperty.call(tmp, k = list[i]) && tmp[k] === x[k]) continue;
          set(tmp, k, Object.getOwnPropertyDescriptor(x, k));
        }
      }
      return tmp || x;
    }
    exports.klona = klona;
  }
});

// js/corex/@zag-js/core.js
var require_core = __commonJS({
  "js/corex/@zag-js/core.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    var src_exports = {};
    __export2(src_exports, {
      Machine: () => Machine,
      choose: () => choose,
      createMachine: () => createMachine,
      deepMerge: () => deepMerge,
      guards: () => guards,
      isMachine: () => isMachine,
      mergeProps: () => mergeProps,
      proxy: () => import_store3.proxy,
      ref: () => import_store3.ref,
      snapshot: () => import_store3.snapshot,
      subscribe: () => import_store3.subscribe
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_store3 = require_store();
    function clear(v) {
      while (v.length > 0) v.pop();
      return v;
    }
    var runIfFn = (v, ...a) => {
      const res = typeof v === "function" ? v(...a) : v;
      return res ?? void 0;
    };
    var cast = (v) => v;
    var noop = () => {
    };
    var callAll = (...fns) => (...a) => {
      fns.forEach(function(fn) {
        fn?.(...a);
      });
    };
    var uuid = /* @__PURE__ */ (() => {
      let id = 0;
      return () => {
        id++;
        return id.toString(36);
      };
    })();
    var isDev = () => true;
    var isArray = (v) => Array.isArray(v);
    var isObject2 = (v) => !(v == null || typeof v !== "object" || isArray(v));
    var isNumber = (v) => typeof v === "number" && !Number.isNaN(v);
    var isString = (v) => typeof v === "string";
    var isFunction = (v) => typeof v === "function";
    var hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    function compact(obj) {
      if (!isPlainObject(obj) || obj === void 0) {
        return obj;
      }
      const keys = Reflect.ownKeys(obj).filter((key) => typeof key === "string");
      const filtered = {};
      for (const key of keys) {
        const value = obj[key];
        if (value !== void 0) {
          filtered[key] = compact(value);
        }
      }
      return filtered;
    }
    var isPlainObject = (value) => {
      return value && typeof value === "object" && value.constructor === Object;
    };
    function warn(...a) {
      const m = a.length === 1 ? a[0] : a[1];
      const c = a.length === 2 ? a[0] : true;
      if (c && true) {
        console.warn(m);
      }
    }
    function invariant(...a) {
      const m = a.length === 1 ? a[0] : a[1];
      const c = a.length === 2 ? a[0] : true;
      if (c && true) {
        throw new Error(m);
      }
    }
    function deepMerge(source, ...objects) {
      for (const obj of objects) {
        const target = compact(obj);
        for (const key in target) {
          if (isObject2(obj[key])) {
            if (!source[key]) {
              source[key] = {};
            }
            deepMerge(source[key], obj[key]);
          } else {
            source[key] = obj[key];
          }
        }
      }
      return source;
    }
    var import_full = require_klona();
    function structuredClone(v) {
      return (0, import_full.klona)(v);
    }
    function toEvent(event) {
      const obj = isString(event) ? { type: event } : event;
      return obj;
    }
    function toArray(value) {
      if (!value) return [];
      return isArray(value) ? value.slice() : [value];
    }
    function isGuardHelper(value) {
      return isObject2(value) && value.predicate != null;
    }
    var Truthy = () => true;
    function exec(guardMap, ctx, event, meta) {
      return (guard) => {
        if (isString(guard)) {
          return !!guardMap[guard]?.(ctx, event, meta);
        }
        if (isFunction(guard)) {
          return guard(ctx, event, meta);
        }
        return guard.predicate(guardMap)(ctx, event, meta);
      };
    }
    function or(...conditions) {
      return {
        predicate: (guardMap) => (ctx, event, meta) => conditions.map(exec(guardMap, ctx, event, meta)).some(Boolean)
      };
    }
    function and(...conditions) {
      return {
        predicate: (guardMap) => (ctx, event, meta) => conditions.map(exec(guardMap, ctx, event, meta)).every(Boolean)
      };
    }
    function not(condition) {
      return {
        predicate: (guardMap) => (ctx, event, meta) => {
          return !exec(guardMap, ctx, event, meta)(condition);
        }
      };
    }
    function stateIn(...values) {
      return (_ctx, _evt, meta) => meta.state.matches(...values);
    }
    var guards = { or, and, not, stateIn };
    function choose(actions) {
      return {
        predicate: (guardMap) => (ctx, event, meta) => actions.find((def) => {
          const guard = def.guard ?? Truthy;
          return exec(guardMap, ctx, event, meta)(guard);
        })?.actions
      };
    }
    function determineGuardFn(guard, guardMap) {
      guard = guard ?? Truthy;
      return (context, event, meta) => {
        if (isString(guard)) {
          const value = guardMap[guard];
          return isFunction(value) ? value(context, event, meta) : value;
        }
        if (isGuardHelper(guard)) {
          return guard.predicate(guardMap)(context, event, meta);
        }
        return guard?.(context, event, meta);
      };
    }
    function determineActionsFn(values, guardMap) {
      return (context, event, meta) => {
        if (isGuardHelper(values)) {
          return values.predicate(guardMap)(context, event, meta);
        }
        return values;
      };
    }
    var import_store2 = require_store();
    var import_store = require_store();
    function createProxy2(config) {
      const computedContext = config.computed ?? cast({});
      const initialContext = config.context ?? cast({});
      const initialTags = config.initial ? config.states?.[config.initial]?.tags : [];
      const state = (0, import_store.proxy)({
        value: config.initial ?? "",
        previousValue: "",
        event: cast({}),
        previousEvent: cast({}),
        context: (0, import_store.proxyWithComputed)(initialContext, computedContext),
        done: false,
        tags: initialTags ?? [],
        hasTag(tag) {
          return this.tags.includes(tag);
        },
        matches(...value) {
          return value.includes(this.value);
        },
        can(event) {
          return cast(this).nextEvents.includes(event);
        },
        get nextEvents() {
          const stateEvents = config.states?.[this.value]?.["on"] ?? {};
          const globalEvents = config?.on ?? {};
          return Object.keys({ ...stateEvents, ...globalEvents });
        },
        get changed() {
          if (this.event.value === "machine.init" || !this.previousValue) return false;
          return this.value !== this.previousValue;
        }
      });
      return cast(state);
    }
    function determineDelayFn(delay, delaysMap) {
      return (context, event) => {
        if (isNumber(delay)) return delay;
        if (isFunction(delay)) {
          return delay(context, event);
        }
        if (isString(delay)) {
          const value = Number.parseFloat(delay);
          if (!Number.isNaN(value)) {
            return value;
          }
          if (delaysMap) {
            const valueOrFn = delaysMap?.[delay];
            invariant(
              valueOrFn == null,
              `[@zag-js/core > determine-delay] Cannot determine delay for \`${delay}\`. It doesn't exist in \`options.delays\``
            );
            return isFunction(valueOrFn) ? valueOrFn(context, event) : valueOrFn;
          }
        }
      };
    }
    function toTarget(target) {
      return isString(target) ? { target } : target;
    }
    function determineTransitionFn(transitions, guardMap) {
      return (context, event, meta) => {
        return toArray(transitions).map(toTarget).find((transition) => {
          const determineGuard = determineGuardFn(transition.guard, guardMap);
          const guard = determineGuard(context, event, meta);
          return guard ?? transition.target ?? transition.actions;
        });
      };
    }
    var Machine = class {
      // Let's get started!
      constructor(config, options) {
        __publicField(
          this,
          "status",
          "Not Started"
          /* NotStarted */
        );
        __publicField(this, "state");
        __publicField(this, "initialState");
        __publicField(this, "initialContext");
        __publicField(this, "id");
        __publicField(
          this,
          "type",
          "machine"
          /* Machine */
        );
        __publicField(this, "activityEvents", /* @__PURE__ */ new Map());
        __publicField(this, "delayedEvents", /* @__PURE__ */ new Map());
        __publicField(this, "stateListeners", /* @__PURE__ */ new Set());
        __publicField(this, "doneListeners", /* @__PURE__ */ new Set());
        __publicField(this, "contextWatchers", /* @__PURE__ */ new Set());
        __publicField(this, "removeStateListener", noop);
        __publicField(this, "parent");
        __publicField(this, "children", /* @__PURE__ */ new Map());
        __publicField(this, "guardMap");
        __publicField(this, "actionMap");
        __publicField(this, "delayMap");
        __publicField(this, "activityMap");
        __publicField(this, "sync");
        __publicField(this, "options");
        __publicField(this, "config");
        __publicField(this, "_created", () => {
          const event = toEvent(
            "machine.created"
            /* Created */
          );
          this.executeActions(this.config?.created, event);
        });
        __publicField(this, "start", (init) => {
          this.state.value = "";
          this.state.tags = [];
          if (this.status === "Running") {
            return this;
          }
          this.status = "Running";
          this.removeStateListener = (0, import_store2.subscribe)(
            this.state,
            () => {
              this.stateListeners.forEach((listener) => {
                listener(this.stateSnapshot);
              });
            },
            this.sync
          );
          this.setupContextWatchers();
          this.executeActivities(
            toEvent(
              "machine.start"
              /* Start */
            ),
            toArray(this.config.activities),
            "machine.start"
            /* Start */
          );
          this.executeActions(this.config.entry, toEvent(
            "machine.start"
            /* Start */
          ));
          const event = toEvent(
            "machine.init"
            /* Init */
          );
          const target = isObject2(init) ? init.value : init;
          const context = isObject2(init) ? init.context : void 0;
          if (context) {
            this.setContext(context);
          }
          const transition = {
            target: target ?? this.config.initial
          };
          const next = this.getNextStateInfo(transition, event);
          this.initialState = next;
          this.performStateChangeEffects(this.state.value, next, event);
          return this;
        });
        __publicField(this, "setupContextWatchers", () => {
          const { watch } = this.config;
          if (!watch) return;
          let prev = (0, import_store2.snapshot)(this.state.context);
          const cleanup = (0, import_store2.subscribe)(this.state.context, () => {
            const next = (0, import_store2.snapshot)(this.state.context);
            for (const [key, fn] of Object.entries(watch)) {
              const isEqual = this.options.compareFns?.[key] ?? Object.is;
              if (isEqual(prev[key], next[key])) continue;
              this.executeActions(fn, this.state.event);
            }
            prev = next;
          });
          this.contextWatchers.add(cleanup);
        });
        __publicField(this, "stop", () => {
          if (this.status === "Stopped") return;
          this.performExitEffects(this.state.value, toEvent(
            "machine.stop"
            /* Stop */
          ));
          this.executeActions(this.config.exit, toEvent(
            "machine.stop"
            /* Stop */
          ));
          this.setState("");
          this.setEvent(
            "machine.stop"
            /* Stop */
          );
          this.stopStateListeners();
          this.stopChildren();
          this.stopActivities();
          this.stopDelayedEvents();
          this.stopContextWatchers();
          this.status = "Stopped";
          return this;
        });
        __publicField(this, "stopStateListeners", () => {
          this.removeStateListener();
          this.stateListeners.clear();
        });
        __publicField(this, "stopContextWatchers", () => {
          this.contextWatchers.forEach((fn) => fn());
          this.contextWatchers.clear();
        });
        __publicField(this, "stopDelayedEvents", () => {
          this.delayedEvents.forEach((state) => {
            state.forEach((stop) => stop());
          });
          this.delayedEvents.clear();
        });
        __publicField(this, "stopActivities", (state) => {
          if (state) {
            this.activityEvents.get(state)?.forEach((stop) => stop());
            this.activityEvents.get(state)?.clear();
            this.activityEvents.delete(state);
          } else {
            this.activityEvents.forEach((state2) => {
              state2.forEach((stop) => stop());
              state2.clear();
            });
            this.activityEvents.clear();
          }
        });
        __publicField(this, "sendChild", (evt, to) => {
          const event = toEvent(evt);
          const id = runIfFn(to, this.contextSnapshot);
          const child = this.children.get(id);
          if (!child) {
            invariant(`[@zag-js/core] Cannot send '${event.type}' event to unknown child`);
          }
          child.send(event);
        });
        __publicField(this, "stopChild", (id) => {
          if (!this.children.has(id)) {
            invariant(`[@zag-js/core > stop-child] Cannot stop unknown child ${id}`);
          }
          this.children.get(id).stop();
          this.children.delete(id);
        });
        __publicField(this, "removeChild", (id) => {
          this.children.delete(id);
        });
        __publicField(this, "stopChildren", () => {
          this.children.forEach((child) => child.stop());
          this.children.clear();
        });
        __publicField(this, "setParent", (parent) => {
          this.parent = parent;
        });
        __publicField(this, "spawn", (src, id) => {
          const actor = runIfFn(src);
          if (id) actor.id = id;
          actor.type = "machine.actor";
          actor.setParent(this);
          this.children.set(actor.id, cast(actor));
          actor.onDone(() => {
            this.removeChild(actor.id);
          }).start();
          return cast((0, import_store2.ref)(actor));
        });
        __publicField(this, "stopActivity", (key) => {
          if (!this.state.value) return;
          const cleanups = this.activityEvents.get(this.state.value);
          cleanups?.get(key)?.();
          cleanups?.delete(key);
        });
        __publicField(this, "addActivityCleanup", (state, key, cleanup) => {
          if (!state) return;
          if (!this.activityEvents.has(state)) {
            this.activityEvents.set(state, /* @__PURE__ */ new Map([[key, cleanup]]));
          } else {
            this.activityEvents.get(state)?.set(key, cleanup);
          }
        });
        __publicField(this, "setState", (target) => {
          this.state.previousValue = this.state.value;
          this.state.value = target;
          const stateNode = this.getStateNode(target);
          if (target == null) {
            clear(this.state.tags);
          } else {
            this.state.tags = toArray(stateNode?.tags);
          }
        });
        __publicField(this, "setContext", (context) => {
          if (!context) return;
          deepMerge(this.state.context, compact(context));
        });
        __publicField(this, "setOptions", (options2) => {
          const opts = compact(options2);
          this.actionMap = { ...this.actionMap, ...opts.actions };
          this.delayMap = { ...this.delayMap, ...opts.delays };
          this.activityMap = { ...this.activityMap, ...opts.activities };
          this.guardMap = { ...this.guardMap, ...opts.guards };
        });
        __publicField(this, "getStateNode", (state) => {
          if (!state) return;
          return this.config.states?.[state];
        });
        __publicField(this, "getNextStateInfo", (transitions, event) => {
          const transition = this.determineTransition(transitions, event);
          const isTargetless = !transition?.target;
          const target = transition?.target ?? this.state.value;
          const changed = this.state.value !== target;
          const stateNode = this.getStateNode(target);
          const reenter = !isTargetless && !changed && !transition?.internal;
          const info = {
            reenter,
            transition,
            stateNode,
            target,
            changed
          };
          this.log("NextState:", `[${event.type}]`, this.state.value, "---->", info.target);
          return info;
        });
        __publicField(this, "getAfterActions", (transition, delay) => {
          let id;
          return {
            entry: () => {
              id = globalThis.setTimeout(() => {
                const next = this.getNextStateInfo(transition, this.state.event);
                this.performStateChangeEffects(this.state.value, next, this.state.event);
              }, delay);
            },
            exit: () => {
              globalThis.clearTimeout(id);
            }
          };
        });
        __publicField(this, "getDelayedEventActions", (state) => {
          const stateNode = this.getStateNode(state);
          const event = this.state.event;
          if (!stateNode || !stateNode.after) return;
          const entries = [];
          const exits = [];
          if (isArray(stateNode.after)) {
            const transition = this.determineTransition(stateNode.after, event);
            if (!transition) return;
            if (!hasProp(transition, "delay")) {
              throw new Error(`[@zag-js/core > after] Delay is required for after transition: ${JSON.stringify(transition)}`);
            }
            const determineDelay = determineDelayFn(transition.delay, this.delayMap);
            const __delay = determineDelay(this.contextSnapshot, event);
            const actions = this.getAfterActions(transition, __delay);
            entries.push(actions.entry);
            exits.push(actions.exit);
            return { entries, exits };
          }
          if (isObject2(stateNode.after)) {
            for (const delay in stateNode.after) {
              const transition = stateNode.after[delay];
              const determineDelay = determineDelayFn(delay, this.delayMap);
              const __delay = determineDelay(this.contextSnapshot, event);
              const actions = this.getAfterActions(transition, __delay);
              entries.push(actions.entry);
              exits.push(actions.exit);
            }
          }
          return { entries, exits };
        });
        __publicField(this, "executeActions", (actions, event) => {
          const pickedActions = determineActionsFn(actions, this.guardMap)(this.contextSnapshot, event, this.guardMeta);
          for (const action of toArray(pickedActions)) {
            const fn = isString(action) ? this.actionMap?.[action] : action;
            warn(
              isString(action) && !fn,
              `[@zag-js/core > execute-actions] No implementation found for action: \`${action}\``
            );
            fn?.(this.state.context, event, this.meta);
          }
        });
        __publicField(this, "executeActivities", (event, activities, state) => {
          for (const activity of activities) {
            const fn = isString(activity) ? this.activityMap?.[activity] : activity;
            if (!fn) {
              warn(`[@zag-js/core > execute-activity] No implementation found for activity: \`${activity}\``);
              continue;
            }
            const cleanup = fn(this.state.context, event, this.meta);
            if (cleanup) {
              const key = isString(activity) ? activity : activity.name || uuid();
              this.addActivityCleanup(state ?? this.state.value, key, cleanup);
            }
          }
        });
        __publicField(this, "createEveryActivities", (every, callbackfn) => {
          if (!every) return;
          if (isArray(every)) {
            const picked = toArray(every).find((transition) => {
              const delayOrFn = transition.delay;
              const determineDelay2 = determineDelayFn(delayOrFn, this.delayMap);
              const delay2 = determineDelay2(this.contextSnapshot, this.state.event);
              const determineGuard = determineGuardFn(transition.guard, this.guardMap);
              const guard = determineGuard(this.contextSnapshot, this.state.event, this.guardMeta);
              return guard ?? delay2 != null;
            });
            if (!picked) return;
            const determineDelay = determineDelayFn(picked.delay, this.delayMap);
            const delay = determineDelay(this.contextSnapshot, this.state.event);
            const activity = () => {
              const id = globalThis.setInterval(() => {
                this.executeActions(picked.actions, this.state.event);
              }, delay);
              return () => {
                globalThis.clearInterval(id);
              };
            };
            callbackfn(activity);
          } else {
            for (const interval in every) {
              const actions = every?.[interval];
              const determineDelay = determineDelayFn(interval, this.delayMap);
              const delay = determineDelay(this.contextSnapshot, this.state.event);
              const activity = () => {
                const id = globalThis.setInterval(() => {
                  this.executeActions(actions, this.state.event);
                }, delay);
                return () => {
                  globalThis.clearInterval(id);
                };
              };
              callbackfn(activity);
            }
          }
        });
        __publicField(this, "setEvent", (event) => {
          this.state.previousEvent = this.state.event;
          this.state.event = (0, import_store2.ref)(toEvent(event));
        });
        __publicField(this, "performExitEffects", (current, event) => {
          const currentState = this.state.value;
          if (currentState === "") return;
          const stateNode = current ? this.getStateNode(current) : void 0;
          this.stopActivities(currentState);
          const _exit = determineActionsFn(stateNode?.exit, this.guardMap)(this.contextSnapshot, event, this.guardMeta);
          const exitActions = toArray(_exit);
          const afterExitActions = this.delayedEvents.get(currentState);
          if (afterExitActions) {
            exitActions.push(...afterExitActions);
          }
          this.executeActions(exitActions, event);
        });
        __publicField(this, "performEntryEffects", (next, event) => {
          const stateNode = this.getStateNode(next);
          const activities = toArray(stateNode?.activities);
          this.createEveryActivities(stateNode?.every, (activity) => {
            activities.unshift(activity);
          });
          if (activities.length > 0) {
            this.executeActivities(event, activities);
          }
          const pickedActions = determineActionsFn(stateNode?.entry, this.guardMap)(
            this.contextSnapshot,
            event,
            this.guardMeta
          );
          const entryActions = toArray(pickedActions);
          const afterActions = this.getDelayedEventActions(next);
          if (stateNode?.after && afterActions) {
            this.delayedEvents.set(next, afterActions?.exits);
            entryActions.push(...afterActions.entries);
          }
          this.executeActions(entryActions, event);
          if (stateNode?.type === "final") {
            this.state.done = true;
            this.doneListeners.forEach((listener) => {
              listener(this.stateSnapshot);
            });
            this.stop();
          }
        });
        __publicField(this, "performTransitionEffects", (transitions, event) => {
          const transition = this.determineTransition(transitions, event);
          this.executeActions(transition?.actions, event);
        });
        __publicField(this, "performStateChangeEffects", (current, next, event) => {
          this.setEvent(event);
          const changed = next.changed || next.reenter;
          if (changed) {
            this.performExitEffects(current, event);
          }
          this.performTransitionEffects(next.transition, event);
          this.setState(next.target);
          if (changed) {
            this.performEntryEffects(next.target, event);
          }
        });
        __publicField(this, "determineTransition", (transition, event) => {
          const fn = determineTransitionFn(transition, this.guardMap);
          return fn?.(this.contextSnapshot, event, this.guardMeta);
        });
        __publicField(this, "sendParent", (evt) => {
          if (!this.parent) {
            invariant("[@zag-js/core > send-parent] Cannot send event to an unknown parent");
          }
          const event = toEvent(evt);
          this.parent?.send(event);
        });
        __publicField(this, "log", (...args) => {
          if (isDev() && this.options.debug) {
            console.log(...args);
          }
        });
        __publicField(this, "send", (evt) => {
          const event = toEvent(evt);
          this.transition(this.state.value, event);
        });
        __publicField(this, "transition", (state, evt) => {
          const stateNode = isString(state) ? this.getStateNode(state) : state?.stateNode;
          const event = toEvent(evt);
          if (!stateNode && !this.config.on) {
            const msg = this.status === "Stopped" ? "[@zag-js/core > transition] Cannot transition a stopped machine" : `[@zag-js/core > transition] State does not have a definition for \`state\`: ${state}, \`event\`: ${event.type}`;
            warn(msg);
            return;
          }
          const transitions = (
            // @ts-expect-error - Fix this
            stateNode?.on?.[event.type] ?? this.config.on?.[event.type]
          );
          const next = this.getNextStateInfo(transitions, event);
          this.performStateChangeEffects(this.state.value, next, event);
          return next.stateNode;
        });
        __publicField(this, "subscribe", (listener) => {
          this.stateListeners.add(listener);
          if (this.status === "Running") {
            listener(this.stateSnapshot);
          }
          return () => {
            this.stateListeners.delete(listener);
          };
        });
        __publicField(this, "onDone", (listener) => {
          this.doneListeners.add(listener);
          return this;
        });
        __publicField(this, "onTransition", (listener) => {
          this.stateListeners.add(listener);
          if (this.status === "Running") {
            listener(this.stateSnapshot);
          }
          return this;
        });
        this.config = structuredClone(config);
        this.options = structuredClone(options ?? {});
        this.id = this.config.id ?? `machine-${uuid()}`;
        this.guardMap = this.options?.guards ?? {};
        this.actionMap = this.options?.actions ?? {};
        this.delayMap = this.options?.delays ?? {};
        this.activityMap = this.options?.activities ?? {};
        this.sync = this.options?.sync ?? false;
        this.state = createProxy2(this.config);
        this.initialContext = (0, import_store2.snapshot)(this.state.context);
      }
      // immutable state value
      get stateSnapshot() {
        return cast((0, import_store2.snapshot)(this.state));
      }
      getState() {
        return this.stateSnapshot;
      }
      // immutable context value
      get contextSnapshot() {
        return this.stateSnapshot.context;
      }
      /**
       * A reference to the instance methods of the machine.
       * Useful when spawning child machines and managing the communication between them.
       */
      get self() {
        const self2 = this;
        return {
          id: this.id,
          send: this.send.bind(this),
          sendParent: this.sendParent.bind(this),
          sendChild: this.sendChild.bind(this),
          stop: this.stop.bind(this),
          stopChild: this.stopChild.bind(this),
          spawn: this.spawn.bind(this),
          stopActivity: this.stopActivity.bind(this),
          get state() {
            return self2.stateSnapshot;
          },
          get initialContext() {
            return self2.initialContext;
          },
          get initialState() {
            return self2.initialState?.target ?? "";
          }
        };
      }
      get meta() {
        return {
          state: this.stateSnapshot,
          guards: this.guardMap,
          send: this.send.bind(this),
          self: this.self,
          initialContext: this.initialContext,
          initialState: this.initialState?.target ?? "",
          getState: () => this.stateSnapshot,
          getAction: (key) => this.actionMap[key],
          getGuard: (key) => this.guardMap[key]
        };
      }
      get guardMeta() {
        return {
          state: this.stateSnapshot
        };
      }
      get [Symbol.toStringTag]() {
        return "Machine";
      }
    };
    var createMachine = (config, options) => new Machine(config, options);
    var isMachine = (value) => {
      return value instanceof Machine || value?.type === "machine";
    };
    var clsx = (...args) => args.map((str) => str?.trim?.()).filter(Boolean).join(" ");
    var CSS_REGEX = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;
    var serialize = (style) => {
      const res = {};
      let match;
      while (match = CSS_REGEX.exec(style)) {
        res[match[1]] = match[2];
      }
      return res;
    };
    var css = (a, b) => {
      if (isString(a)) {
        if (isString(b)) return `${a};${b}`;
        a = serialize(a);
      } else if (isString(b)) {
        b = serialize(b);
      }
      return Object.assign({}, a ?? {}, b ?? {});
    };
    function mergeProps(...args) {
      let result = {};
      for (let props of args) {
        for (let key in result) {
          if (key.startsWith("on") && typeof result[key] === "function" && typeof props[key] === "function") {
            result[key] = callAll(props[key], result[key]);
            continue;
          }
          if (key === "className" || key === "class") {
            result[key] = clsx(result[key], props[key]);
            continue;
          }
          if (key === "style") {
            result[key] = css(result[key], props[key]);
            continue;
          }
          result[key] = props[key] !== void 0 ? props[key] : result[key];
        }
        for (let key in props) {
          if (result[key] === void 0) {
            result[key] = props[key];
          }
        }
      }
      return result;
    }
  }
});

// js/corex/@zag-js/text-selection.js
var require_text_selection = __commonJS({
  "js/corex/@zag-js/text-selection.js"(exports) {
    "use strict";
    var domQuery = require_dom_query();
    var state = "default";
    var userSelect = "";
    var elementMap = /* @__PURE__ */ new WeakMap();
    function disableTextSelectionImpl(options = {}) {
      const { target, doc } = options;
      const docNode = doc ?? document;
      const rootEl = docNode.documentElement;
      if (domQuery.isIos()) {
        if (state === "default") {
          userSelect = rootEl.style.webkitUserSelect;
          rootEl.style.webkitUserSelect = "none";
        }
        state = "disabled";
      } else if (target) {
        elementMap.set(target, target.style.userSelect);
        target.style.userSelect = "none";
      }
      return () => restoreTextSelection({ target, doc: docNode });
    }
    function restoreTextSelection(options = {}) {
      const { target, doc } = options;
      const docNode = doc ?? document;
      const rootEl = docNode.documentElement;
      if (domQuery.isIos()) {
        if (state !== "disabled") return;
        state = "restoring";
        setTimeout(() => {
          domQuery.nextTick(() => {
            if (state === "restoring") {
              if (rootEl.style.webkitUserSelect === "none") {
                rootEl.style.webkitUserSelect = userSelect || "";
              }
              userSelect = "";
              state = "default";
            }
          });
        }, 300);
      } else {
        if (target && elementMap.has(target)) {
          const prevUserSelect = elementMap.get(target);
          if (target.style.userSelect === "none") {
            target.style.userSelect = prevUserSelect ?? "";
          }
          if (target.getAttribute("style") === "") {
            target.removeAttribute("style");
          }
          elementMap.delete(target);
        }
      }
    }
    function disableTextSelection(options = {}) {
      const { defer, target, ...restOptions } = options;
      const func = defer ? domQuery.raf : (v) => v();
      const cleanups = [];
      cleanups.push(
        func(() => {
          const node = typeof target === "function" ? target() : target;
          cleanups.push(disableTextSelectionImpl({ ...restOptions, target: node }));
        })
      );
      return () => {
        cleanups.forEach((fn) => fn?.());
      };
    }
    exports.disableTextSelection = disableTextSelection;
    exports.restoreTextSelection = restoreTextSelection;
  }
});

// js/corex/@zag-js/dom-event.js
var require_dom_event = __commonJS({
  "js/corex/@zag-js/dom-event.js"(exports) {
    "use strict";
    var domQuery = require_dom_query();
    var textSelection = require_text_selection();
    var addDomEvent = (target, eventName, handler, options) => {
      const node = typeof target === "function" ? target() : target;
      node?.addEventListener(eventName, handler, options);
      return () => {
        node?.removeEventListener(eventName, handler, options);
      };
    };
    function isKeyboardClick(e) {
      return e.detail === 0 || e.clientX === 0 && e.clientY === 0;
    }
    function isPrintableKey(e) {
      return e.key.length === 1 && !e.ctrlKey && !e.metaKey;
    }
    function isVirtualPointerEvent(e) {
      return e.width === 0 && e.height === 0 || e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "mouse";
    }
    function isVirtualClick(e) {
      if (e.mozInputSource === 0 && e.isTrusted) return true;
      return e.detail === 0 && !e.pointerType;
    }
    var isLeftClick = (e) => e.button === 0;
    var isContextMenuEvent = (e) => {
      return e.button === 2 || domQuery.isMac() && e.ctrlKey && e.button === 0;
    };
    var isModifierKey = (e) => e.ctrlKey || e.altKey || e.metaKey;
    function queueBeforeEvent(element, type, cb) {
      const createTimer = (callback) => {
        const timerId = requestAnimationFrame(callback);
        return () => cancelAnimationFrame(timerId);
      };
      const cancelTimer = createTimer(() => {
        element.removeEventListener(type, callSync, true);
        cb();
      });
      const callSync = () => {
        cancelTimer();
        cb();
      };
      element.addEventListener(type, callSync, { once: true, capture: true });
      return cancelTimer;
    }
    function isLinkElement(element) {
      return element?.matches("a[href]") ?? false;
    }
    function clickIfLink(element) {
      if (!isLinkElement(element)) return;
      const click = () => element.click();
      if (domQuery.isFirefox()) {
        queueBeforeEvent(element, "keyup", click);
      } else {
        queueMicrotask(click);
      }
    }
    function fireCustomEvent(el, type, init) {
      if (!el) return;
      const win = el.ownerDocument.defaultView || window;
      const event = new win.CustomEvent(type, init);
      return el.dispatchEvent(event);
    }
    function fireBlurEvent(el, init) {
      const win = el.ownerDocument.defaultView || window;
      const event = new win.FocusEvent("blur", init);
      const allowed = el.dispatchEvent(event);
      const bubbleInit = { ...init, bubbles: true };
      el.dispatchEvent(new win.FocusEvent("focusout", bubbleInit));
      return allowed;
    }
    var keyMap = {
      Up: "ArrowUp",
      Down: "ArrowDown",
      Esc: "Escape",
      " ": "Space",
      ",": "Comma",
      Left: "ArrowLeft",
      Right: "ArrowRight"
    };
    var rtlKeyMap = {
      ArrowLeft: "ArrowRight",
      ArrowRight: "ArrowLeft"
    };
    function getEventKey(event, options = {}) {
      const { dir = "ltr", orientation = "horizontal" } = options;
      let { key } = event;
      key = keyMap[key] ?? key;
      const isRtl = dir === "rtl" && orientation === "horizontal";
      if (isRtl && key in rtlKeyMap) {
        key = rtlKeyMap[key];
      }
      return key;
    }
    function pointFromTouch(e, type = "client") {
      const point = e.touches[0] || e.changedTouches[0];
      return { x: point[`${type}X`], y: point[`${type}Y`] };
    }
    function pointFromMouse(point, type = "client") {
      return { x: point[`${type}X`], y: point[`${type}Y`] };
    }
    var isTouchEvent = (event) => "touches" in event && event.touches.length > 0;
    function getEventPoint(event, type = "client") {
      return isTouchEvent(event) ? pointFromTouch(event, type) : pointFromMouse(event, type);
    }
    var PAGE_KEYS = /* @__PURE__ */ new Set(["PageUp", "PageDown"]);
    var ARROW_KEYS = /* @__PURE__ */ new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);
    function getEventStep(event) {
      if (event.ctrlKey || event.metaKey) {
        return 0.1;
      } else {
        const isPageKey = PAGE_KEYS.has(event.key);
        const isSkipKey = isPageKey || event.shiftKey && ARROW_KEYS.has(event.key);
        return isSkipKey ? 10 : 1;
      }
    }
    function getNativeEvent(event) {
      return event.nativeEvent ?? event;
    }
    function clamp(value) {
      return Math.max(0, Math.min(1, value));
    }
    function getRelativePoint(point, element) {
      const { left, top, width, height } = element.getBoundingClientRect();
      const offset = { x: point.x - left, y: point.y - top };
      const percent = { x: clamp(offset.x / width), y: clamp(offset.y / height) };
      function getPercentValue(options = {}) {
        const { dir = "ltr", orientation = "horizontal", inverted } = options;
        const invertX = typeof inverted === "object" ? inverted.x : inverted;
        const invertY = typeof inverted === "object" ? inverted.y : inverted;
        if (orientation === "horizontal") {
          return dir === "rtl" || invertX ? 1 - percent.x : percent.x;
        }
        return invertY ? 1 - percent.y : percent.y;
      }
      return { offset, percent, getPercentValue };
    }
    function requestPointerLock(doc, fn) {
      const body = doc.body;
      const supported = "pointerLockElement" in doc || "mozPointerLockElement" in doc;
      const isLocked = () => !!doc.pointerLockElement;
      function onPointerChange() {
        fn?.(isLocked());
      }
      function onPointerError(event) {
        if (isLocked()) fn?.(false);
        console.error("PointerLock error occured:", event);
        doc.exitPointerLock();
      }
      if (!supported) return;
      try {
        body.requestPointerLock();
      } catch {
      }
      const cleanup = [
        addDomEvent(doc, "pointerlockchange", onPointerChange, false),
        addDomEvent(doc, "pointerlockerror", onPointerError, false)
      ];
      return () => {
        cleanup.forEach((cleanup2) => cleanup2());
        doc.exitPointerLock();
      };
    }
    function trackPointerMove(doc, handlers) {
      const { onPointerMove, onPointerUp } = handlers;
      const handleMove = (event) => {
        const point = getEventPoint(event);
        const distance = Math.sqrt(point.x ** 2 + point.y ** 2);
        const moveBuffer = event.pointerType === "touch" ? 10 : 5;
        if (distance < moveBuffer) return;
        if (event.pointerType === "mouse" && event.button === 0) {
          onPointerUp();
          return;
        }
        onPointerMove({ point, event });
      };
      const cleanups = [
        addDomEvent(doc, "pointermove", handleMove, false),
        addDomEvent(doc, "pointerup", onPointerUp, false),
        addDomEvent(doc, "pointercancel", onPointerUp, false),
        addDomEvent(doc, "contextmenu", onPointerUp, false),
        textSelection.disableTextSelection({ doc })
      ];
      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    }
    var pipe = (...fns) => (arg) => fns.reduce((acc, fn) => fn(acc), arg);
    var noop = () => void 0;
    function trackPress(options) {
      const {
        pointerNode,
        keyboardNode = pointerNode,
        onPress,
        onPressStart,
        onPressEnd,
        isValidKey = (e) => e.key === "Enter"
      } = options;
      if (!pointerNode) return noop;
      const win = domQuery.getWindow(pointerNode);
      const doc = domQuery.getDocument(pointerNode);
      let removeStartListeners = noop;
      let removeEndListeners = noop;
      let removeAccessibleListeners = noop;
      const getInfo = (event) => ({
        point: getEventPoint(event),
        event
      });
      function startPress(event) {
        onPressStart?.(getInfo(event));
      }
      function cancelPress(event) {
        onPressEnd?.(getInfo(event));
      }
      const startPointerPress = (startEvent) => {
        removeEndListeners();
        const endPointerPress = (endEvent) => {
          const target = domQuery.getEventTarget(endEvent);
          if (domQuery.contains(pointerNode, target)) {
            onPress?.(getInfo(endEvent));
          } else {
            onPressEnd?.(getInfo(endEvent));
          }
        };
        const removePointerUpListener = addDomEvent(win, "pointerup", endPointerPress, { passive: !onPress });
        const removePointerCancelListener = addDomEvent(win, "pointercancel", cancelPress, { passive: !onPressEnd });
        removeEndListeners = pipe(removePointerUpListener, removePointerCancelListener);
        if (doc.activeElement === keyboardNode && startEvent.pointerType === "mouse") {
          startEvent.preventDefault();
        }
        startPress(startEvent);
      };
      const removePointerListener = addDomEvent(pointerNode, "pointerdown", startPointerPress, { passive: !onPressStart });
      const removeFocusListener = addDomEvent(keyboardNode, "focus", startAccessiblePress);
      removeStartListeners = pipe(removePointerListener, removeFocusListener);
      function startAccessiblePress() {
        const handleKeydown = (keydownEvent) => {
          if (!isValidKey(keydownEvent)) return;
          const handleKeyup = (keyupEvent) => {
            if (!isValidKey(keyupEvent)) return;
            const evt2 = new win.PointerEvent("pointerup");
            const info = getInfo(evt2);
            onPress?.(info);
            onPressEnd?.(info);
          };
          removeEndListeners();
          removeEndListeners = addDomEvent(keyboardNode, "keyup", handleKeyup);
          const evt = new win.PointerEvent("pointerdown");
          startPress(evt);
        };
        const handleBlur = () => {
          const evt = new win.PointerEvent("pointercancel");
          cancelPress(evt);
        };
        const removeKeydownListener = addDomEvent(keyboardNode, "keydown", handleKeydown);
        const removeBlurListener = addDomEvent(keyboardNode, "blur", handleBlur);
        removeAccessibleListeners = pipe(removeKeydownListener, removeBlurListener);
      }
      return function() {
        removeStartListeners();
        removeEndListeners();
        removeAccessibleListeners();
      };
    }
    function trackVisualViewport(doc, fn) {
      const win = doc?.defaultView || window;
      const onResize = () => {
        fn?.(getViewportSize(win));
      };
      onResize();
      return addDomEvent(win.visualViewport ?? win, "resize", onResize);
    }
    function getViewportSize(win) {
      return {
        width: win.visualViewport?.width || win.innerWidth,
        height: win.visualViewport?.height || win.innerHeight
      };
    }
    exports.addDomEvent = addDomEvent;
    exports.clickIfLink = clickIfLink;
    exports.fireBlurEvent = fireBlurEvent;
    exports.fireCustomEvent = fireCustomEvent;
    exports.getEventKey = getEventKey;
    exports.getEventPoint = getEventPoint;
    exports.getEventStep = getEventStep;
    exports.getNativeEvent = getNativeEvent;
    exports.getRelativePoint = getRelativePoint;
    exports.isContextMenuEvent = isContextMenuEvent;
    exports.isKeyboardClick = isKeyboardClick;
    exports.isLeftClick = isLeftClick;
    exports.isModifierKey = isModifierKey;
    exports.isPrintableKey = isPrintableKey;
    exports.isVirtualClick = isVirtualClick;
    exports.isVirtualPointerEvent = isVirtualPointerEvent;
    exports.queueBeforeEvent = queueBeforeEvent;
    exports.requestPointerLock = requestPointerLock;
    exports.trackPointerMove = trackPointerMove;
    exports.trackPress = trackPress;
    exports.trackVisualViewport = trackVisualViewport;
  }
});

// js/corex/@zag-js/utils.js
var require_utils = __commonJS({
  "js/corex/@zag-js/utils.js"(exports) {
    "use strict";
    function toArray(v) {
      if (!v) return [];
      return Array.isArray(v) ? v : [v];
    }
    var fromLength = (length) => Array.from(Array(length).keys());
    var first = (v) => v[0];
    var last = (v) => v[v.length - 1];
    var isEmpty = (v) => v.length === 0;
    var has = (v, t) => v.indexOf(t) !== -1;
    var add = (v, ...items) => v.concat(items);
    var remove = (v, ...items) => v.filter((t) => !items.includes(t));
    var removeAt = (v, i) => v.filter((_, idx) => idx !== i);
    var insertAt = (v, i, ...items) => [...v.slice(0, i), ...items, ...v.slice(i)];
    var uniq = (v) => Array.from(new Set(v));
    var addOrRemove = (v, item) => {
      if (has(v, item)) return remove(v, item);
      return add(v, item);
    };
    function clear(v) {
      while (v.length > 0) v.pop();
      return v;
    }
    function nextIndex(v, idx, opts = {}) {
      const { step = 1, loop = true } = opts;
      const next2 = idx + step;
      const len = v.length;
      const last2 = len - 1;
      if (idx === -1) return step > 0 ? 0 : last2;
      if (next2 < 0) return loop ? last2 : 0;
      if (next2 >= len) return loop ? 0 : idx > len ? len : idx;
      return next2;
    }
    function next(v, idx, opts = {}) {
      return v[nextIndex(v, idx, opts)];
    }
    function prevIndex(v, idx, opts = {}) {
      const { step = 1, loop = true } = opts;
      return nextIndex(v, idx, { step: -step, loop });
    }
    function prev(v, index, opts = {}) {
      return v[prevIndex(v, index, opts)];
    }
    var chunk = (v, size) => {
      const res = [];
      return v.reduce((rows, value, index) => {
        if (index % size === 0) rows.push([value]);
        else last(rows)?.push(value);
        return rows;
      }, res);
    };
    var isArrayLike = (value) => value?.constructor.name === "Array";
    var isArrayEqual = (a, b) => {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!isEqual(a[i], b[i])) return false;
      }
      return true;
    };
    var isEqual = (a, b) => {
      if (Object.is(a, b)) return true;
      if (a == null && b != null || a != null && b == null) return false;
      if (typeof a?.isEqual === "function" && typeof b?.isEqual === "function") {
        return a.isEqual(b);
      }
      if (typeof a === "function" && typeof b === "function") {
        return a.toString() === b.toString();
      }
      if (isArrayLike(a) && isArrayLike(b)) {
        return isArrayEqual(Array.from(a), Array.from(b));
      }
      if (!(typeof a === "object") || !(typeof b === "object")) return false;
      const keys = Object.keys(b ?? /* @__PURE__ */ Object.create(null));
      const length = keys.length;
      for (let i = 0; i < length; i++) {
        const hasKey = Reflect.has(a, keys[i]);
        if (!hasKey) return false;
      }
      for (let i = 0; i < length; i++) {
        const key = keys[i];
        if (!isEqual(a[key], b[key])) return false;
      }
      return true;
    };
    var runIfFn = (v, ...a) => {
      const res = typeof v === "function" ? v(...a) : v;
      return res ?? void 0;
    };
    var cast = (v) => v;
    var noop = () => {
    };
    var callAll = (...fns) => (...a) => {
      fns.forEach(function(fn) {
        fn?.(...a);
      });
    };
    var uuid = /* @__PURE__ */ (() => {
      let id = 0;
      return () => {
        id++;
        return id.toString(36);
      };
    })();
    function match(key, record, ...args) {
      if (key in record) {
        const fn = record[key];
        return typeof fn === "function" ? fn(...args) : fn;
      }
      const error = new Error(`No matching key: ${JSON.stringify(key)} in ${JSON.stringify(Object.keys(record))}`);
      Error.captureStackTrace?.(error, match);
      throw error;
    }
    var tryCatch = (fn, fallback) => {
      try {
        return fn();
      } catch (error) {
        if (error instanceof Error) {
          Error.captureStackTrace?.(error, tryCatch);
        }
        return fallback?.();
      }
    };
    var isDev = () => true;
    var isArray = (v) => Array.isArray(v);
    var isBoolean = (v) => v === true || v === false;
    var isObjectLike = (v) => v != null && typeof v === "object";
    var isObject2 = (v) => isObjectLike(v) && !isArray(v);
    var isNumber = (v) => typeof v === "number" && !Number.isNaN(v);
    var isString = (v) => typeof v === "string";
    var isFunction = (v) => typeof v === "function";
    var isNull = (v) => v == null;
    var hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    var baseGetTag = (v) => Object.prototype.toString.call(v);
    var fnToString = Function.prototype.toString;
    var objectCtorString = fnToString.call(Object);
    var isPlainObject = (v) => {
      if (!isObjectLike(v) || baseGetTag(v) != "[object Object]") return false;
      const proto = Object.getPrototypeOf(v);
      if (proto === null) return true;
      const Ctor = hasProp(proto, "constructor") && proto.constructor;
      return typeof Ctor == "function" && Ctor instanceof Ctor && fnToString.call(Ctor) == objectCtorString;
    };
    function splitProps(props, keys) {
      const rest = {};
      const result = {};
      const keySet = new Set(keys);
      for (const key in props) {
        if (keySet.has(key)) {
          result[key] = props[key];
        } else {
          rest[key] = props[key];
        }
      }
      return [result, rest];
    }
    var createSplitProps = (keys) => {
      return function split(props) {
        return splitProps(props, keys);
      };
    };
    function compact(obj) {
      if (!isPlainObject2(obj) || obj === void 0) {
        return obj;
      }
      const keys = Reflect.ownKeys(obj).filter((key) => typeof key === "string");
      const filtered = {};
      for (const key of keys) {
        const value = obj[key];
        if (value !== void 0) {
          filtered[key] = compact(value);
        }
      }
      return filtered;
    }
    function json(value) {
      return JSON.parse(JSON.stringify(value));
    }
    var isPlainObject2 = (value) => {
      return value && typeof value === "object" && value.constructor === Object;
    };
    function pick(obj, keys) {
      const filtered = {};
      for (const key of keys) {
        const value = obj[key];
        if (value !== void 0) {
          filtered[key] = value;
        }
      }
      return filtered;
    }
    function omit(obj, keys) {
      return createSplitProps(keys)(obj)[1];
    }
    function warn(...a) {
      const m = a.length === 1 ? a[0] : a[1];
      const c = a.length === 2 ? a[0] : true;
      if (c && true) {
        console.warn(m);
      }
    }
    function invariant(...a) {
      const m = a.length === 1 ? a[0] : a[1];
      const c = a.length === 2 ? a[0] : true;
      if (c && true) {
        throw new Error(m);
      }
    }
    exports.add = add;
    exports.addOrRemove = addOrRemove;
    exports.callAll = callAll;
    exports.cast = cast;
    exports.chunk = chunk;
    exports.clear = clear;
    exports.compact = compact;
    exports.createSplitProps = createSplitProps;
    exports.first = first;
    exports.fromLength = fromLength;
    exports.has = has;
    exports.hasProp = hasProp;
    exports.insertAt = insertAt;
    exports.invariant = invariant;
    exports.isArray = isArray;
    exports.isBoolean = isBoolean;
    exports.isDev = isDev;
    exports.isEmpty = isEmpty;
    exports.isEqual = isEqual;
    exports.isFunction = isFunction;
    exports.isNull = isNull;
    exports.isNumber = isNumber;
    exports.isObject = isObject2;
    exports.isObjectLike = isObjectLike;
    exports.isPlainObject = isPlainObject;
    exports.isString = isString;
    exports.json = json;
    exports.last = last;
    exports.match = match;
    exports.next = next;
    exports.nextIndex = nextIndex;
    exports.noop = noop;
    exports.omit = omit;
    exports.pick = pick;
    exports.prev = prev;
    exports.prevIndex = prevIndex;
    exports.remove = remove;
    exports.removeAt = removeAt;
    exports.runIfFn = runIfFn;
    exports.splitProps = splitProps;
    exports.toArray = toArray;
    exports.tryCatch = tryCatch;
    exports.uniq = uniq;
    exports.uuid = uuid;
    exports.warn = warn;
  }
});

// js/corex/@zag-js/interact-outside.js
var require_interact_outside = __commonJS({
  "js/corex/@zag-js/interact-outside.js"(exports) {
    "use strict";
    var domEvent = require_dom_event();
    var domQuery = require_dom_query();
    var utils = require_utils();
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
  }
});

// js/corex/@zag-js/dismissable.js
var require_dismissable = __commonJS({
  "js/corex/@zag-js/dismissable.js"(exports) {
    "use strict";
    var domQuery = require_dom_query();
    var interactOutside = require_interact_outside();
    var utils = require_utils();
    var domEvent = require_dom_event();
    function trackEscapeKeydown(node, fn) {
      const handleKeyDown = (event) => {
        if (event.key !== "Escape") return;
        if (event.isComposing) return;
        fn?.(event);
      };
      return domEvent.addDomEvent(domQuery.getDocument(node), "keydown", handleKeyDown, { capture: true });
    }
    var layerStack = {
      layers: [],
      branches: [],
      count() {
        return this.layers.length;
      },
      pointerBlockingLayers() {
        return this.layers.filter((layer) => layer.pointerBlocking);
      },
      topMostPointerBlockingLayer() {
        return [...this.pointerBlockingLayers()].slice(-1)[0];
      },
      hasPointerBlockingLayer() {
        return this.pointerBlockingLayers().length > 0;
      },
      isBelowPointerBlockingLayer(node) {
        const index = this.indexOf(node);
        const highestBlockingIndex = this.topMostPointerBlockingLayer() ? this.indexOf(this.topMostPointerBlockingLayer()?.node) : -1;
        return index < highestBlockingIndex;
      },
      isTopMost(node) {
        const layer = this.layers[this.count() - 1];
        return layer?.node === node;
      },
      getNestedLayers(node) {
        return Array.from(this.layers).slice(this.indexOf(node) + 1);
      },
      isInNestedLayer(node, target) {
        return this.getNestedLayers(node).some((layer) => domQuery.contains(layer.node, target));
      },
      isInBranch(target) {
        return Array.from(this.branches).some((branch) => domQuery.contains(branch, target));
      },
      add(layer) {
        const num = this.layers.push(layer);
        layer.node.style.setProperty("--layer-index", `${num}`);
      },
      addBranch(node) {
        this.branches.push(node);
      },
      remove(node) {
        const index = this.indexOf(node);
        if (index < 0) return;
        if (index < this.count() - 1) {
          const _layers = this.getNestedLayers(node);
          _layers.forEach((layer) => layer.dismiss());
        }
        this.layers.splice(index, 1);
        node.style.removeProperty("--layer-index");
      },
      removeBranch(node) {
        const index = this.branches.indexOf(node);
        if (index >= 0) this.branches.splice(index, 1);
      },
      indexOf(node) {
        return this.layers.findIndex((layer) => layer.node === node);
      },
      dismiss(node) {
        this.layers[this.indexOf(node)]?.dismiss();
      },
      clear() {
        this.remove(this.layers[0].node);
      }
    };
    var originalBodyPointerEvents;
    function assignPointerEventToLayers() {
      layerStack.layers.forEach(({ node }) => {
        node.style.pointerEvents = layerStack.isBelowPointerBlockingLayer(node) ? "none" : "auto";
      });
    }
    function clearPointerEvent(node) {
      node.style.pointerEvents = "";
    }
    function disablePointerEventsOutside(node, peristentElements) {
      const doc = domQuery.getDocument(node);
      const cleanups = [];
      if (layerStack.hasPointerBlockingLayer() && !doc.body.hasAttribute("data-inert")) {
        originalBodyPointerEvents = document.body.style.pointerEvents;
        queueMicrotask(() => {
          doc.body.style.pointerEvents = "none";
          doc.body.setAttribute("data-inert", "");
        });
      }
      if (peristentElements) {
        const persistedCleanup = domQuery.waitForElements(peristentElements, (el) => {
          cleanups.push(domQuery.setStyle(el, { pointerEvents: "auto" }));
        });
        cleanups.push(persistedCleanup);
      }
      return () => {
        if (layerStack.hasPointerBlockingLayer()) return;
        queueMicrotask(() => {
          doc.body.style.pointerEvents = originalBodyPointerEvents;
          doc.body.removeAttribute("data-inert");
          if (doc.body.style.length === 0) doc.body.removeAttribute("style");
        });
        cleanups.forEach((fn) => fn());
      };
    }
    function trackDismissableElementImpl(node, options) {
      if (!node) {
        utils.warn("[@zag-js/dismissable] node is `null` or `undefined`");
        return;
      }
      const { onDismiss, pointerBlocking, exclude: excludeContainers, debug } = options;
      const layer = { dismiss: onDismiss, node, pointerBlocking };
      layerStack.add(layer);
      assignPointerEventToLayers();
      function onPointerDownOutside(event) {
        const target = domQuery.getEventTarget(event.detail.originalEvent);
        if (layerStack.isBelowPointerBlockingLayer(node) || layerStack.isInBranch(target)) return;
        options.onPointerDownOutside?.(event);
        options.onInteractOutside?.(event);
        if (event.defaultPrevented) return;
        if (debug) {
          console.log("onPointerDownOutside:", event.detail.originalEvent);
        }
        onDismiss?.();
      }
      function onFocusOutside(event) {
        const target = domQuery.getEventTarget(event.detail.originalEvent);
        if (layerStack.isInBranch(target)) return;
        options.onFocusOutside?.(event);
        options.onInteractOutside?.(event);
        if (event.defaultPrevented) return;
        if (debug) {
          console.log("onFocusOutside:", event.detail.originalEvent);
        }
        onDismiss?.();
      }
      function onEscapeKeyDown(event) {
        if (!layerStack.isTopMost(node)) return;
        options.onEscapeKeyDown?.(event);
        if (!event.defaultPrevented && onDismiss) {
          event.preventDefault();
          onDismiss();
        }
      }
      function exclude(target) {
        if (!node) return false;
        const containers = typeof excludeContainers === "function" ? excludeContainers() : excludeContainers;
        const _containers = Array.isArray(containers) ? containers : [containers];
        const persistentElements = options.persistentElements?.map((fn) => fn()).filter(domQuery.isHTMLElement);
        if (persistentElements) _containers.push(...persistentElements);
        return _containers.some((node2) => domQuery.contains(node2, target)) || layerStack.isInNestedLayer(node, target);
      }
      const cleanups = [
        pointerBlocking ? disablePointerEventsOutside(node, options.persistentElements) : void 0,
        trackEscapeKeydown(node, onEscapeKeyDown),
        interactOutside.trackInteractOutside(node, { exclude, onFocusOutside, onPointerDownOutside, defer: options.defer })
      ];
      return () => {
        layerStack.remove(node);
        assignPointerEventToLayers();
        clearPointerEvent(node);
        cleanups.forEach((fn) => fn?.());
      };
    }
    function trackDismissableElement(nodeOrFn, options) {
      const { defer } = options;
      const func = defer ? domQuery.raf : (v) => v();
      const cleanups = [];
      cleanups.push(
        func(() => {
          const node = utils.isFunction(nodeOrFn) ? nodeOrFn() : nodeOrFn;
          cleanups.push(trackDismissableElementImpl(node, options));
        })
      );
      return () => {
        cleanups.forEach((fn) => fn?.());
      };
    }
    function trackDismissableBranch(nodeOrFn, options = {}) {
      const { defer } = options;
      const func = defer ? domQuery.raf : (v) => v();
      const cleanups = [];
      cleanups.push(
        func(() => {
          const node = utils.isFunction(nodeOrFn) ? nodeOrFn() : nodeOrFn;
          if (!node) {
            utils.warn("[@zag-js/dismissable] branch node is `null` or `undefined`");
            return;
          }
          layerStack.addBranch(node);
          cleanups.push(() => {
            layerStack.removeBranch(node);
          });
        })
      );
      return () => {
        cleanups.forEach((fn) => fn?.());
      };
    }
    exports.trackDismissableBranch = trackDismissableBranch;
    exports.trackDismissableElement = trackDismissableElement;
  }
});

// js/corex/@zag-js/remove-scroll.js
var require_remove_scroll = __commonJS({
  "js/corex/@zag-js/remove-scroll.js"(exports) {
    "use strict";
    var domQuery = require_dom_query();
    var LOCK_CLASSNAME = "data-scroll-lock";
    function assignStyle(el, style) {
      if (!el) return;
      const previousStyle = Object.keys(style).reduce(
        (acc, key) => {
          acc[key] = el.style.getPropertyValue(key);
          return acc;
        },
        {}
      );
      Object.assign(el.style, style);
      return () => {
        Object.assign(el.style, previousStyle);
      };
    }
    function setCSSProperty(el, property, value) {
      if (!el) return;
      const previousValue = el.style.getPropertyValue(property);
      el.style.setProperty(property, value);
      return () => {
        if (previousValue) {
          el.style.setProperty(property, previousValue);
        } else {
          el.style.removeProperty(property);
        }
      };
    }
    function getPaddingProperty(documentElement) {
      const documentLeft = documentElement.getBoundingClientRect().left;
      const scrollbarX = Math.round(documentLeft) + documentElement.scrollLeft;
      return scrollbarX ? "paddingLeft" : "paddingRight";
    }
    function preventBodyScroll(_document) {
      const doc = _document ?? document;
      const win = doc.defaultView ?? window;
      const { documentElement, body } = doc;
      const locked = body.hasAttribute(LOCK_CLASSNAME);
      if (locked) return;
      body.setAttribute(LOCK_CLASSNAME, "");
      const scrollbarWidth = win.innerWidth - documentElement.clientWidth;
      const setScrollbarWidthProperty = () => setCSSProperty(documentElement, "--scrollbar-width", `${scrollbarWidth}px`);
      const paddingProperty = getPaddingProperty(documentElement);
      const setStyle = () => assignStyle(body, {
        overflow: "hidden",
        [paddingProperty]: `${scrollbarWidth}px`
      });
      const setIOSStyle = () => {
        const { scrollX, scrollY, visualViewport } = win;
        const offsetLeft = visualViewport?.offsetLeft ?? 0;
        const offsetTop = visualViewport?.offsetTop ?? 0;
        const restoreStyle = assignStyle(body, {
          position: "fixed",
          overflow: "hidden",
          top: `${-(scrollY - Math.floor(offsetTop))}px`,
          left: `${-(scrollX - Math.floor(offsetLeft))}px`,
          right: "0",
          [paddingProperty]: `${scrollbarWidth}px`
        });
        return () => {
          restoreStyle?.();
          win.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
        };
      };
      const cleanups = [setScrollbarWidthProperty(), domQuery.isIos() ? setIOSStyle() : setStyle()];
      return () => {
        cleanups.forEach((fn) => fn?.());
        body.removeAttribute(LOCK_CLASSNAME);
      };
    }
    exports.preventBodyScroll = preventBodyScroll;
  }
});

// js/corex/tabbable.js
var require_tabbable = __commonJS({
  "js/corex/tabbable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var candidateSelectors = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"];
    var candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
    var NoElement = typeof Element === "undefined";
    var matches = NoElement ? function() {
    } : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
      var _element$getRootNode;
      return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
    } : function(element) {
      return element === null || element === void 0 ? void 0 : element.ownerDocument;
    };
    var isInert = function isInert2(node, lookUp) {
      var _node$getAttribute;
      if (lookUp === void 0) {
        lookUp = true;
      }
      var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, "inert");
      var inert = inertAtt === "" || inertAtt === "true";
      var result = inert || lookUp && node && isInert2(node.parentNode);
      return result;
    };
    var isContentEditable = function isContentEditable2(node) {
      var _node$getAttribute2;
      var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, "contenteditable");
      return attValue === "" || attValue === "true";
    };
    var getCandidates = function getCandidates2(el, includeContainer, filter) {
      if (isInert(el)) {
        return [];
      }
      var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
      if (includeContainer && matches.call(el, candidateSelector)) {
        candidates.unshift(el);
      }
      candidates = candidates.filter(filter);
      return candidates;
    };
    var getCandidatesIteratively = function getCandidatesIteratively2(elements, includeContainer, options) {
      var candidates = [];
      var elementsToCheck = Array.from(elements);
      while (elementsToCheck.length) {
        var element = elementsToCheck.shift();
        if (isInert(element, false)) {
          continue;
        }
        if (element.tagName === "SLOT") {
          var assigned = element.assignedElements();
          var content = assigned.length ? assigned : element.children;
          var nestedCandidates = getCandidatesIteratively2(content, true, options);
          if (options.flatten) {
            candidates.push.apply(candidates, nestedCandidates);
          } else {
            candidates.push({
              scopeParent: element,
              candidates: nestedCandidates
            });
          }
        } else {
          var validCandidate = matches.call(element, candidateSelector);
          if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
            candidates.push(element);
          }
          var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
          typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
          var validShadowRoot = !isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
          if (shadowRoot && validShadowRoot) {
            var _nestedCandidates = getCandidatesIteratively2(shadowRoot === true ? element.children : shadowRoot.children, true, options);
            if (options.flatten) {
              candidates.push.apply(candidates, _nestedCandidates);
            } else {
              candidates.push({
                scopeParent: element,
                candidates: _nestedCandidates
              });
            }
          } else {
            elementsToCheck.unshift.apply(elementsToCheck, element.children);
          }
        }
      }
      return candidates;
    };
    var hasTabIndex = function hasTabIndex2(node) {
      return !isNaN(parseInt(node.getAttribute("tabindex"), 10));
    };
    var getTabIndex = function getTabIndex2(node) {
      if (!node) {
        throw new Error("No node provided");
      }
      if (node.tabIndex < 0) {
        if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
          return 0;
        }
      }
      return node.tabIndex;
    };
    var getSortOrderTabIndex = function getSortOrderTabIndex2(node, isScope) {
      var tabIndex = getTabIndex(node);
      if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
        return 0;
      }
      return tabIndex;
    };
    var sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
      return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
    };
    var isInput = function isInput2(node) {
      return node.tagName === "INPUT";
    };
    var isHiddenInput = function isHiddenInput2(node) {
      return isInput(node) && node.type === "hidden";
    };
    var isDetailsWithSummary = function isDetailsWithSummary2(node) {
      var r = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
        return child.tagName === "SUMMARY";
      });
      return r;
    };
    var getCheckedRadio = function getCheckedRadio2(nodes, form) {
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].checked && nodes[i].form === form) {
          return nodes[i];
        }
      }
    };
    var isTabbableRadio = function isTabbableRadio2(node) {
      if (!node.name) {
        return true;
      }
      var radioScope = node.form || getRootNode(node);
      var queryRadios = function queryRadios2(name) {
        return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
      };
      var radioSet;
      if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
        radioSet = queryRadios(window.CSS.escape(node.name));
      } else {
        try {
          radioSet = queryRadios(node.name);
        } catch (err) {
          console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
          return false;
        }
      }
      var checked = getCheckedRadio(radioSet, node.form);
      return !checked || checked === node;
    };
    var isRadio = function isRadio2(node) {
      return isInput(node) && node.type === "radio";
    };
    var isNonTabbableRadio = function isNonTabbableRadio2(node) {
      return isRadio(node) && !isTabbableRadio(node);
    };
    var isNodeAttached = function isNodeAttached2(node) {
      var _nodeRoot;
      var nodeRoot = node && getRootNode(node);
      var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
      var attached = false;
      if (nodeRoot && nodeRoot !== node) {
        var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
        attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
        while (!attached && nodeRootHost) {
          var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
          nodeRoot = getRootNode(nodeRootHost);
          nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
          attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
        }
      }
      return attached;
    };
    var isZeroArea = function isZeroArea2(node) {
      var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
      return width === 0 && height === 0;
    };
    var isHidden = function isHidden2(node, _ref) {
      var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
      if (getComputedStyle(node).visibility === "hidden") {
        return true;
      }
      var isDirectSummary = matches.call(node, "details>summary:first-of-type");
      var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
      if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
        return true;
      }
      if (!displayCheck || displayCheck === "full" || displayCheck === "legacy-full") {
        if (typeof getShadowRoot === "function") {
          var originalNode = node;
          while (node) {
            var parentElement = node.parentElement;
            var rootNode = getRootNode(node);
            if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
              return isZeroArea(node);
            } else if (node.assignedSlot) {
              node = node.assignedSlot;
            } else if (!parentElement && rootNode !== node.ownerDocument) {
              node = rootNode.host;
            } else {
              node = parentElement;
            }
          }
          node = originalNode;
        }
        if (isNodeAttached(node)) {
          return !node.getClientRects().length;
        }
        if (displayCheck !== "legacy-full") {
          return true;
        }
      } else if (displayCheck === "non-zero-area") {
        return isZeroArea(node);
      }
      return false;
    };
    var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
      if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
        var parentNode = node.parentElement;
        while (parentNode) {
          if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
            for (var i = 0; i < parentNode.children.length; i++) {
              var child = parentNode.children.item(i);
              if (child.tagName === "LEGEND") {
                return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
              }
            }
            return true;
          }
          parentNode = parentNode.parentElement;
        }
      }
      return false;
    };
    var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
      if (node.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
      //  because we're limited in the type of selectors we can use in JSDom (see related
      //  note related to `candidateSelectors`)
      isInert(node) || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
      isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
        return false;
      }
      return true;
    };
    var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
      if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
        return false;
      }
      return true;
    };
    var isValidShadowRootTabbable = function isValidShadowRootTabbable2(shadowHostNode) {
      var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
      if (isNaN(tabIndex) || tabIndex >= 0) {
        return true;
      }
      return false;
    };
    var sortByOrder = function sortByOrder2(candidates) {
      var regularTabbables = [];
      var orderedTabbables = [];
      candidates.forEach(function(item, i) {
        var isScope = !!item.scopeParent;
        var element = isScope ? item.scopeParent : item;
        var candidateTabindex = getSortOrderTabIndex(element, isScope);
        var elements = isScope ? sortByOrder2(item.candidates) : element;
        if (candidateTabindex === 0) {
          isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
        } else {
          orderedTabbables.push({
            documentOrder: i,
            tabIndex: candidateTabindex,
            item,
            isScope,
            content: elements
          });
        }
      });
      return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
        sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
        return acc;
      }, []).concat(regularTabbables);
    };
    var tabbable = function tabbable2(container, options) {
      options = options || {};
      var candidates;
      if (options.getShadowRoot) {
        candidates = getCandidatesIteratively([container], options.includeContainer, {
          filter: isNodeMatchingSelectorTabbable.bind(null, options),
          flatten: false,
          getShadowRoot: options.getShadowRoot,
          shadowRootFilter: isValidShadowRootTabbable
        });
      } else {
        candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
      }
      return sortByOrder(candidates);
    };
    var focusable = function focusable2(container, options) {
      options = options || {};
      var candidates;
      if (options.getShadowRoot) {
        candidates = getCandidatesIteratively([container], options.includeContainer, {
          filter: isNodeMatchingSelectorFocusable.bind(null, options),
          flatten: true,
          getShadowRoot: options.getShadowRoot
        });
      } else {
        candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
      }
      return candidates;
    };
    var isTabbable = function isTabbable2(node, options) {
      options = options || {};
      if (!node) {
        throw new Error("No node provided");
      }
      if (matches.call(node, candidateSelector) === false) {
        return false;
      }
      return isNodeMatchingSelectorTabbable(options, node);
    };
    var focusableCandidateSelector = /* @__PURE__ */ candidateSelectors.concat("iframe").join(",");
    var isFocusable = function isFocusable2(node, options) {
      options = options || {};
      if (!node) {
        throw new Error("No node provided");
      }
      if (matches.call(node, focusableCandidateSelector) === false) {
        return false;
      }
      return isNodeMatchingSelectorFocusable(options, node);
    };
    exports.focusable = focusable;
    exports.getTabIndex = getTabIndex;
    exports.isFocusable = isFocusable;
    exports.isTabbable = isTabbable;
    exports.tabbable = tabbable;
  }
});

// js/corex/focus-trap.js
var require_focus_trap = __commonJS({
  "js/corex/focus-trap.js"(exports) {
    "use strict";
    var tabbable = require_tabbable();
    function _arrayLikeToArray(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
      return n;
    }
    function _arrayWithoutHoles(r) {
      if (Array.isArray(r)) return _arrayLikeToArray(r);
    }
    function _defineProperty(e, r, t) {
      return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: true,
        configurable: true,
        writable: true
      }) : e[r] = t, e;
    }
    function _iterableToArray(r) {
      if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r2) {
          return Object.getOwnPropertyDescriptor(e, r2).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread2(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
          _defineProperty(e, r2, t[r2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
          Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
        });
      }
      return e;
    }
    function _toConsumableArray(r) {
      return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
    }
    function _toPrimitive(t, r) {
      if ("object" != typeof t || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == typeof i ? i : i + "";
    }
    function _unsupportedIterableToArray(r, a) {
      if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
      }
    }
    var activeFocusTraps = {
      activateTrap: function activateTrap(trapStack, trap) {
        if (trapStack.length > 0) {
          var activeTrap = trapStack[trapStack.length - 1];
          if (activeTrap !== trap) {
            activeTrap.pause();
          }
        }
        var trapIndex = trapStack.indexOf(trap);
        if (trapIndex === -1) {
          trapStack.push(trap);
        } else {
          trapStack.splice(trapIndex, 1);
          trapStack.push(trap);
        }
      },
      deactivateTrap: function deactivateTrap(trapStack, trap) {
        var trapIndex = trapStack.indexOf(trap);
        if (trapIndex !== -1) {
          trapStack.splice(trapIndex, 1);
        }
        if (trapStack.length > 0) {
          trapStack[trapStack.length - 1].unpause();
        }
      }
    };
    var isSelectableInput = function isSelectableInput2(node) {
      return node.tagName && node.tagName.toLowerCase() === "input" && typeof node.select === "function";
    };
    var isEscapeEvent = function isEscapeEvent2(e) {
      return (e === null || e === void 0 ? void 0 : e.key) === "Escape" || (e === null || e === void 0 ? void 0 : e.key) === "Esc" || (e === null || e === void 0 ? void 0 : e.keyCode) === 27;
    };
    var isTabEvent = function isTabEvent2(e) {
      return (e === null || e === void 0 ? void 0 : e.key) === "Tab" || (e === null || e === void 0 ? void 0 : e.keyCode) === 9;
    };
    var isKeyForward = function isKeyForward2(e) {
      return isTabEvent(e) && !e.shiftKey;
    };
    var isKeyBackward = function isKeyBackward2(e) {
      return isTabEvent(e) && e.shiftKey;
    };
    var delay = function delay2(fn) {
      return setTimeout(fn, 0);
    };
    var valueOrHandler = function valueOrHandler2(value) {
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }
      return typeof value === "function" ? value.apply(void 0, params) : value;
    };
    var getActualTarget = function getActualTarget2(event) {
      return event.target.shadowRoot && typeof event.composedPath === "function" ? event.composedPath()[0] : event.target;
    };
    var internalTrapStack = [];
    var createFocusTrap = function createFocusTrap2(elements, userOptions) {
      var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;
      var trapStack = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.trapStack) || internalTrapStack;
      var config = _objectSpread2({
        returnFocusOnDeactivate: true,
        escapeDeactivates: true,
        delayInitialFocus: true,
        isKeyForward,
        isKeyBackward
      }, userOptions);
      var state = {
        // containers given to createFocusTrap()
        // @type {Array<HTMLElement>}
        containers: [],
        // list of objects identifying tabbable nodes in `containers` in the trap
        // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
        //  is active, but the trap should never get to a state where there isn't at least one group
        //  with at least one tabbable node in it (that would lead to an error condition that would
        //  result in an error being thrown)
        // @type {Array<{
        //   container: HTMLElement,
        //   tabbableNodes: Array<HTMLElement>, // empty if none
        //   focusableNodes: Array<HTMLElement>, // empty if none
        //   posTabIndexesFound: boolean,
        //   firstTabbableNode: HTMLElement|undefined,
        //   lastTabbableNode: HTMLElement|undefined,
        //   firstDomTabbableNode: HTMLElement|undefined,
        //   lastDomTabbableNode: HTMLElement|undefined,
        //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
        // }>}
        containerGroups: [],
        // same order/length as `containers` list
        // references to objects in `containerGroups`, but only those that actually have
        //  tabbable nodes in them
        // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
        //  the same length
        tabbableGroups: [],
        nodeFocusedBeforeActivation: null,
        mostRecentlyFocusedNode: null,
        active: false,
        paused: false,
        // timer ID for when delayInitialFocus is true and initial focus in this trap
        //  has been delayed during activation
        delayInitialFocusTimer: void 0,
        // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
        recentNavEvent: void 0
      };
      var trap;
      var getOption2 = function getOption3(configOverrideOptions, optionName, configOptionName) {
        return configOverrideOptions && configOverrideOptions[optionName] !== void 0 ? configOverrideOptions[optionName] : config[configOptionName || optionName];
      };
      var findContainerIndex = function findContainerIndex2(element, event) {
        var composedPath = typeof (event === null || event === void 0 ? void 0 : event.composedPath) === "function" ? event.composedPath() : void 0;
        return state.containerGroups.findIndex(function(_ref) {
          var container = _ref.container, tabbableNodes = _ref.tabbableNodes;
          return container.contains(element) || // fall back to explicit tabbable search which will take into consideration any
          //  web components if the `tabbableOptions.getShadowRoot` option was used for
          //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
          //  look inside web components even if open)
          (composedPath === null || composedPath === void 0 ? void 0 : composedPath.includes(container)) || tabbableNodes.find(function(node) {
            return node === element;
          });
        });
      };
      var getNodeForOption = function getNodeForOption2(optionName) {
        var _ref2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref2$hasFallback = _ref2.hasFallback, hasFallback = _ref2$hasFallback === void 0 ? false : _ref2$hasFallback, _ref2$params = _ref2.params, params = _ref2$params === void 0 ? [] : _ref2$params;
        var optionValue = config[optionName];
        if (typeof optionValue === "function") {
          optionValue = optionValue.apply(void 0, _toConsumableArray(params));
        }
        if (optionValue === true) {
          optionValue = void 0;
        }
        if (!optionValue) {
          if (optionValue === void 0 || optionValue === false) {
            return optionValue;
          }
          throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
        }
        var node = optionValue;
        if (typeof optionValue === "string") {
          try {
            node = doc.querySelector(optionValue);
          } catch (err) {
            throw new Error("`".concat(optionName, '` appears to be an invalid selector; error="').concat(err.message, '"'));
          }
          if (!node) {
            if (!hasFallback) {
              throw new Error("`".concat(optionName, "` as selector refers to no known node"));
            }
          }
        }
        return node;
      };
      var getInitialFocusNode = function getInitialFocusNode2() {
        var node = getNodeForOption("initialFocus", {
          hasFallback: true
        });
        if (node === false) {
          return false;
        }
        if (node === void 0 || node && !tabbable.isFocusable(node, config.tabbableOptions)) {
          if (findContainerIndex(doc.activeElement) >= 0) {
            node = doc.activeElement;
          } else {
            var firstTabbableGroup = state.tabbableGroups[0];
            var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode;
            node = firstTabbableNode || getNodeForOption("fallbackFocus");
          }
        } else if (node === null) {
          node = getNodeForOption("fallbackFocus");
        }
        if (!node) {
          throw new Error("Your focus-trap needs to have at least one focusable element");
        }
        return node;
      };
      var updateTabbableNodes = function updateTabbableNodes2() {
        state.containerGroups = state.containers.map(function(container) {
          var tabbableNodes = tabbable.tabbable(container, config.tabbableOptions);
          var focusableNodes = tabbable.focusable(container, config.tabbableOptions);
          var firstTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[0] : void 0;
          var lastTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : void 0;
          var firstDomTabbableNode = focusableNodes.find(function(node) {
            return tabbable.isTabbable(node);
          });
          var lastDomTabbableNode = focusableNodes.slice().reverse().find(function(node) {
            return tabbable.isTabbable(node);
          });
          var posTabIndexesFound = !!tabbableNodes.find(function(node) {
            return tabbable.getTabIndex(node) > 0;
          });
          return {
            container,
            tabbableNodes,
            focusableNodes,
            /** True if at least one node with positive `tabindex` was found in this container. */
            posTabIndexesFound,
            /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
            firstTabbableNode,
            /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
            lastTabbableNode,
            // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
            //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
            //  because that API doesn't work with Shadow DOM as well as it should (@see
            //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
            //  to address an edge case related to positive tabindex support, this seems like a much easier,
            //  "close enough most of the time" alternative for positive tabindexes which should generally
            //  be avoided anyway...
            /** First tabbable node in container, __DOM__ order; `undefined` if none. */
            firstDomTabbableNode,
            /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
            lastDomTabbableNode,
            /**
             * Finds the __tabbable__ node that follows the given node in the specified direction,
             *  in this container, if any.
             * @param {HTMLElement} node
             * @param {boolean} [forward] True if going in forward tab order; false if going
             *  in reverse.
             * @returns {HTMLElement|undefined} The next tabbable node, if any.
             */
            nextTabbableNode: function nextTabbableNode(node) {
              var forward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
              var nodeIdx = tabbableNodes.indexOf(node);
              if (nodeIdx < 0) {
                if (forward) {
                  return focusableNodes.slice(focusableNodes.indexOf(node) + 1).find(function(el) {
                    return tabbable.isTabbable(el);
                  });
                }
                return focusableNodes.slice(0, focusableNodes.indexOf(node)).reverse().find(function(el) {
                  return tabbable.isTabbable(el);
                });
              }
              return tabbableNodes[nodeIdx + (forward ? 1 : -1)];
            }
          };
        });
        state.tabbableGroups = state.containerGroups.filter(function(group) {
          return group.tabbableNodes.length > 0;
        });
        if (state.tabbableGroups.length <= 0 && !getNodeForOption("fallbackFocus")) {
          throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
        }
        if (state.containerGroups.find(function(g) {
          return g.posTabIndexesFound;
        }) && state.containerGroups.length > 1) {
          throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
        }
      };
      var _getActiveElement = function getActiveElement(el) {
        var activeElement = el.activeElement;
        if (!activeElement) {
          return;
        }
        if (activeElement.shadowRoot && activeElement.shadowRoot.activeElement !== null) {
          return _getActiveElement(activeElement.shadowRoot);
        }
        return activeElement;
      };
      var _tryFocus = function tryFocus(node) {
        if (node === false) {
          return;
        }
        if (node === _getActiveElement(document)) {
          return;
        }
        if (!node || !node.focus) {
          _tryFocus(getInitialFocusNode());
          return;
        }
        node.focus({
          preventScroll: !!config.preventScroll
        });
        state.mostRecentlyFocusedNode = node;
        if (isSelectableInput(node)) {
          node.select();
        }
      };
      var getReturnFocusNode = function getReturnFocusNode2(previousActiveElement) {
        var node = getNodeForOption("setReturnFocus", {
          params: [previousActiveElement]
        });
        return node ? node : node === false ? false : previousActiveElement;
      };
      var findNextNavNode = function findNextNavNode2(_ref3) {
        var target = _ref3.target, event = _ref3.event, _ref3$isBackward = _ref3.isBackward, isBackward = _ref3$isBackward === void 0 ? false : _ref3$isBackward;
        target = target || getActualTarget(event);
        updateTabbableNodes();
        var destinationNode = null;
        if (state.tabbableGroups.length > 0) {
          var containerIndex = findContainerIndex(target, event);
          var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : void 0;
          if (containerIndex < 0) {
            if (isBackward) {
              destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
            } else {
              destinationNode = state.tabbableGroups[0].firstTabbableNode;
            }
          } else if (isBackward) {
            var startOfGroupIndex = state.tabbableGroups.findIndex(function(_ref4) {
              var firstTabbableNode = _ref4.firstTabbableNode;
              return target === firstTabbableNode;
            });
            if (startOfGroupIndex < 0 && (containerGroup.container === target || tabbable.isFocusable(target, config.tabbableOptions) && !tabbable.isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
              startOfGroupIndex = containerIndex;
            }
            if (startOfGroupIndex >= 0) {
              var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
              var destinationGroup = state.tabbableGroups[destinationGroupIndex];
              destinationNode = tabbable.getTabIndex(target) >= 0 ? destinationGroup.lastTabbableNode : destinationGroup.lastDomTabbableNode;
            } else if (!isTabEvent(event)) {
              destinationNode = containerGroup.nextTabbableNode(target, false);
            }
          } else {
            var lastOfGroupIndex = state.tabbableGroups.findIndex(function(_ref5) {
              var lastTabbableNode = _ref5.lastTabbableNode;
              return target === lastTabbableNode;
            });
            if (lastOfGroupIndex < 0 && (containerGroup.container === target || tabbable.isFocusable(target, config.tabbableOptions) && !tabbable.isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
              lastOfGroupIndex = containerIndex;
            }
            if (lastOfGroupIndex >= 0) {
              var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;
              var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
              destinationNode = tabbable.getTabIndex(target) >= 0 ? _destinationGroup.firstTabbableNode : _destinationGroup.firstDomTabbableNode;
            } else if (!isTabEvent(event)) {
              destinationNode = containerGroup.nextTabbableNode(target);
            }
          }
        } else {
          destinationNode = getNodeForOption("fallbackFocus");
        }
        return destinationNode;
      };
      var checkPointerDown = function checkPointerDown2(e) {
        var target = getActualTarget(e);
        if (findContainerIndex(target, e) >= 0) {
          return;
        }
        if (valueOrHandler(config.clickOutsideDeactivates, e)) {
          trap.deactivate({
            // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
            //  which will result in the outside click setting focus to the node
            //  that was clicked (and if not focusable, to "nothing"); by setting
            //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
            //  on activation (or the configured `setReturnFocus` node), whether the
            //  outside click was on a focusable node or not
            returnFocus: config.returnFocusOnDeactivate
          });
          return;
        }
        if (valueOrHandler(config.allowOutsideClick, e)) {
          return;
        }
        e.preventDefault();
      };
      var checkFocusIn = function checkFocusIn2(event) {
        var target = getActualTarget(event);
        var targetContained = findContainerIndex(target, event) >= 0;
        if (targetContained || target instanceof Document) {
          if (targetContained) {
            state.mostRecentlyFocusedNode = target;
          }
        } else {
          event.stopImmediatePropagation();
          var nextNode;
          var navAcrossContainers = true;
          if (state.mostRecentlyFocusedNode) {
            if (tabbable.getTabIndex(state.mostRecentlyFocusedNode) > 0) {
              var mruContainerIdx = findContainerIndex(state.mostRecentlyFocusedNode);
              var tabbableNodes = state.containerGroups[mruContainerIdx].tabbableNodes;
              if (tabbableNodes.length > 0) {
                var mruTabIdx = tabbableNodes.findIndex(function(node) {
                  return node === state.mostRecentlyFocusedNode;
                });
                if (mruTabIdx >= 0) {
                  if (config.isKeyForward(state.recentNavEvent)) {
                    if (mruTabIdx + 1 < tabbableNodes.length) {
                      nextNode = tabbableNodes[mruTabIdx + 1];
                      navAcrossContainers = false;
                    }
                  } else {
                    if (mruTabIdx - 1 >= 0) {
                      nextNode = tabbableNodes[mruTabIdx - 1];
                      navAcrossContainers = false;
                    }
                  }
                }
              }
            } else {
              if (!state.containerGroups.some(function(g) {
                return g.tabbableNodes.some(function(n) {
                  return tabbable.getTabIndex(n) > 0;
                });
              })) {
                navAcrossContainers = false;
              }
            }
          } else {
            navAcrossContainers = false;
          }
          if (navAcrossContainers) {
            nextNode = findNextNavNode({
              // move FROM the MRU node, not event-related node (which will be the node that is
              //  outside the trap causing the focus escape we're trying to fix)
              target: state.mostRecentlyFocusedNode,
              isBackward: config.isKeyBackward(state.recentNavEvent)
            });
          }
          if (nextNode) {
            _tryFocus(nextNode);
          } else {
            _tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
          }
        }
        state.recentNavEvent = void 0;
      };
      var checkKeyNav = function checkKeyNav2(event) {
        var isBackward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        state.recentNavEvent = event;
        var destinationNode = findNextNavNode({
          event,
          isBackward
        });
        if (destinationNode) {
          if (isTabEvent(event)) {
            event.preventDefault();
          }
          _tryFocus(destinationNode);
        }
      };
      var checkTabKey = function checkTabKey2(event) {
        if (config.isKeyForward(event) || config.isKeyBackward(event)) {
          checkKeyNav(event, config.isKeyBackward(event));
        }
      };
      var checkEscapeKey = function checkEscapeKey2(event) {
        if (isEscapeEvent(event) && valueOrHandler(config.escapeDeactivates, event) !== false) {
          event.preventDefault();
          trap.deactivate();
        }
      };
      var checkClick = function checkClick2(e) {
        var target = getActualTarget(e);
        if (findContainerIndex(target, e) >= 0) {
          return;
        }
        if (valueOrHandler(config.clickOutsideDeactivates, e)) {
          return;
        }
        if (valueOrHandler(config.allowOutsideClick, e)) {
          return;
        }
        e.preventDefault();
        e.stopImmediatePropagation();
      };
      var addListeners = function addListeners2() {
        if (!state.active) {
          return;
        }
        activeFocusTraps.activateTrap(trapStack, trap);
        state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function() {
          _tryFocus(getInitialFocusNode());
        }) : _tryFocus(getInitialFocusNode());
        doc.addEventListener("focusin", checkFocusIn, true);
        doc.addEventListener("mousedown", checkPointerDown, {
          capture: true,
          passive: false
        });
        doc.addEventListener("touchstart", checkPointerDown, {
          capture: true,
          passive: false
        });
        doc.addEventListener("click", checkClick, {
          capture: true,
          passive: false
        });
        doc.addEventListener("keydown", checkTabKey, {
          capture: true,
          passive: false
        });
        doc.addEventListener("keydown", checkEscapeKey);
        return trap;
      };
      var removeListeners = function removeListeners2() {
        if (!state.active) {
          return;
        }
        doc.removeEventListener("focusin", checkFocusIn, true);
        doc.removeEventListener("mousedown", checkPointerDown, true);
        doc.removeEventListener("touchstart", checkPointerDown, true);
        doc.removeEventListener("click", checkClick, true);
        doc.removeEventListener("keydown", checkTabKey, true);
        doc.removeEventListener("keydown", checkEscapeKey);
        return trap;
      };
      var checkDomRemoval = function checkDomRemoval2(mutations) {
        var isFocusedNodeRemoved = mutations.some(function(mutation) {
          var removedNodes = Array.from(mutation.removedNodes);
          return removedNodes.some(function(node) {
            return node === state.mostRecentlyFocusedNode;
          });
        });
        if (isFocusedNodeRemoved) {
          _tryFocus(getInitialFocusNode());
        }
      };
      var mutationObserver = typeof window !== "undefined" && "MutationObserver" in window ? new MutationObserver(checkDomRemoval) : void 0;
      var updateObservedNodes = function updateObservedNodes2() {
        if (!mutationObserver) {
          return;
        }
        mutationObserver.disconnect();
        if (state.active && !state.paused) {
          state.containers.map(function(container) {
            mutationObserver.observe(container, {
              subtree: true,
              childList: true
            });
          });
        }
      };
      trap = {
        get active() {
          return state.active;
        },
        get paused() {
          return state.paused;
        },
        activate: function activate(activateOptions) {
          if (state.active) {
            return this;
          }
          var onActivate = getOption2(activateOptions, "onActivate");
          var onPostActivate = getOption2(activateOptions, "onPostActivate");
          var checkCanFocusTrap = getOption2(activateOptions, "checkCanFocusTrap");
          if (!checkCanFocusTrap) {
            updateTabbableNodes();
          }
          state.active = true;
          state.paused = false;
          state.nodeFocusedBeforeActivation = doc.activeElement;
          onActivate === null || onActivate === void 0 || onActivate();
          var finishActivation = function finishActivation2() {
            if (checkCanFocusTrap) {
              updateTabbableNodes();
            }
            addListeners();
            updateObservedNodes();
            onPostActivate === null || onPostActivate === void 0 || onPostActivate();
          };
          if (checkCanFocusTrap) {
            checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
            return this;
          }
          finishActivation();
          return this;
        },
        deactivate: function deactivate(deactivateOptions) {
          if (!state.active) {
            return this;
          }
          var options = _objectSpread2({
            onDeactivate: config.onDeactivate,
            onPostDeactivate: config.onPostDeactivate,
            checkCanReturnFocus: config.checkCanReturnFocus
          }, deactivateOptions);
          clearTimeout(state.delayInitialFocusTimer);
          state.delayInitialFocusTimer = void 0;
          removeListeners();
          state.active = false;
          state.paused = false;
          updateObservedNodes();
          activeFocusTraps.deactivateTrap(trapStack, trap);
          var onDeactivate = getOption2(options, "onDeactivate");
          var onPostDeactivate = getOption2(options, "onPostDeactivate");
          var checkCanReturnFocus = getOption2(options, "checkCanReturnFocus");
          var returnFocus = getOption2(options, "returnFocus", "returnFocusOnDeactivate");
          onDeactivate === null || onDeactivate === void 0 || onDeactivate();
          var finishDeactivation = function finishDeactivation2() {
            delay(function() {
              if (returnFocus) {
                _tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
              }
              onPostDeactivate === null || onPostDeactivate === void 0 || onPostDeactivate();
            });
          };
          if (returnFocus && checkCanReturnFocus) {
            checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
            return this;
          }
          finishDeactivation();
          return this;
        },
        pause: function pause(pauseOptions) {
          if (state.paused || !state.active) {
            return this;
          }
          var onPause = getOption2(pauseOptions, "onPause");
          var onPostPause = getOption2(pauseOptions, "onPostPause");
          state.paused = true;
          onPause === null || onPause === void 0 || onPause();
          removeListeners();
          updateObservedNodes();
          onPostPause === null || onPostPause === void 0 || onPostPause();
          return this;
        },
        unpause: function unpause(unpauseOptions) {
          if (!state.paused || !state.active) {
            return this;
          }
          var onUnpause = getOption2(unpauseOptions, "onUnpause");
          var onPostUnpause = getOption2(unpauseOptions, "onPostUnpause");
          state.paused = false;
          onUnpause === null || onUnpause === void 0 || onUnpause();
          updateTabbableNodes();
          addListeners();
          updateObservedNodes();
          onPostUnpause === null || onPostUnpause === void 0 || onPostUnpause();
          return this;
        },
        updateContainerElements: function updateContainerElements(containerElements) {
          var elementsAsArray = [].concat(containerElements).filter(Boolean);
          state.containers = elementsAsArray.map(function(element) {
            return typeof element === "string" ? doc.querySelector(element) : element;
          });
          if (state.active) {
            updateTabbableNodes();
          }
          updateObservedNodes();
          return this;
        }
      };
      trap.updateContainerElements(elements);
      return trap;
    };
    exports.createFocusTrap = createFocusTrap;
  }
});

// js/corex/@zag-js/types.js
var require_types = __commonJS({
  "js/corex/@zag-js/types.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export2(src_exports, {
      createNormalizer: () => createNormalizer2,
      createProps: () => createProps
    });
    module2.exports = __toCommonJS2(src_exports);
    function createNormalizer2(fn) {
      return new Proxy({}, {
        get() {
          return fn;
        }
      });
    }
    var createProps = () => (props) => Array.from(new Set(props));
  }
});

// js/corex/@zag-js/dialog.js
var require_dialog = __commonJS({
  "js/corex/@zag-js/dialog.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export2(src_exports, {
      anatomy: () => anatomy,
      connect: () => connect2,
      machine: () => machine2,
      props: () => props,
      splitProps: () => splitProps
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_anatomy = require_anatomy();
    var anatomy = (0, import_anatomy.createAnatomy)("dialog").parts(
      "trigger",
      "backdrop",
      "positioner",
      "content",
      "title",
      "description",
      "closeTrigger"
    );
    var parts = anatomy.build();
    var import_dom_query = require_dom_query();
    var dom = (0, import_dom_query.createScope)({
      getPositionerId: (ctx) => ctx.ids?.positioner ?? `dialog:${ctx.id}:positioner`,
      getBackdropId: (ctx) => ctx.ids?.backdrop ?? `dialog:${ctx.id}:backdrop`,
      getContentId: (ctx) => ctx.ids?.content ?? `dialog:${ctx.id}:content`,
      getTriggerId: (ctx) => ctx.ids?.trigger ?? `dialog:${ctx.id}:trigger`,
      getTitleId: (ctx) => ctx.ids?.title ?? `dialog:${ctx.id}:title`,
      getDescriptionId: (ctx) => ctx.ids?.description ?? `dialog:${ctx.id}:description`,
      getCloseTriggerId: (ctx) => ctx.ids?.closeTrigger ?? `dialog:${ctx.id}:close`,
      getContentEl: (ctx) => dom.getById(ctx, dom.getContentId(ctx)),
      getPositionerEl: (ctx) => dom.getById(ctx, dom.getPositionerId(ctx)),
      getBackdropEl: (ctx) => dom.getById(ctx, dom.getBackdropId(ctx)),
      getTriggerEl: (ctx) => dom.getById(ctx, dom.getTriggerId(ctx)),
      getTitleEl: (ctx) => dom.getById(ctx, dom.getTitleId(ctx)),
      getDescriptionEl: (ctx) => dom.getById(ctx, dom.getDescriptionId(ctx)),
      getCloseTriggerEl: (ctx) => dom.getById(ctx, dom.getCloseTriggerId(ctx))
    });
    function connect2(state, send, normalize) {
      const ariaLabel = state.context["aria-label"];
      const open = state.matches("open");
      const rendered = state.context.renderedElements;
      return {
        open,
        setOpen(nextOpen) {
          if (nextOpen === open) return;
          send(nextOpen ? "OPEN" : "CLOSE");
        },
        getTriggerProps() {
          return normalize.button({
            ...parts.trigger.attrs,
            dir: state.context.dir,
            id: dom.getTriggerId(state.context),
            "aria-haspopup": "dialog",
            type: "button",
            "aria-expanded": open,
            "data-state": open ? "open" : "closed",
            "aria-controls": dom.getContentId(state.context),
            onClick(event) {
              if (event.defaultPrevented) return;
              send("TOGGLE");
            }
          });
        },
        getBackdropProps() {
          return normalize.element({
            ...parts.backdrop.attrs,
            dir: state.context.dir,
            hidden: !open,
            id: dom.getBackdropId(state.context),
            "data-state": open ? "open" : "closed"
          });
        },
        getPositionerProps() {
          return normalize.element({
            ...parts.positioner.attrs,
            dir: state.context.dir,
            id: dom.getPositionerId(state.context),
            style: {
              pointerEvents: open ? void 0 : "none"
            }
          });
        },
        getContentProps() {
          return normalize.element({
            ...parts.content.attrs,
            dir: state.context.dir,
            role: state.context.role,
            hidden: !open,
            id: dom.getContentId(state.context),
            tabIndex: -1,
            "data-state": open ? "open" : "closed",
            "aria-modal": true,
            "aria-label": ariaLabel || void 0,
            "aria-labelledby": ariaLabel || !rendered.title ? void 0 : dom.getTitleId(state.context),
            "aria-describedby": rendered.description ? dom.getDescriptionId(state.context) : void 0
          });
        },
        getTitleProps() {
          return normalize.element({
            ...parts.title.attrs,
            dir: state.context.dir,
            id: dom.getTitleId(state.context)
          });
        },
        getDescriptionProps() {
          return normalize.element({
            ...parts.description.attrs,
            dir: state.context.dir,
            id: dom.getDescriptionId(state.context)
          });
        },
        getCloseTriggerProps() {
          return normalize.button({
            ...parts.closeTrigger.attrs,
            dir: state.context.dir,
            id: dom.getCloseTriggerId(state.context),
            type: "button",
            onClick(event) {
              if (event.defaultPrevented) return;
              event.stopPropagation();
              send("CLOSE");
            }
          });
        }
      };
    }
    var import_aria_hidden = require_aria_hidden();
    var import_core = require_core();
    var import_dismissable = require_dismissable();
    var import_dom_query2 = require_dom_query();
    var import_remove_scroll = require_remove_scroll();
    var import_utils = require_utils();
    var import_focus_trap = require_focus_trap();
    function machine2(userContext) {
      const ctx = (0, import_utils.compact)(userContext);
      return (0, import_core.createMachine)(
        {
          id: "dialog",
          initial: ctx.open ? "open" : "closed",
          context: {
            role: "dialog",
            renderedElements: {
              title: true,
              description: true
            },
            modal: true,
            trapFocus: true,
            preventScroll: true,
            closeOnInteractOutside: true,
            closeOnEscape: true,
            restoreFocus: true,
            ...ctx
          },
          created: ["checkInitialFocusEl"],
          watch: {
            open: ["toggleVisibility"]
          },
          states: {
            open: {
              entry: ["checkRenderedElements", "syncZIndex"],
              activities: ["trackDismissableElement", "trapFocus", "preventScroll", "hideContentBelow"],
              on: {
                "CONTROLLED.CLOSE": {
                  target: "closed",
                  actions: ["setFinalFocus"]
                },
                CLOSE: [
                  {
                    guard: "isOpenControlled",
                    actions: ["invokeOnClose"]
                  },
                  {
                    target: "closed",
                    actions: ["invokeOnClose", "setFinalFocus"]
                  }
                ],
                TOGGLE: [
                  {
                    guard: "isOpenControlled",
                    actions: ["invokeOnClose"]
                  },
                  {
                    target: "closed",
                    actions: ["invokeOnClose", "setFinalFocus"]
                  }
                ]
              }
            },
            closed: {
              on: {
                "CONTROLLED.OPEN": {
                  target: "open"
                },
                OPEN: [
                  {
                    guard: "isOpenControlled",
                    actions: ["invokeOnOpen"]
                  },
                  {
                    target: "open",
                    actions: ["invokeOnOpen"]
                  }
                ],
                TOGGLE: [
                  {
                    guard: "isOpenControlled",
                    actions: ["invokeOnOpen"]
                  },
                  {
                    target: "open",
                    actions: ["invokeOnOpen"]
                  }
                ]
              }
            }
          }
        },
        {
          guards: {
            isOpenControlled: (ctx2) => !!ctx2["open.controlled"]
          },
          activities: {
            trackDismissableElement(ctx2, _evt, { send }) {
              const getContentEl = () => dom.getContentEl(ctx2);
              return (0, import_dismissable.trackDismissableElement)(getContentEl, {
                defer: true,
                pointerBlocking: ctx2.modal,
                exclude: [dom.getTriggerEl(ctx2)],
                onInteractOutside(event) {
                  ctx2.onInteractOutside?.(event);
                  if (!ctx2.closeOnInteractOutside || ctx2.role === "alertdialog") {
                    event.preventDefault();
                  }
                },
                persistentElements: ctx2.persistentElements,
                onFocusOutside: ctx2.onFocusOutside,
                onPointerDownOutside: ctx2.onPointerDownOutside,
                onEscapeKeyDown(event) {
                  ctx2.onEscapeKeyDown?.(event);
                  if (!ctx2.closeOnEscape) {
                    event.preventDefault();
                  } else {
                    send({ type: "CLOSE", src: "escape-key" });
                  }
                },
                onDismiss() {
                  send({ type: "CLOSE", src: "interact-outside" });
                }
              });
            },
            preventScroll(ctx2) {
              if (!ctx2.preventScroll) return;
              return (0, import_remove_scroll.preventBodyScroll)(dom.getDoc(ctx2));
            },
            trapFocus(ctx2) {
              if (!ctx2.trapFocus || !ctx2.modal) return;
              let trap;
              const cleanup = (0, import_dom_query2.nextTick)(() => {
                const contentEl = dom.getContentEl(ctx2);
                if (!contentEl) return;
                trap = (0, import_focus_trap.createFocusTrap)(contentEl, {
                  document: dom.getDoc(ctx2),
                  escapeDeactivates: false,
                  preventScroll: true,
                  returnFocusOnDeactivate: false,
                  fallbackFocus: contentEl,
                  allowOutsideClick: true,
                  initialFocus: (0, import_dom_query2.getInitialFocus)({
                    root: contentEl,
                    getInitialEl: ctx2.initialFocusEl
                  })
                });
                try {
                  trap.activate();
                } catch {
                }
              });
              return () => {
                trap?.deactivate();
                cleanup();
              };
            },
            hideContentBelow(ctx2) {
              if (!ctx2.modal) return;
              const getElements = () => [dom.getContentEl(ctx2)];
              return (0, import_aria_hidden.ariaHidden)(getElements, { defer: true });
            }
          },
          actions: {
            checkInitialFocusEl(ctx2) {
              if (!ctx2.initialFocusEl && ctx2.role === "alertdialog") {
                ctx2.initialFocusEl = () => dom.getCloseTriggerEl(ctx2);
              }
            },
            checkRenderedElements(ctx2) {
              (0, import_dom_query2.raf)(() => {
                ctx2.renderedElements.title = !!dom.getTitleEl(ctx2);
                ctx2.renderedElements.description = !!dom.getDescriptionEl(ctx2);
              });
            },
            syncZIndex(ctx2) {
              (0, import_dom_query2.raf)(() => {
                const contentEl = dom.getContentEl(ctx2);
                if (!contentEl) return;
                const win = dom.getWin(ctx2);
                const styles = win.getComputedStyle(contentEl);
                const elems = [dom.getPositionerEl(ctx2), dom.getBackdropEl(ctx2)];
                elems.forEach((node) => {
                  node?.style.setProperty("--z-index", styles.zIndex);
                });
              });
            },
            invokeOnClose(ctx2) {
              ctx2.onOpenChange?.({ open: false });
            },
            invokeOnOpen(ctx2) {
              ctx2.onOpenChange?.({ open: true });
            },
            toggleVisibility(ctx2, evt, { send }) {
              send({ type: ctx2.open ? "CONTROLLED.OPEN" : "CONTROLLED.CLOSE", previousEvent: evt });
            },
            setFinalFocus(ctx2) {
              if (!ctx2.restoreFocus) return;
              queueMicrotask(() => {
                const el = ctx2.finalFocusEl?.() ?? dom.getTriggerEl(ctx2);
                el?.focus({ preventScroll: true });
              });
            }
          }
        }
      );
    }
    var import_types2 = require_types();
    var import_utils2 = require_utils();
    var props = (0, import_types2.createProps)()([
      "aria-label",
      "closeOnEscape",
      "closeOnInteractOutside",
      "dir",
      "finalFocusEl",
      "getRootNode",
      "getRootNode",
      "id",
      "id",
      "ids",
      "initialFocusEl",
      "modal",
      "onEscapeKeyDown",
      "onFocusOutside",
      "onInteractOutside",
      "onOpenChange",
      "onPointerDownOutside",
      "open.controlled",
      "open",
      "persistentElements",
      "preventScroll",
      "restoreFocus",
      "role",
      "trapFocus"
    ]);
    var splitProps = (0, import_utils2.createSplitProps)(props);
  }
});

// js/corex/index.ts
var corex_exports = {};
__export(corex_exports, {
  Dialog: () => dialog_default,
  Hooks: () => Hooks
});
module.exports = __toCommonJS(corex_exports);

// js/corex/hooks/dialog.ts
var dialog = __toESM(require_dialog());

// js/corex/hooks/util.ts
var import_types = __toESM(require_types());
var propMap = {
  onFocus: "onFocusin",
  onBlur: "onFocusout",
  onChange: "onInput",
  onDoubleClick: "onDblclick",
  htmlFor: "for",
  className: "class",
  defaultValue: "value",
  defaultChecked: "checked"
};
var prevAttrsMap = /* @__PURE__ */ new WeakMap();
var toStyleString = (style) => {
  return Object.entries(style).reduce((styleString, [key, value]) => {
    if (value === null || value === void 0) return styleString;
    const formattedKey = key.startsWith("--") ? key : key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
    return `${styleString}${formattedKey}:${value};`;
  }, "");
};
var normalizeProps = (0, import_types.createNormalizer)((props) => {
  return Object.entries(props).reduce((acc, [key, value]) => {
    if (value === void 0) return acc;
    key = propMap[key] || key;
    if (key === "style" && typeof value === "object") {
      acc.style = toStyleString(value);
    } else {
      acc[key.toLowerCase()] = value;
    }
    return acc;
  }, {});
});
var spreadProps = (node, attrs) => {
  const oldAttrs = prevAttrsMap.get(node) || {};
  const attrKeys = Object.keys(attrs);
  const addEvent = (event, callback) => {
    node.addEventListener(event.toLowerCase(), callback);
  };
  const removeEvent = (event, callback) => {
    node.removeEventListener(event.toLowerCase(), callback);
  };
  const onEvents = (attr) => attr.startsWith("on");
  const others = (attr) => !attr.startsWith("on");
  const setup = (attr) => addEvent(attr.substring(2), attrs[attr]);
  const teardown = (attr) => removeEvent(attr.substring(2), attrs[attr]);
  const apply = (attrName) => {
    let value = attrs[attrName];
    const oldValue = oldAttrs[attrName];
    if (value === oldValue) return;
    if (typeof value === "boolean") {
      value = value || void 0;
    }
    if (value != null) {
      if (["value", "checked", "htmlFor"].includes(attrName)) {
        node[attrName] = value;
      } else {
        node.setAttribute(attrName.toLowerCase(), value);
      }
      return;
    }
    node.removeAttribute(attrName.toLowerCase());
  };
  for (const key in oldAttrs) {
    if (attrs[key] == null) {
      node.removeAttribute(key.toLowerCase());
    }
  }
  const oldEvents = Object.keys(oldAttrs).filter(onEvents);
  for (const oldEvent of oldEvents) removeEvent(oldEvent.substring(2), oldAttrs[oldEvent]);
  attrKeys.filter(onEvents).forEach(setup);
  attrKeys.filter(others).forEach(apply);
  prevAttrsMap.set(node, attrs);
  return function cleanup() {
    attrKeys.filter(onEvents).forEach(teardown);
  };
};
var renderPart = (root, name, api) => {
  const camelizedName = name.replace(/(^|-)([a-z])/g, (_match, _prefix, letter) => letter.toUpperCase());
  const part = root.querySelector(`[data-part='${name}']`);
  const getterName = `get${camelizedName}Props`;
  if (part) spreadProps(part, api[getterName]());
};
var getOption = (el, name, validOptions) => {
  const kebabName = name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  let initial = el.dataset[kebabName];
  if (validOptions && initial !== void 0 && !validOptions.includes(initial)) {
    console.error(`Invalid '${name}' specified: '${initial}'. Expected one of '${validOptions.join("', '")}'.`);
    initial = void 0;
  }
  return initial;
};
var getBooleanOption = (el, name) => {
  return el.dataset[name] === "true" || el.dataset[name] === "";
};

// js/corex/hooks/component.ts
var Component = class {
  el;
  service;
  api;
  constructor(el, context) {
    this.el = el;
    this.service = this.initService(context);
    this.api = this.initApi();
  }
  init = () => {
    this.render();
    this.service.subscribe(() => {
      this.api = this.initApi();
      this.render();
    });
    this.service.start();
  };
  destroy = () => {
    this.service.stop();
  };
};

// js/corex/hooks/dialog.ts
var Dialog = class extends Component {
  initService(context) {
    return dialog.machine(context);
  }
  initApi() {
    return dialog.connect(this.service.state, this.service.send, normalizeProps);
  }
  render() {
    const parts = ["trigger", "backdrop", "positioner", "content", "title", "description", "close-trigger"];
    for (const part of parts) renderPart(this.el, part, this.api);
  }
};
var dialog_default = {
  mounted() {
    this.dialog = new Dialog(this.el, this.context());
    this.dialog.init();
    this.handleEvent("dialog", (event) => {
      const openState = event?.setOpen === false;
      if (typeof openState === "boolean") {
        this.dialog.api.setOpen(openState);
      }
    });
  },
  updated() {
    this.dialog.render();
  },
  beforeDestroy() {
    this.dialog.destroy();
  },
  context() {
    return {
      id: this.el.id,
      trapFocus: true,
      modal: true,
      "open.controlled": getBooleanOption(this.el, "open.controlled"),
      role: getOption(this.el, "role", ["dialog", "alertdialog"]),
      preventScroll: getBooleanOption(this.el, "preventScroll"),
      closeOnInteractOutside: getBooleanOption(this.el, "closeOnInteractOutside"),
      closeOnEscape: getBooleanOption(this.el, "closeOnEscape"),
      onOpenChange: (details) => {
        if (this.el.dataset.onOpenChange) {
          this.pushEvent(this.el.dataset.onOpenChange, details);
        }
      }
    };
  }
};

// js/corex/index.ts
var Hooks = {
  Dialog: dialog_default
};
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
/*!
* focus-trap 7.6.2
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
//# sourceMappingURL=corex.cjs.js.map
