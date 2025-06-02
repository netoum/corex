import * as toggleGroup from "@zag-js/toggle-group";
import { Direction, Orientation } from "@zag-js/types";
import { Component, VanillaMachine, getString, getStringList, getBoolean, generateId, normalizeProps, renderPart, renderItem } from "../lib"
export class ToggleGroup extends Component<toggleGroup.Props, toggleGroup.Api> {
  initMachine(props: toggleGroup.Props): VanillaMachine<any> {
    return new VanillaMachine(toggleGroup.machine, props);
  }
  initApi(): toggleGroup.Api {
    return toggleGroup.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = ["root"];
    for (const part of parts) renderPart(this.el, part, this.api);
    const items = ["item"];
    for (const item of items) renderItem(this.el, item, this.api);

    this.el.addEventListener("toggle-group:set-value", (event) => {
      const { value } = (event as CustomEvent<{ value: string[] }>).detail;
      const currentValue = this.api.value;
      if (JSON.stringify(currentValue) !== JSON.stringify(value)) {
        this.api.setValue(value);
      }
    });
  }
}
export function initializeToggleGroup(): void {
  document.querySelectorAll<HTMLElement>(".toggle-group-js").forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const orientations = ["horizontal", "vertical"] as const;
    const toggleGroup = new ToggleGroup(rootEl, {
      id: generateId(rootEl, "toggleGroup"),
      defaultValue: getStringList(rootEl, "defaultValue"),
      loopFocus: getBoolean(rootEl, "loopFocus"),
      orientation: getString<Orientation>(rootEl, "orientation", orientations),
      dir: getString<Direction>(rootEl, "dir", directions),
      disabled: getBoolean(rootEl, "disabled"),
      rovingFocus: getBoolean(rootEl, "rovingFocus"),
      multiple: getBoolean(rootEl, "multiple"),
      deselectable: getBoolean(rootEl, "deselectable"),
      onValueChange(details) {
        const eventName = getString(rootEl, "onValueChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });
    toggleGroup.init();
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeToggleGroup);
} else {
  initializeToggleGroup();
}
