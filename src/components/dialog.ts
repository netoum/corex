import * as dialog from "@zag-js/dialog";
import { Direction } from "@zag-js/types";
import { Component, VanillaMachine, getString, getBoolean, generateId, normalizeProps, renderPart } from "../lib"
export class Dialog extends Component<dialog.Props, dialog.Api> {
  initMachine(props: dialog.Props): VanillaMachine<any> {
    return new VanillaMachine(dialog.machine, props);
  }
  initApi(): dialog.Api {
    return dialog.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = ["content", "title", "trigger", "backdrop", "positioner", "description", "close-trigger"];
    for (const part of parts) renderPart(this.el, part, this.api);
    document.querySelectorAll(`[data-open-dialog="${this.el.id}"]`).forEach((el) => {
      el.addEventListener("click", () => this.api.open || this.api.setOpen(true));
    });
    document.querySelectorAll(`[data-close-dialog="${this.el.id}"]`).forEach((el) => {
      el.addEventListener("click", () => this.api.open && this.api.setOpen(false));
    });
    this.el.addEventListener("dialog:set-open", (event) => {
      const { value } = (event as CustomEvent<{ value: boolean }>).detail;
      if (this.api.open !== value) this.api.setOpen(value);
    });
  }
}
export function initializeDialog(): void {
  document.querySelectorAll<HTMLElement>(".dialog-js").forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const roles = ["dialog", "alertdialog"] as const;
    const dialog = new Dialog(rootEl, {
      id: generateId(rootEl, "dialog"),
      "aria-label": getString(rootEl, "aria-label"),
      defaultOpen: getBoolean(rootEl, "loopFocus"),
      dir: getString<Direction>(rootEl, "dir", directions),
      modal: getBoolean(rootEl, "modal"),
      open: getBoolean(rootEl, "open"),
      preventScroll: getBoolean(rootEl, "preventScroll"),
      restoreFocus: getBoolean(rootEl, "restoreFocus"),
      trapFocus: getBoolean(rootEl, "trapFocus"),
      closeOnInteractOutside: getBoolean(rootEl, "closeOnInteractOutside"),
      closeOnEscape: getBoolean(rootEl, "closeOnEscape"),
      role: getString(rootEl, "dir", roles),
      onOpenChange(details: any) {
        const eventName = getString(rootEl, "onOpenChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      }
    });
    dialog.init();
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeDialog);
} else {
  initializeDialog();
}
