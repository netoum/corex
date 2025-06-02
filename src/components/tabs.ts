import * as tabs from "@zag-js/tabs";
import { Direction, Orientation } from "@zag-js/types";
import { Component, VanillaMachine, getString, getBoolean, generateId, normalizeProps, renderPart, renderItem } from "../lib"
export class Tabs extends Component<tabs.Props, tabs.Api> {
  initMachine(props: tabs.Props): VanillaMachine<any> {
    return new VanillaMachine(tabs.machine, props);
  }
  initApi(): tabs.Api {
    return tabs.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = ["root", "list"];
    for (const part of parts) renderPart(this.el, part, this.api);
    const items = ["trigger", "content"];
    for (const item of items) renderItem(this.el, item, this.api);
    this.el.addEventListener("tabs:set-value", (event) => {
      const { value } = (event as CustomEvent<{ value: string }>).detail;
      const currentValue = this.api.value;
      if (currentValue !== value) {
        this.api.setValue(value);
      }
    });
  }
}
export function initializeTabs(): void {
  document.querySelectorAll<HTMLElement>(".tabs-js").forEach((rootEl) => {
    const activationModes = ["manual", "automatic"] as const;
    const directions = ["ltr", "rtl"] as const;
    const orientations = ["horizontal", "vertical"] as const;
    const tabs = new Tabs(rootEl, {
      id: generateId(rootEl, "tabs"),
      value: getString(rootEl, "value"),
      defaultValue: getString(rootEl, "defaultValue"),
      loopFocus: getBoolean(rootEl, "loopFocus"),
      orientation: getString<Orientation>(rootEl, "orientation", orientations),
      dir: getString<Direction>(rootEl, "dir", directions),
      activationMode: getString(rootEl, "activationMode", activationModes),
      composite: getBoolean(rootEl, "composite"),
      deselectable: getBoolean(rootEl, "deselectable"),
      translations: {
        listLabel: getString(rootEl, "listLabelTranslation")
      },
      navigate(details) {
        const eventName = getString(rootEl, "navigate");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
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
      },
    });
    tabs.init();
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeTabs);
} else {
  initializeTabs();
}
