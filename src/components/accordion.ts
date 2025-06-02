import * as accordion from "@zag-js/accordion";
import { Direction, Orientation } from "@zag-js/types";
import { Component, VanillaMachine, getString, getBoolean, generateId, normalizeProps, renderPart, renderItem, getStringList } from "../lib"
export class Accordion extends Component<accordion.Props, accordion.Api> {
  initMachine(props: accordion.Props): VanillaMachine<any> {
    return new VanillaMachine(accordion.machine, props);
  }
  initApi(): accordion.Api {
    return accordion.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = ["root"];
    for (const part of parts) renderPart(this.el, part, this.api);
    const items = ["item", "item-trigger", "item-indicator", "item-content"];
    for (const item of items) renderItem(this.el, item, this.api);
    this.el.addEventListener("accordion:set-value", (event) => {
      const { value } = (event as CustomEvent<{ value: string[] }>).detail;
      const currentValue = this.api.value;
      if (JSON.stringify(currentValue) !== JSON.stringify(value)) {
        this.api.setValue(value);
      }
    });
  }
}
export function initializeAccordion(): void {
  document.querySelectorAll<HTMLElement>(".accordion-js").forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const orientations = ["horizontal", "vertical"] as const;
    const accordion = new Accordion(rootEl, {
      id: generateId(rootEl, "accordion"),
      collapsible: getBoolean(rootEl, "collapsible"),
      defaultValue: getStringList(rootEl, "defaultValue"),
      disabled: getBoolean(rootEl, "disabled"),
      multiple: getBoolean(rootEl, "multiple"),
      orientation: getString<Orientation>(rootEl, "orientation", orientations),
      dir: getString<Direction>(rootEl, "dir", directions),
      onFocusChange(details) {
        const eventName = getString(rootEl, "onFocusChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onValueChange(details) {
        const eventName = getString(rootEl, "onValueChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      }
    });
    accordion.init();
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeAccordion);
} else {
  initializeAccordion();
}