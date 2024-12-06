import * as dialog from "@zag-js/dialog";
import { getOption, getBooleanOption, normalizeProps, renderPart } from "./util";
import { Component } from "./component";
import { ViewHook } from "phoenix_live_view";
import type { Machine } from "@zag-js/core";

type Role = "dialog" | "alertdialog" | undefined;

class Dialog extends Component<dialog.Context, dialog.Api> {
  initService(context: dialog.Context): Machine<any, any, any> {
    // console.log(context)
    return dialog.machine(context);
  }

  initApi() {
    return dialog.connect(this.service.state, this.service.send, normalizeProps);
  }

  render() {
    const parts = ["trigger", "backdrop", "positioner", "content", "title", "description", "close-trigger"];
    for (const part of parts) renderPart(this.el, part, this.api);
  }
}

export interface DialogHook extends ViewHook {
  dialog: Dialog;
  context(): dialog.Context;
}

export default {
  mounted() {
    this.dialog = new Dialog(this.el, this.context());
    this.dialog.init();

    this.handleEvent("dialog", (event: { setOpen?: boolean }) => {
      const openState = event?.setOpen === false;
    
      if (typeof openState === "boolean") {
        this.dialog.api.setOpen(openState);
      }
    });
  },

  updated() {
    this.dialog.render();
  },

  beforeDestroy() {
    this.dialog.destroy();
  },

  context(): dialog.Context {
    return {
      id: this.el.id,
      trapFocus: true,
      modal: true,
      "open.controlled": getBooleanOption(this.el, "open.controlled"),
      role: getOption(this.el, "role", ["dialog", "alertdialog"]) as Role,
      preventScroll: getBooleanOption(this.el, "preventScroll"),
      closeOnInteractOutside: getBooleanOption(this.el, "closeOnInteractOutside"),
      closeOnEscape: getBooleanOption(this.el, "closeOnEscape"),
      onOpenChange: (details: dialog.OpenChangeDetails) => {
        if (this.el.dataset.onOpenChange) {
          this.pushEvent(this.el.dataset.onOpenChange, details);
        }
        // if (details.open === false && this.el.dataset.onClose) {
        //   try {

        //     LiveSocket.execJS(this.el , this.el.dataset.onClose);
        //   } catch (error) {
        //     console.error("Error executing LiveView JS command:", error);
        //   }
        // }
      }
    };
  },
} as DialogHook;