import * as collapsible from "@zag-js/collapsible";
import { Component, VanillaMachine, getString, generateId, normalizeProps, renderPart, getBoolean } from "../lib"
export class Collapsible extends Component<collapsible.Props, collapsible.Api> {
  initMachine(props: collapsible.Props): VanillaMachine<any> {
    return new VanillaMachine(collapsible.machine, props);
  }
  initApi() {
    return collapsible.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = ["root", "trigger", "content", "indicator"];
    for (const part of parts) renderPart(this.el, part, this.api);
    document.querySelectorAll(`[data-open-collapsible="${this.el.id}"]`).forEach((el) => {
      el.addEventListener("click", () => this.api.open || this.api.setOpen(true));
    });
    document.querySelectorAll(`[data-close-collapsible="${this.el.id}"]`).forEach((el) => {
      el.addEventListener("click", () => this.api.open && this.api.setOpen(false));
    });
    this.el.addEventListener("collapsible:set-open", (event) => {
      const { value } = (event as CustomEvent<{ value: boolean }>).detail;
      if (this.api.open !== value) this.api.setOpen(value);
    });
  }
}
export function initializeCollapsible(): void {
  document.querySelectorAll<HTMLElement>(".collapsible-js").forEach((rootEl) => {
    const collapsible = new Collapsible(rootEl, {
      id: generateId(rootEl, "collapsible"),
      defaultOpen: getBoolean(rootEl, "defaultOpen"),
      open: getBoolean(rootEl, "open"),
      disabled: getBoolean(rootEl, "disabled"),
      onOpenChange(details) {
        const eventName = getString(rootEl, "onOpenChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onExitComplete() {
        const eventName = getString(rootEl, "onExitComplete");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: "onExitComplete" }));
        }
      },
    });
    collapsible.init();
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeCollapsible);
} else {
  initializeCollapsible();
}
