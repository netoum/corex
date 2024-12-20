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
  ariaHidden: () => ariaHidden
});
module.exports = __toCommonJS(src_exports);
var import_dom_query = require("../@zag-js/dom-query");
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ariaHidden
});
//# sourceMappingURL=index.js.map