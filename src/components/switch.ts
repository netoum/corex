import * as zagSwitch from "@zag-js/switch";
import { Direction } from "@zag-js/types";
import { Component, VanillaMachine, getString, generateId, normalizeProps, renderPart, getBoolean } from "../lib"
export class ZagSwitch extends Component<zagSwitch.Props, zagSwitch.Api> {
  initMachine(props: zagSwitch.Props): VanillaMachine<any> {
    return new VanillaMachine(zagSwitch.machine, props);
  }
  initApi() {
    return zagSwitch.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = ["root", "label", "control", "thumb", "hidden-input"];
    for (const part of parts) renderPart(this.el, part, this.api);
    document.querySelectorAll(`[data-check-switch="${this.el.id}"]`).forEach((el) => {
      el.addEventListener("click", () => {
        if (this.api.checked !== true) {
          this.api.setChecked(true);
        }
      });
    });

    document.querySelectorAll(`[data-uncheck-switch="${this.el.id}"]`).forEach((el) => {
      el.addEventListener("click", () => {
        if (this.api.checked !== false) {
          this.api.setChecked(false);
        }
      });
    });

    this.el.addEventListener("switch:set-checked", (event) => {
      const { value } = (event as CustomEvent<{ value: boolean }>).detail;
      if (this.api.checked !== value) {
        this.api.setChecked(value);
      }
    });
  }
}
export function initializezagSwitch(): void {
  document.querySelectorAll<HTMLElement>(".switch-js").forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const zagSwitch = new ZagSwitch(rootEl, {
      id: generateId(rootEl, "zagSwitch"),
      checked: getBoolean(rootEl, "checked"),
      defaultChecked: getBoolean(rootEl, "defaultChecked"),
      dir: getString<Direction>(rootEl, "dir", directions),
      disabled: getBoolean(rootEl, "disabled"),
      invalid: getBoolean(rootEl, "invalid"),
      label: getString(rootEl, "label"),
      name: getString(rootEl, "name"),
      required: getBoolean(rootEl, "required"),
      readOnly: getBoolean(rootEl, "readOnly"),
      form: getString(rootEl, "form"),
      value: getString(rootEl, "value"),
      onCheckedChange(details: any) {
        const eventName = getString(rootEl, "onCheckedChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });
    zagSwitch.init();
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializezagSwitch);
} else {
  initializezagSwitch();
}
