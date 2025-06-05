import * as datePicker from "@zag-js/date-picker";
import { Direction } from "@zag-js/types";
import { Component, VanillaMachine, getString, generateId, normalizeProps, renderPart, getNumber, getStringList, spreadProps, getBoolean } from "../lib"
import { isWeekend, DateFormatter } from "@internationalized/date"
export class DatePicker extends Component<datePicker.Props, datePicker.Api> {
  initMachine(props: datePicker.Props): VanillaMachine<any> {
    return new VanillaMachine(datePicker.machine, props);
  }
  initApi() {
    return datePicker.connect(this.machine.service, normalizeProps);
  }
  render() {
    const dayViewTriggerContent = this.api.visibleRangeText.start;
    const dayViewTriggerEl = this.el.querySelector('.date-picker__day-view [data-part="view-trigger"]');
    if (dayViewTriggerEl) dayViewTriggerEl.textContent = dayViewTriggerContent;
   
    const monthViewTriggerContent = this.api.visibleRange.start.year.toString();
    const monthViewTriggerEl = this.el.querySelector('.date-picker__month-view [data-part="view-trigger"]');
    if (monthViewTriggerEl) monthViewTriggerEl.textContent = monthViewTriggerContent;
   
    const yearViewTriggerContent = `${this.api.getDecade().start} - ${this.api.getDecade().end}`;
    const yearViewTriggerEl = this.el.querySelector('.date-picker__year-view [data-part="view-trigger"]');
    if (yearViewTriggerEl) yearViewTriggerEl.textContent = yearViewTriggerContent;

    const parts = [
      "control",
      "input",
      "trigger",
      "positioner",
      "content",
      "clear-trigger",
      "label",
      "month-select",
      "preset-trigger",
      "range-text",
      "root",
      "view",
      "year-select"
    ];
    for (const part of parts) {
      renderPart(this.el, part, this.api);
    }
    
       
    this.renderDayTableHeader();
    this.renderDayTableBody();
    const dayItems = [
      { name: "view-control", view: "year" },
      { name: "view-trigger", view: null },
      { name: "next-trigger", view: null },
      { name: "prev-trigger", view: null },
      { name: "table", view: "day" },
      { name: "table-header", view: "day" },
      { name: "table-body", view: "day" },
    ];
    for (const item of dayItems) {
      this.renderDayView(item.name, item.view);
    }
    const monthItems = [
      { name: "view-control", view: "month" },
      { name: "view-trigger", view: "month" },
      { name: "next-trigger", view: "month" },
      { name: "prev-trigger", view: "month" },
      { name: "table", view: "month", columns: 4 },
      { name: "table-body", view: "month" },
    ];
    for (const item of monthItems) {
      this.renderMonthView(item.name, item.view, item.columns ?? null);
    }
    this.renderMonthTableBody();
    const yearItems = [
      { name: "view-control", view: "month" },
      { name: "view-trigger", view: "month" },
      { name: "next-trigger", view: "month" },
      { name: "prev-trigger", view: "month" },
      { name: "table", view: "month", columns: 4 },
      { name: "table-body", view: "month" },
    ];
    for (const item of yearItems) {
      this.renderYearView(item.name, item.view, item.columns ?? null);
    }
    this.renderYearTableBody();
    this.updateViewVisibility();
  }


  private renderDayView(itemName: string, view: string | null) {
    const elements = this.el.querySelectorAll('.date-picker__day-view [data-part="' + itemName + '"]');
    elements.forEach((element) => {
      let props;
      switch (itemName) {
        case "view-control": {
          props = view ? this.api.getViewControlProps({ view } as any) : null;
          break;
        }
        case "view-trigger": {
          props = this.api.getViewTriggerProps();
          break;
        }
        case "next-trigger": {
          props = this.api.getNextTriggerProps();
          break;
        }
        case "prev-trigger": {
          props = this.api.getPrevTriggerProps();
          break;
        }
        case "table": {
          props = view ? this.api.getTableProps({ view } as any) : null;
          break;
        }
        case "table-header": {
          props = view ? this.api.getTableHeaderProps({ view } as any) : null;
          break;
        }
        case "table-body": {
          props = view ? this.api.getTableBodyProps({ view } as any) : null;
          break;
        }
        default: {
          const methodName = `get${this.toCamelCase(itemName)}Props` as keyof typeof this.api;
          const method = this.api[methodName];
          if (typeof method === 'function') {
            props = view ? (method as any)({ view }) : (method as any)();
          }
          break;
        }
      }
      if (props) {
        spreadProps(element as HTMLElement, props);
      }
    });  
  }


