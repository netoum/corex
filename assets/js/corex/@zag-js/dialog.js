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
  anatomy: () => anatomy,
  connect: () => connect,
  machine: () => machine,
  props: () => props,
  splitProps: () => splitProps
});
module.exports = __toCommonJS(src_exports);

// src/dialog.anatomy.ts
var import_anatomy = require("../@zag-js/anatomy");
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

// src/dialog.dom.ts
var import_dom_query = require("../@zag-js/dom-query");
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

// src/dialog.connect.ts
function connect(state, send, normalize) {
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

// src/dialog.machine.ts
var import_aria_hidden = require("../@zag-js/aria-hidden");
var import_core = require("../@zag-js/core");
var import_dismissable = require("../@zag-js/dismissable");
var import_dom_query2 = require("../@zag-js/dom-query");
var import_remove_scroll = require("../@zag-js/remove-scroll");
var import_utils = require("../@zag-js/utils");
var import_focus_trap = require("../focus-trap");
function machine(userContext) {
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

// src/dialog.props.ts
var import_types = require("../@zag-js/types");
var import_utils2 = require("../@zag-js/utils");
var props = (0, import_types.createProps)()([
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  anatomy,
  connect,
  machine,
  props,
  splitProps
});
//# sourceMappingURL=index.js.map