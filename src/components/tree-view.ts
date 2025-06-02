import * as treeView from "@zag-js/tree-view";
import { Direction } from "@zag-js/types";
import { Component, VanillaMachine, generateId, getString, getStringList, normalizeProps, renderPart, renderNode, getBoolean } from "../lib"
interface Node {
  id: string;
  name: string;
  children?: Node[];
}
function buildNodeTreeFromDOM(container: HTMLElement): Node {
  const rootEl = container.querySelector<HTMLElement>('[data-part="tree"]');
  if (!rootEl) {
    return { id: "root", name: "Root" };
  }
  function processElement(element: HTMLElement, index: number): Node | null {
    const part = element.getAttribute("data-part");
    const id = element.getAttribute("data-id") || `node-${index}`;
    const name = element.getAttribute("data-name") || element.textContent?.trim() || id;
    if (part === "branch") {
      const contentEl = element.querySelector('[data-part="branch-content"]');
      if (contentEl) {
        const childElements = Array.from(contentEl.children);
        const childNodes = childElements
          .map((childEl, childIndex) => {
            return processElement(childEl as HTMLElement, childIndex);
          })
          .filter(Boolean) as Node[];
        return {
          id,
          name,
          children: childNodes.length > 0 ? childNodes : undefined
        };
      }
      return { id, name };
    } else if (part === "item") {
      return {
        id,
        name
      };
    }
    return null;
  }
  const topElements = Array.from(rootEl.children);
  const children = topElements
    .map((el, index) => processElement(el as HTMLElement, index))
    .filter(Boolean) as Node[];
  return {
    id: getString(rootEl, "nodeRootId") || "root",
    name: getString(rootEl, "nodeRootName") || "Root",
    children
  };
}
export class TreeView extends Component<treeView.Props, treeView.Api> {
  collection!: ReturnType<typeof treeView.collection<Node>>;
  initMachine(props: treeView.Props): VanillaMachine<any> {
    return new VanillaMachine(treeView.machine, props);
  }
  initApi(): treeView.Api {
    return treeView.connect(this.machine.service, normalizeProps);
  }
  render() {
    const parts = ["root", "label", "tree"];
    for (const part of parts) renderPart(this.el, part, this.api);
    const items = [
      "item",
      "branch",
      "branch-content",
      "branch-text",
      "branch-control",
      "branch-indicator",
      "branch-indent-guide",
    ];
    for (const item of items) renderNode(this.el, item, this.api, this.collection.rootNode);
  }
}
export function initializeTreeView(): void {
  document.querySelectorAll<HTMLElement>(".tree-view-js").forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const selectionModes = ["single", "multiple"] as const;
    const rootNode = buildNodeTreeFromDOM(rootEl);
    const collection = treeView.collection<Node>({
      nodeToValue: (node: any) => node.id,
      nodeToString: (node: any) => node.name,
      rootNode
    });
    const treeViewComponent = new TreeView(rootEl, {
      id: generateId(rootEl, "treeView"),
      defaultExpandedValue: getStringList(rootEl, "defaultExpandedValue"),
      defaultSelectedValue: getStringList(rootEl, "defaultSelectedValue"),
      dir: getString<Direction>(rootEl, "dir", directions),
      expandedValue: getStringList(rootEl, "expandedValue"),
      expandOnClick: getBoolean(rootEl, "expandOnClick"),
      focusedValue: getString(rootEl, "focusedValue"),
      selectionMode: getString(rootEl, "selectionMode", selectionModes),
      selectedValue: getStringList(rootEl, "selectedValue"),
      typeahead: getBoolean(rootEl, "typeahead"),
      collection,
      onExpandedChange(details) {
        const eventName = getString(rootEl, "onExpandedChange");
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
      onSelectionChange(details) {
        const eventName = getString(rootEl, "onSelectionChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
    });
    treeViewComponent.collection = collection;
    treeViewComponent.init();
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeTreeView);
} else {
  initializeTreeView();
}