  private renderMonthView(itemName: string, view: string | null, columns: number | null) {
    const elements = this.el.querySelectorAll('.date-picker__month-view [data-part="' + itemName + '"]');
    elements.forEach((element) => {
      let props;
      switch (itemName) {
        case "view-control": {
          props = view ? this.api.getViewControlProps({ view } as any) : null;
          break;
        }
        case "view-trigger": {
          props = view ? this.api.getViewTriggerProps({ view } as any) : null;
          break;
        }
        case "next-trigger": {
          props = view ? this.api.getNextTriggerProps({ view } as any) : null;
          break;
        }
        case "prev-trigger": {
          props = view ? this.api.getPrevTriggerProps({ view } as any) : null;
          break;
        }
        case "table": {
          props = view ? this.api.getTableProps({ view, columns } as any) : null;
          break;
        }
        case "table-body": {
          props = view ? this.api.getTableBodyProps({ view, columns } as any) : null;
          break;
        }
        default: {
          const methodName = `get${this.toCamelCase(itemName)}Props` as keyof typeof this.api;
          const method = this.api[methodName];
          if (typeof method === 'function') {
            props = view ? (method as any)({ view }) : (method as any)();
          }
          break;
        }
      }
      if (props) {
        spreadProps(element as HTMLElement, props);
      }
    });
  }

  private renderYearView(itemName: string, view: string | null, columns: number | null) {
    const elements = this.el.querySelectorAll('.date-picker__year-view [data-part="' + itemName + '"]');
    elements.forEach((element) => {
      let props;
      switch (itemName) {
        case "view-control": {
          props = view ? this.api.getViewControlProps({ view } as any) : null;
          break;
        }
        case "view-trigger": {
          props = view ? this.api.getViewTriggerProps({ view } as any) : null;
          break;
        }
        case "next-trigger": {
          props = view ? this.api.getNextTriggerProps({ view } as any) : null;
          break;
        }
        case "prev-trigger": {
          props = view ? this.api.getPrevTriggerProps({ view } as any) : null;
          break;
        }
        case "table": {
          props = view ? this.api.getTableProps({ view, columns } as any) : null;
          break;
        }
        case "table-body": {
          props = view ? this.api.getTableBodyProps({ view, columns } as any) : null;
          break;
        }
        default: {
          const methodName = `get${this.toCamelCase(itemName)}Props` as keyof typeof this.api;
          const method = this.api[methodName];
          if (typeof method === 'function') {
            props = view ? (method as any)({ view }) : (method as any)();
          }
          break;
        }
      }
      if (props) {
        spreadProps(element as HTMLElement, props);
      }
    });
  }
  
  private updateViewVisibility() {
    const dayViewElements = this.el.querySelectorAll('.date-picker__day-view');
    dayViewElements.forEach((el) => {
      const element = el as HTMLElement;
      if (this.api.view === "day") {
        element.style.display = "";
        element.removeAttribute("hidden");
      } else {
        element.style.display = "none";
        element.setAttribute("hidden", "true");
      }
    });
    const monthViewElements = this.el.querySelectorAll('.date-picker__month-view');
    monthViewElements.forEach((el) => {
      const element = el as HTMLElement;
      if (this.api.view === "month") {
        element.style.display = "";
        element.removeAttribute("hidden");
      } else {
        element.style.display = "none";
        element.setAttribute("hidden", "true");
      }
    });
    const yearViewElements = this.el.querySelectorAll('.date-picker__year-view');
    yearViewElements.forEach((el) => {
      const element = el as HTMLElement;
      if (this.api.view === "year") {
        element.style.display = "";
        element.removeAttribute("hidden");
      } else {
        element.style.display = "none";
        element.setAttribute("hidden", "true");
      }
    });
  }

