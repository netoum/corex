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
interface PagefindResult {
  id: string;
  score: number;
  words: number[];
  data: () => Promise<PagefindResultData>;
}
interface PagefindResultData {
  url: string;
  content: string;
  word_count: number;
  filters: Record<string, any>;
  meta: {
    title: string;
    image?: string;
  };
  anchors: Array<{
    element: string;
    id: string;
    text: string;
    location: number;
  }>;
  weighted_locations: Array<{
    weight: number;
    balanced_score: number;
    location: number;
  }>;
  locations: number[];
  raw_content: string;
  raw_url: string;
  excerpt: string;
  sub_results: Array<{
    title: string;
    url: string;
    weighted_locations: Array<{
      weight: number;
      balanced_score: number;
      location: number;
    }>;
    locations: number[];
    excerpt: string;
  }>;
}
interface PagefindSearch {
  results: PagefindResult[];
  unfilteredResultCount: number;
  filters: Record<string, any>;
  totalFilters: Record<string, any>;
  timings: {
    preload: number;
    search: number;
    total: number;
  };
}
interface Pagefind {
  search: (query: string, options?: any) => Promise<PagefindSearch>;
  options: (opts: any) => Promise<void>;
  init: () => Promise<void>;
}
type SearchItem = {
  label: string;
  code: string;
  url?: string;
  excerpt?: string;
  title?: string;
};
function getDomItems(rootEl: HTMLElement): Array<{ label: string; code: string }> {
  const items: Array<{ label: string; code: string }> = [];
  rootEl.querySelectorAll('[data-part="item"]').forEach((el) => {
    const label = el.getAttribute("data-label") || el.textContent?.trim() || "";
    const code = el.getAttribute("data-code") || "";
    items.push({ label, code });
  });
  return items;
}
type Item = {
  label: string;
  code: string;
  url?: string;
  excerpt?: string;
  title?: string;
};
export class SiteSearch extends Component<combobox.Props, combobox.Api> {
  private pagefind: Pagefind | null = null;
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
  setPagefindInstance(pagefind: Pagefind) {
    this.pagefind = pagefind;
  }
  getCollection(items: SearchItem[]): ListCollection<SearchItem> {
    return combobox.collection({
      items,
      itemToValue: (item) => item.code,
      itemToString: (item) => item.label,
    });
  }
  async performPagefindSearch(query: string): Promise<SearchItem[]> {
    if (!this.pagefind || !query.trim()) {
      return this.allItems;
    }
    try {
      const searchResults = await this.pagefind.search(query);
      const searchItems: SearchItem[] = [];
      for (const result of searchResults.results.slice(0, getNumber(this.el, "maxResults") || 20)) {
        try {
          const data = await result.data();
          searchItems.push({
            label: data.meta.title || data.url,
            code: data.url,
            url: data.url,
            excerpt: data.excerpt,
            title: data.meta.title
          });
        } catch (error) {
          console.warn("Failed to load result data:", error);
        }
      }
      return searchItems;
    } catch (error) {
      console.error("Pagefind search error:", error);
      return this.allItems;
    } finally {
    }
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
        self.renderItems();
        self.userOnOpenChange?.(...args);
      },
      onInputValueChange(...args) {
        const [details] = args;
        const query = details.inputValue.trim();
        if (!query) {
          self.options = self.allItems;
          self.renderResults();
          self.userOnInputValueChange?.(...args);
          return;
        }
        self.performPagefindSearch(query).then((searchResults) => {
          self.options = searchResults;
          self.renderResults();
          self.userOnInputValueChange?.(...args);
        }).catch((error) => {
          console.error("Search error", error);
          self.options = self.allItems;
          self.renderResults();
          self.userOnInputValueChange?.(...args);
        });
        self.options = null as any;
        self.renderResults();
        self.userOnInputValueChange?.(...args);
      }
    });
  }
  initApi(): combobox.Api {
    return combobox.connect(this.machine.service, normalizeProps);
  }
  renderResults() {
    const contentEl = this.el.querySelector('[data-part="content"]');
    if (!contentEl) return;
    if (this.options === null) {
      contentEl.innerHTML = "";
      const loading = document.createElement("div");
      loading.setAttribute("data-part", "loading");
      loading.textContent = getString(this.el, "loadingText") || "Searching...";
      contentEl.appendChild(loading);
      return;
    }
    if (this.options.length === 0) {
      contentEl.innerHTML = "";
      const noResult = document.createElement("div");
      noResult.setAttribute("data-part", "no-results");
      noResult.textContent = getString(this.el, "noResults") || "No results found";
      contentEl.appendChild(noResult);
      return;
    }
    const existingItems = Array.from(contentEl.querySelectorAll('[data-part="item"]')) as HTMLElement[];
    if (existingItems.length === this.options.length) {
      for (let i = 0; i < existingItems.length; i++) {
        const el = existingItems[i];
        const item = this.options[i];
        el.textContent = item.label;
        el.setAttribute("data-label", item.label);
        el.setAttribute("data-code", item.code);
        el.setAttribute("href", item.url || "");
        const div = document.createElement("div");
        div.setAttribute("data-part", "excerpt");
        div.innerHTML = item.excerpt || "";
        el.appendChild(div);
        spreadProps(el, this.api.getItemProps({ item }));
      }
    } else {
      contentEl.innerHTML = "";
      for (const item of this.options) {
        const a = document.createElement("a");
        a.textContent = item.label;
        a.setAttribute("data-part", "item");
        a.setAttribute("data-label", item.label);
        a.setAttribute("data-code", item.code);
        a.setAttribute("href", item.url || "");
        const div = document.createElement("div");
        div.setAttribute("data-part", "excerpt");
        div.innerHTML = item.excerpt || "";
        a.appendChild(div);
        spreadProps(a, this.api.getItemProps({ item }));
        contentEl.appendChild(a);
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
    this.renderItems();
  }
}
export function initializeSiteSearch(pagefindInstance?: Pagefind): void {
  document.querySelectorAll<HTMLElement>(".site-search-js").forEach((rootEl) => {
    let items: Item[];
    items = getDomItems(rootEl);
    const directions = ["ltr", "rtl"] as const;
    const placements = ["top", "right", "bottom", "left", "top-start", "top-end", "right-start", "right-end", "bottom-start", "bottom-end", "left-start", "left-end"] as const;
    const strategies = ["absolute", "fixed"] as const;
    const inputBehaviors = ["autohighlight", "autocomplete", "none"] as const;
    const selectionBehaviors = ["replace", "clear", "preserve"] as const;
    const siteSearchComponent = new SiteSearch(rootEl, {
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
      disableLayer: true,
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
    siteSearchComponent.setItems(items);
    siteSearchComponent.options = items;
    siteSearchComponent.init();
    if (pagefindInstance) {
      siteSearchComponent.setPagefindInstance(pagefindInstance);
    }
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => initializeSiteSearch());
} else {
  initializeSiteSearch();
}