import * as clipboard from "@zag-js/clipboard";
import { Component, VanillaMachine, getString, generateId, normalizeProps, renderPart, getNumber } from "../lib"
export class Clipboard extends Component<clipboard.Props, clipboard.Api> {
  initMachine(props: clipboard.Props): VanillaMachine<any> {
    return new VanillaMachine(clipboard.machine, props);
  }
  initApi() : clipboard.Api {
    return clipboard.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = ["root", "control", "trigger", "label", "input"];
    for (const part of parts) renderPart(this.el, part, this.api);
  }
}
export function initializeClipboard(): void {
  document.querySelectorAll<HTMLElement>(".clipboard-js").forEach((rootEl) => {
    const clipboard = new Clipboard(rootEl, {
      id: generateId(rootEl, "clipboard"),
      defaultValue: getString(rootEl, "defaultValue"),
      value: getString(rootEl, "value"),
      timeout: getNumber(rootEl, "timeout"),
      onStatusChange(details) {
        const eventName = getString(rootEl, "onStatusChange");
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
    clipboard.init();
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeClipboard);
} else {
  initializeClipboard();
}
