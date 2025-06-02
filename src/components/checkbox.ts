import * as checkbox from "@zag-js/checkbox";
import { Direction } from "@zag-js/types";
import { Component, VanillaMachine, getString, generateId, normalizeProps, renderPart, getBoolean } from "../lib"
export class Checkbox extends Component<checkbox.Props, checkbox.Api> {
  initMachine(props: checkbox.Props): VanillaMachine<any> {
    return new VanillaMachine(checkbox.machine, props);
  }
  initApi() {
    return checkbox.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = ["root", "label", "control", "indicator", "hidden-input"];
    for (const part of parts) renderPart(this.el, part, this.api);
    document.querySelectorAll(`[data-check-checkbox="${this.el.id}"]`).forEach((el) => {
      el.addEventListener("click", () => {
        if (this.api.checked !== true) {
          this.api.setChecked(true);
        }
      });
    });

    document.querySelectorAll(`[data-uncheck-checkbox="${this.el.id}"]`).forEach((el) => {
      el.addEventListener("click", () => {
        if (this.api.checked !== false) {
          this.api.setChecked(false);
        }
      });
    });

    this.el.addEventListener("checkbox:set-checked", (event) => {
      const { value } = (event as CustomEvent<{ value: boolean | "indeterminate" }>).detail;
      if (this.api.checked !== value) {
        this.api.setChecked(value);
      }
    });
  }
}
export function initializeCheckbox(): void {
  document.querySelectorAll<HTMLElement>(".checkbox-js").forEach((rootEl) => {
    const defaultState = getString(rootEl, "defaultChecked", ["indeterminate"]) || getBoolean(rootEl, "defaultChecked")
    const state = getString(rootEl, "checked", ["indeterminate"]) || getBoolean(rootEl, "checked")
    const directions = ["ltr", "rtl"] as const;
    const checkbox = new Checkbox(rootEl, {
      id: generateId(rootEl, "checkbox"),
      checked: state,
      defaultChecked: defaultState,
      dir: getString<Direction>(rootEl, "dir", directions),
      disabled: getBoolean(rootEl, "disabled"),
      invalid: getBoolean(rootEl, "invalid"),
      name: getString(rootEl, "name"),
      required: getBoolean(rootEl, "required"),
      readOnly: getBoolean(rootEl, "readOnly"),
      form: getString(rootEl, "form"),
      value: getString(rootEl, "value"),
      onCheckedChange(details) {
        const eventName = getString(rootEl, "onCheckedChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });
    checkbox.init();
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeCheckbox);
} else {
  initializeCheckbox();
}
