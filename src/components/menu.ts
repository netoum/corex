import * as menu from "@zag-js/menu";
import { Direction } from "@zag-js/types";
import { Component, VanillaMachine, getNumber, getString, getBoolean, generateId, normalizeProps, renderPart, renderItem } from "../lib"
export class Menu extends Component<menu.Props, menu.Api> {
  initMachine(props: menu.Props): VanillaMachine<any> {
    return new VanillaMachine(menu.machine, props);
  }
  initApi() : menu.Api {
    return menu.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = ["trigger", "indicator", "positioner", "content", "context-trigger"];
    for (const part of parts) renderPart(this.el, part, this.api);
    const items = ["item", "item-group", "item-group-label"];
    for (const item of items) renderItem(this.el, item, this.api);
  }
}
export function initializeMenu(): void {
  document.querySelectorAll<HTMLElement>(".menu-js").forEach((rootEl) => {
    const placements = ["top", "right", "bottom", "left", "top-start", "top-end", "right-start", "right-end", "bottom-start", "bottom-end", "left-start", "left-end"] as const;
    const strategies = ["absolute", "fixed"] as const;
    const directions = ["ltr", "rtl"] as const;
    const menu = new Menu(rootEl, {
      id: generateId(rootEl, "menu"),
      "aria-label": getString(rootEl, "ariaLabel"),
      closeOnSelect: getBoolean(rootEl, "closeOnSelect"),
      composite: getBoolean(rootEl, "composite"),
      defaultHighlightedValue: getString(rootEl, "defaultHighlightedValue"),
      defaultOpen: getBoolean(rootEl, "defaultOpen"),
      dir: getString<Direction>(rootEl, "dir", directions),
      loopFocus: getBoolean(rootEl, "loopFocus"),
      typeahead: getBoolean(rootEl, "typeahead"),
      positioning: {
        hideWhenDetached: getBoolean(rootEl, "hideWhenDetached"),
        placement: getString(rootEl, "placement", placements),
        strategy: getString(rootEl, "strategy", strategies),
        flip: getBoolean(rootEl, "flip"),
        gutter: getNumber(rootEl, "gutter"),
        arrowPadding: getNumber(rootEl, "arrowPadding"),
        overflowPadding: getNumber(rootEl, "overflowPadding"),
        offset: (() => {
          const mainAxis = getNumber(rootEl, "offsetMainAxis");
          const crossAxis = getNumber(rootEl, "offsetCrossAxis");
          if (mainAxis !== undefined || crossAxis !== undefined) {
            return {
              mainAxis: mainAxis,
              crossAxis: crossAxis
            };
          }
          return undefined;
        })(),
        sameWidth: getBoolean(rootEl, "sameWidth"),
        overlap: getBoolean(rootEl, "overlap"),
        fitViewport: getBoolean(rootEl, "fitViewport"),
        slide: getBoolean(rootEl, "slide"),
      },
      onOpenChange(details) {
        const eventName = getString(rootEl, "onOpenChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onEscapeKeyDown(details) {
        const eventName = getString(rootEl, "onEscapeKeyDown");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onFocusOutside(details) {
        const eventName = getString(rootEl, "onFocusOutside");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onHighlightChange(details) {
        const eventName = getString(rootEl, "onHighlightChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onInteractOutside(details) {
        const eventName = getString(rootEl, "onInteractOutside");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onPointerDownOutside(details) {
        const eventName = getString(rootEl, "onPointerDownOutside");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      navigate(details) {
        const eventName = getString(rootEl, "navigate");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      }
    });
    menu.init();
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeMenu);
} else {
  initializeMenu();
}
