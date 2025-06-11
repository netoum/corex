import * as combobox from "@zag-js/combobox";
import { Direction } from "@zag-js/types"
import { ListCollection } from "@zag-js/collection"

import {
  Component,
  VanillaMachine,
  generateId,
  normalizeProps,
  renderPart,
  spreadProps,
  getString,
  getBoolean,
  getNumber,
  getStringList
} from "../lib";

import { createFilter } from "@zag-js/i18n-utils"


function loadJsonItems(path: string): Item[] {
  try {
    const script = document.querySelector(`script[type="application/json"][data-combobox="${path}"]`);
    if (!script) throw new Error(`No inline JSON script found for ${path}`);
    return JSON.parse(script.textContent || "[]");
  } catch (e) {
    console.error("Failed to load JSON items:", e);
    return [];
  }
}

function getDomItems(rootEl: HTMLElement): Array<{ label: string; code: string }> {
  const items: Array<{ label: string; code: string }> = [];
  rootEl.querySelectorAll('[data-part="item"]').forEach((el) => {
    const label = el.getAttribute("data-label") || el.textContent?.trim() || "";
    const code = el.getAttribute("data-code") || "";
    items.push({ label, code });
  });
  return items;
}

type Item = { label: string; code: string };

export class Combobox extends Component<combobox.Props, combobox.Api> {
  userOnInputValueChange?: combobox.Props["onInputValueChange"];
userOnOpenChange?: combobox.Props["onOpenChange"];

constructor(el: HTMLElement, props: combobox.Props) {
  super(el, {
    ...props,
    onInputValueChange: undefined,
    onOpenChange: undefined,
  });

  this.userOnInputValueChange = props.onInputValueChange;
  this.userOnOpenChange = props.onOpenChange;
}

  options: Item[] = [];
  allItems: Item[] = [];

  setItems(items: Item[]) {
    this.allItems = items;
    this.options = items;
  }

  getCollection(items: Item[]): ListCollection<Item> {
    return combobox.collection({
      items,
      itemToValue: (item) => item.code,
      itemToString: (item) => item.label,
    });
  }

  initMachine(props: combobox.Props): VanillaMachine<any> {
    const self = this;
  
    return new VanillaMachine(combobox.machine, {
      ...props,
      get collection() {
        return self.getCollection(self.options || []);
      },
      onOpenChange(...args) {
        self.options = self.allItems;
        const isJson = getString(self.el, "json") !== undefined;
        isJson ? self.renderOptions() : self.renderItems();
  
        self.userOnOpenChange?.(...args);
      },
      onInputValueChange(...args) {
        const [details] = args;
  
        if (!details.inputValue.trim()) {
          self.options = self.allItems;
        } else {
          const filter = createFilter({ sensitivity: "base", locale: "en-US" });
          const filtered = self.allItems.filter((item) =>
            filter.contains(item.label, details.inputValue)
          );
          self.options = filtered.length > 0 ? filtered : self.allItems;
        }
  
        const isJson = getString(self.el, "json") !== undefined;
        isJson ? self.renderOptions() : self.renderItems();
  
        self.userOnInputValueChange?.(...args);
      },
    });
  }
  

  initApi(): combobox.Api {
    return combobox.connect(this.machine.service, normalizeProps);
  }

  renderOptions() {
    const contentEl = this.el.querySelector('[data-part="content"]');
    if (!contentEl) return;
  
    const existingItems = Array.from(contentEl.querySelectorAll('[data-part="item"]')) as HTMLElement[];
  
    if (existingItems.length === this.options.length) {
      for (let i = 0; i < existingItems.length; i++) {
        const el = existingItems[i];
        const item = this.options[i];
  
        el.textContent = item.label;
        el.setAttribute("data-label", item.label);
        el.setAttribute("data-code", item.code);
        spreadProps(el, this.api.getItemProps({ item }));
      }
    } else {
      contentEl.innerHTML = "";
      for (const item of this.options) {
        const li = document.createElement("li");
        li.textContent = item.label;
        li.setAttribute("data-part", "item");
        li.setAttribute("data-label", item.label);
        li.setAttribute("data-code", item.code);
        spreadProps(li, this.api.getItemProps({ item }));
        contentEl.appendChild(li);
      }
    }
  }