  private toCamelCase(str: string): string {
    return str.replace(/(^|-)([a-z])/g, (prefix, letter) => {
      return prefix === "" ? letter.toUpperCase() : letter.toUpperCase();
    });
  }
  private renderDayTableHeader() {
    const tableHeader = this.el.querySelector('.date-picker__day-view [data-part="table-header"]');
    if (!tableHeader || !this.api.weekDays) return;
    tableHeader.innerHTML = "";
    const tr = document.createElement("tr");
    const tableRowProps = this.api.getTableRowProps({ view: "day" });
    spreadProps(tr, tableRowProps);
    this.api.weekDays.forEach((day, index) => {
      const th = document.createElement("th");
      th.scope = "col";
      th.setAttribute("key", index.toString());
      th.setAttribute("aria-label", day.long);
      th.textContent = day.narrow;
      tr.appendChild(th);
    });
    tableHeader.appendChild(tr);
  }

  private renderDayTableBody() {
    const tableBody = this.el.querySelector('.date-picker__day-view [data-part="table-body"]');
    if (!tableBody || !this.api.weeks) return;
    tableBody.innerHTML = "";
    this.api.weeks.forEach((week, weekIndex) => {
      const tr = document.createElement("tr");
      tr.setAttribute("key", weekIndex.toString());
      const tableRowProps = this.api.getTableRowProps({ view: "day" });
      spreadProps(tr, tableRowProps);
      week.forEach((value, dayIndex) => {
        const td = document.createElement("td");
        td.setAttribute("key", dayIndex.toString());
        const cellProps = this.api.getDayTableCellProps({ value });
        spreadProps(td, cellProps);
        const div = document.createElement("div");
        div.textContent = value.day.toString();
        const triggerProps = this.api.getDayTableCellTriggerProps({ value });
        spreadProps(div, triggerProps);
        td.appendChild(div);
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    });
  }
  private renderMonthTableBody() {
    const tableBody = this.el.querySelector('.date-picker__month-view [data-part="table-body"]');
    if (!tableBody) return;
    tableBody.innerHTML = "";
    this.api.getMonthsGrid({ columns: 4, format: "short" }).forEach((months: any, row: any) => {
      const tr = document.createElement("tr");
      tr.setAttribute("key", row);
      const tableRowProps = this.api.getTableRowProps({ view: "month" });
      spreadProps(tr, tableRowProps);
      months.forEach((month: any, monthIndex: any) => {
        const td = document.createElement("td");
        td.setAttribute("key", monthIndex.toString());
        const cellProps = this.api.getMonthTableCellProps({ value: month.value });
        spreadProps(td, cellProps);
        const div = document.createElement("div");
        div.textContent = month.label.toString();
        const triggerProps = this.api.getMonthTableCellTriggerProps({ value: month.value });
        spreadProps(div, triggerProps);
        td.appendChild(div);
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    });
  }
  private renderYearTableBody() {
    const tableBody = this.el.querySelector('.date-picker__year-view [data-part="table-body"]');
    if (!tableBody) return;
    tableBody.innerHTML = "";
    this.api.getYearsGrid({ columns: 4 }).forEach((years: any, row: any) => {
      const tr = document.createElement("tr");
      tr.setAttribute("key", row);
      const tableRowProps = this.api.getTableRowProps({ view: "year" });
      spreadProps(tr, tableRowProps);
      years.forEach((year: any, yearIndex: any) => {
        const td = document.createElement("td");
        td.setAttribute("key", yearIndex.toString());
        const cellProps = this.api.getYearTableCellProps({ value: year.value, columns: 4 });
        spreadProps(td, cellProps);
        const div = document.createElement("div");
        div.textContent = year.label.toString();
        const triggerProps = this.api.getYearTableCellTriggerProps({ value: year.value, columns: 4 });
        spreadProps(div, triggerProps);
        td.appendChild(div);
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    });
  }
}
export function initializeDatePicker(): void {
  document.querySelectorAll<HTMLElement>(".date-picker-js").forEach((rootEl) => {
    const directions = ["ltr", "rtl"] as const;
    const selectionModes = ["single", "multiple", "range"] as const;
    const views = ["day", "month", "year"] as const;
    const formats = ["short", "medium", "long", "full"] as const;
    const placements = ["top", "right", "bottom", "left", "top-start", "top-end", "right-start", "right-end", "bottom-start", "bottom-end", "left-start", "left-end"] as const;
    const strategies = ["absolute", "fixed"] as const;
    const defaultValueStrings = getStringList(rootEl, "defaultValue");
    const valueStrings = getStringList(rootEl, "value");
    const defaultFocusedValueStrings = getString(rootEl, "defaultFocusedValue");
    const focusedValueStrings = getString(rootEl, "focusedValue");
    const datePickerComponent = new DatePicker(rootEl, {
      id: generateId(rootEl, "datePicker"),
      locale: getString(rootEl, "locale"),
      dir: getString<Direction>(rootEl, "dir", directions),
      defaultOpen: getBoolean(rootEl, "defaultOpen"),
      closeOnSelect: getBoolean(rootEl, "closeOnSelect"),
      placeholder: getString(rootEl, "placeholder"),
      selectionMode: getString(rootEl, "selectionMode", selectionModes),
      defaultValue: defaultValueStrings
        ? defaultValueStrings.map(
          (dateStr) => datePicker.parse(dateStr) as datePicker.DateValue
        )
        : undefined,
      defaultFocusedValue: defaultFocusedValueStrings
        ? (datePicker.parse(defaultFocusedValueStrings) as datePicker.DateValue)
        : undefined,
      defaultView: getString(rootEl, "defaultView", views),
      minView: getString(rootEl, "minView", views),
      maxView: getString(rootEl, "maxView", views),
      disabled: getBoolean(rootEl, "disabled"),
      fixedWeeks: getBoolean(rootEl, "fixedWeeks"),
      focusedValue: focusedValueStrings
        ? (datePicker.parse(focusedValueStrings) as datePicker.DateValue)
        : undefined,
      format: getString(rootEl, "format", formats)
        ? (date, localeDetails) => {
          const jsDate = date.toDate(localeDetails.timeZone);
          return new DateFormatter(localeDetails.locale, {
            dateStyle: getString(rootEl, "format", formats) as "short" | "medium" | "long" | "full"
          }).format(jsDate);
        }
        : undefined,
      max: getString(rootEl, "max") ? datePicker.parse(getString(rootEl, "max")!) : undefined,
      min: getString(rootEl, "min") ? datePicker.parse(getString(rootEl, "min")!) : undefined,
      name: getString(rootEl, "name"),
      open: getBoolean(rootEl, "open"),
      numOfMonths: getNumber(rootEl, "numOfMonths"),
      outsideDaySelectable: getBoolean(rootEl, "outsideDaySelectable"),
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
      readOnly: getBoolean(rootEl, "readOnly"),
      startOfWeek: getNumber(rootEl, "startOfWeek"),
      timeZone: getString(rootEl, "timeZone"),
      value: valueStrings
        ? valueStrings.map(
          (dateStr) => datePicker.parse(dateStr) as datePicker.DateValue
        )
        : undefined,
      view: getString(rootEl, "view", views),
      onOpenChange(details) {
        const eventName = getString(rootEl, "onOpenChange");
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
      onValueChange(details) {
        const eventName = getString(rootEl, "onValueChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      onViewChange(details) {
        datePickerComponent.render();
        const eventName = getString(rootEl, "onViewChange");
        if (eventName) {
          rootEl.dispatchEvent(new CustomEvent(eventName, { detail: details }));
        }
      },
      isDateUnavailable: (date, locale) => {
        if (getBoolean(rootEl, "noWeekend")) {
          return isWeekend(date, locale)
        } else {
          return false
        }
      }
    });
    datePickerComponent.init();
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeDatePicker);
} else {
  initializeDatePicker();
}