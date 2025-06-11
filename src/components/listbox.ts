import * as listbox from "@zag-js/listbox"
import { Direction, Orientation } from "@zag-js/types"
import { Component, VanillaMachine, generateId, renderList, getString, getStringList, normalizeProps, renderPart, getNumber, getBoolean } from "../lib"
interface ListboxItem {
  label: string
  value: string
}
type Item = { label: string; value: string };

function getDomItems(rootEl: HTMLElement): Array<{ label: string; value: string }> {
  const items: Array<{ label: string; value: string }> = [];
  rootEl.querySelectorAll('[data-part="item"]').forEach((el) => {
    const label = el.getAttribute("data-label") || el.textContent?.trim() || "";
    const value = el.getAttribute("data-value") || "";
    items.push({ label, value });
  });
  return items;
}

export class Listbox extends Component<listbox.Props, listbox.Api> {
  collection!: listbox.ListCollection<ListboxItem>;
  items: ListboxItem[] = []
  getCollection(items: Item[]): listbox.ListCollection<ListboxItem> {
    return listbox.collection({
      items,
      itemToValue: (item) => item.value,
      itemToString: (item) => item.label,
    });
  }
  initMachine(props: listbox.Props): VanillaMachine<any> {
    const self = this;
  
    return new VanillaMachine(listbox.machine, {
      ...props,
      get collection() {
        return self.getCollection(self.items || []);
      },
    }
    )
  }
  initApi(): listbox.Api {
    return listbox.connect(this.machine.service, normalizeProps)
  }

  render() {
    const parts = ["root", "label", "content"]
    for (const part of parts) renderPart(this.el, part, this.api)
    const itemParts = ["item", "item-text", "item-indicator", "item-group", "item-group-label"]
    for (const item of itemParts) {
      renderList(this.el, item, this.api, this.items)
    }
  }
}
export function initializeListbox(): void {
  document.querySelectorAll<HTMLElement>(".listbox-js").forEach((rootEl) => {
    const data = getDomItems(rootEl)
    const collection = getNumber(rootEl, "columnCount")
      ? listbox.gridCollection<ListboxItem>({
        items: data,
        itemToValue: (item) => item.value,
        itemToString: (item) => item.label,
        columnCount: getNumber(rootEl, "columnCount") || 5
      })
      : listbox.collection<ListboxItem>({
        items: data,
        itemToValue: (item) => item.value,
        itemToString: (item) => item.label,
      });
    const directions = ["ltr", "rtl"] as const;
    const orientations = ["horizontal", "vertical"] as const;
    const selectionModes = ["single", "multiple", "extended"] as const;
    const listboxComponent = new Listbox(rootEl, {
      id: generateId(rootEl, "listbox"),
      collection,
      defaultHighlightedValue: getString(rootEl, "defaultHighlightedValue"),
      dir: getString<Direction>(rootEl, "dir", directions),
      loopFocus: getBoolean(rootEl, "loopFocus"),
      typeahead: getBoolean(rootEl, "typeahead"),
      deselectable: getBoolean(rootEl, "deselectable"),
      defaultValue: getStringList(rootEl, "defaultValue"),
      disabled: getBoolean(rootEl, "disabled"),
      disallowSelectAll: getBoolean(rootEl, "disallowSelectAll"),
      orientation: getString<Orientation>(rootEl, "orientation", orientations),
      selectionMode: getString(rootEl, "orientation", selectionModes),
      selectOnHighlight: getBoolean(rootEl, "selectOnHighlight"),
      onSelect(details) {
        const eventName = getString(rootEl, "onSelect");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onHighlightChange(details) {
        const eventName = getString(rootEl, "onHighlightChange");
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
    })
    listboxComponent.collection = collection
    listboxComponent.items = data
    listboxComponent.init()
  })
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeListbox)
} else {
  initializeListbox()
}