  renderItems() {
    const contentEl = this.el.querySelector('[data-part="content"]');
    if (!contentEl) return;
  
    const allDomItems = Array.from(contentEl.querySelectorAll('[data-part="item"]')) as HTMLElement[];
  
    allDomItems.forEach((el) => {
      const code = el.getAttribute("data-code");
      const match = this.options.find((item) => item.code === code);
  
      if (match) {
        el.style.display = "";
        spreadProps(el, this.api.getItemProps({ item: match }));
      } else {
        el.style.display = "none";
      }
    });
  }

  render() {
    const parts = [
      "root",
      "label",
      "control",
      "input",
      "trigger",
      "positioner",
      "content",
      "clear-trigger",
      "item-group",
      "item-group-label",
      "item-indicator",
      "item-text",
      "list",
    ];
    
    for (const part of parts) {
      renderPart(this.el, part, this.api);
    }

    const jsonPath = getString(this.el, "json");
    if (jsonPath !== undefined) {
      this.renderOptions();
    } else {
      this.renderItems();
    }
  }
}

export function initializeCombobox(): void {
  document.querySelectorAll<HTMLElement>(".combobox-js").forEach((rootEl) => {
    let items: Item[];

    const jsonPath = getString(rootEl, "json");
    if (jsonPath !== undefined) {
      items = loadJsonItems(jsonPath);
    } else {
      items = getDomItems(rootEl);
    }
    const directions = ["ltr", "rtl"] as const;
    const placements = ["top", "right", "bottom", "left", "top-start", "top-end", "right-start", "right-end", "bottom-start", "bottom-end", "left-start", "left-end"] as const;
    const strategies = ["absolute", "fixed"] as const;
    const inputBehaviors = ["autohighlight", "autocomplete", "none"] as const;
    const selectionBehaviors = ["replace", "clear", "preserve"] as const;

    const comboboxComponent = new Combobox(rootEl, {
      id: generateId(rootEl, "combobox"),
      placeholder: getString(rootEl, "placeholder"),
      allowCustomValue: getBoolean(rootEl, "allowCustomValue"),
      autoFocus: getBoolean(rootEl, "autoFocus"),
      closeOnSelect: getBoolean(rootEl, "closeOnSelect"),
      composite: getBoolean(rootEl, "composite"),
      defaultHighlightedValue: getString(rootEl, "defaultHighlightedValue"),
      defaultInputValue: getString(rootEl, "defaultInputValue"),
      defaultOpen: getBoolean(rootEl, "defaultOpen"),
      defaultValue: getStringList(rootEl, "defaultValue"),

      dir: getString<Direction>(rootEl, "dir", directions),
      disabled: getBoolean(rootEl, "disabled"),
      disableLayer: getBoolean(rootEl, "disableLayer"),
      form: getString(rootEl, "form"),
      highlightedValue: getString(rootEl, "highlightedValue"),
      inputBehavior: getString(rootEl, "dir", inputBehaviors),
      inputValue: getString(rootEl, "inputValue"),
      invalid: getBoolean(rootEl, "invalid"),
      loopFocus: getBoolean(rootEl, "loopFocus"),
      multiple: getBoolean(rootEl, "multiple"),
      name: getString(rootEl, "name"),
      readOnly: getBoolean(rootEl, "readOnly"),
      required: getBoolean(rootEl, "required"),
      open: getBoolean(rootEl, "open"),
      openOnChange: getBoolean(rootEl, "openOnChange"),
      openOnClick: getBoolean(rootEl, "openOnClick"),
      openOnKeyPress: getBoolean(rootEl, "openOnKeyPress"),
      value: getStringList(rootEl, "value"),
      selectionBehavior: getString(rootEl, "dir", selectionBehaviors),
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
      navigate(details) {
        const eventName = getString(rootEl, "navigate");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onInputValueChange(details) {
        const eventName = getString(rootEl, "onInputValueChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onFocusOutside(event) {
        const eventName = getString(rootEl, "onFocusOutside");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: event.detail }));
        }
      },
      onHighlightChange(details) {
        const eventName = getString(rootEl, "onHighlightChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onInteractOutside(event) {
        const eventName = getString(rootEl, "onInteractOutside");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: event.detail }));
        }
      },
      onOpenChange(details) {
        const eventName = getString(rootEl, "onOpenChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onPointerDownOutside(event) {
        const eventName = getString(rootEl, "onPointerDownOutside");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: event.detail }));
        }
      },
      onSelect(details) {
        const eventName = getString(rootEl, "onSelect");
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

    comboboxComponent.setItems(items);
    comboboxComponent.options = items;
    comboboxComponent.init();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeCombobox);
} else {
  initializeCombobox();
}