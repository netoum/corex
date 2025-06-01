import * as toggleGroup from "@zag-js/toggle-group";
import { Direction, Orientation } from "@zag-js/types";
import { Component, VanillaMachine, getString, getBoolean, generateId, normalizeProps, renderPart, renderItem } from "../lib"

export class Switcher extends Component<toggleGroup.Props, toggleGroup.Api> {
  initMachine(props: toggleGroup.Props): VanillaMachine<any> {
    return new VanillaMachine(toggleGroup.machine, props);
  }
  initApi() : toggleGroup.Api {
    return toggleGroup.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = ["root"];
    for (const part of parts) renderPart(this.el, part, this.api);
    const items = ["item"];
    for (const item of items) renderItem(this.el, item, this.api);

    // this.el.addEventListener("switcher:set-value", (event) => {
    //   const currentValue = this.api.value;
    //   const { value } = (event as CustomEvent<{ value: string[] }>).detail;
      
    //   if (JSON.stringify(currentValue) !== JSON.stringify(value)) {
    //     this.api.setValue(value);
    //   }
    // });
  }
}
export function initializeSwitcher(): void {
  document.querySelectorAll<HTMLElement>(".switcher-js").forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const orientations = ["horizontal", "vertical"] as const;
    const key = getString(rootEl, "key") || "";
    const storedValue = localStorage.getItem(key);
    const fallbackValue = getString(rootEl, "defaultValue") || "";
    const initialValue = storedValue || fallbackValue;
    
    if (key && initialValue) {
      document.documentElement.setAttribute(`data-${key}`, initialValue);
    }

    const switcher = new Switcher(rootEl, {
      id: generateId(rootEl, "switcher"),
      defaultValue: [initialValue], 
      deselectable: false,
      multiple: false,
      dir: getString<Direction>(rootEl, "dir", directions),
      disabled: getBoolean(rootEl, "disabled"),
      loopFocus: getBoolean(rootEl, "loopFocus"),
      orientation: getString<Orientation>(rootEl, "orientation", orientations),
      rovingFocus: getBoolean(rootEl, "rovingFocus"),
      onValueChange(details) {
        if (key) {
          localStorage.setItem(key, details.value[0]);
          document.documentElement.setAttribute(`data-${key}`, details.value[0]);
        }
    
        const eventName = getString(rootEl, "onValueChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      }
    });
    switcher.init();
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSwitcher);
} else {
  initializeSwitcher();
}
