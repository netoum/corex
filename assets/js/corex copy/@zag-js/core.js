"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Machine: () => Machine,
  choose: () => choose,
  createMachine: () => createMachine,
  deepMerge: () => deepMerge,
  guards: () => guards,
  isMachine: () => isMachine,
  mergeProps: () => mergeProps,
  proxy: () => import_store3.proxy,
  ref: () => import_store3.ref,
  snapshot: () => import_store3.snapshot,
  subscribe: () => import_store3.subscribe
});
module.exports = __toCommonJS(src_exports);
var import_store3 = require("../@zag-js/store");

// ../utilities/core/src/array.ts
function clear(v) {
  while (v.length > 0) v.pop();
  return v;
}

// ../utilities/core/src/functions.ts
var runIfFn = (v, ...a) => {
  const res = typeof v === "function" ? v(...a) : v;
  return res ?? void 0;
};
var cast = (v) => v;
var noop = () => {
};
var callAll = (...fns) => (...a) => {
  fns.forEach(function(fn) {
    fn?.(...a);
  });
};
var uuid = /* @__PURE__ */ (() => {
  let id = 0;
  return () => {
    id++;
    return id.toString(36);
  };
})();

// ../utilities/core/src/guard.ts
var isDev = () => process.env.NODE_ENV !== "production";
var isArray = (v) => Array.isArray(v);
var isObject = (v) => !(v == null || typeof v !== "object" || isArray(v));
var isNumber = (v) => typeof v === "number" && !Number.isNaN(v);
var isString = (v) => typeof v === "string";
var isFunction = (v) => typeof v === "function";
var hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

// ../utilities/core/src/object.ts
function compact(obj) {
  if (!isPlainObject(obj) || obj === void 0) {
    return obj;
  }
  const keys = Reflect.ownKeys(obj).filter((key) => typeof key === "string");
  const filtered = {};
  for (const key of keys) {
    const value = obj[key];
    if (value !== void 0) {
      filtered[key] = compact(value);
    }
  }
  return filtered;
}
var isPlainObject = (value) => {
  return value && typeof value === "object" && value.constructor === Object;
};

// ../utilities/core/src/warning.ts
function warn(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && process.env.NODE_ENV !== "production") {
    console.warn(m);
  }
}
function invariant(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && process.env.NODE_ENV !== "production") {
    throw new Error(m);
  }
}

// src/deep-merge.ts
function deepMerge(source, ...objects) {
  for (const obj of objects) {
    const target = compact(obj);
    for (const key in target) {
      if (isObject(obj[key])) {
        if (!source[key]) {
          source[key] = {};
        }
        deepMerge(source[key], obj[key]);
      } else {
        source[key] = obj[key];
      }
    }
  }
  return source;
}

// src/utils.ts
var import_full = require("../klona");
function structuredClone(v) {
  return (0, import_full.klona)(v);
}
function toEvent(event) {
  const obj = isString(event) ? { type: event } : event;
  return obj;
}
function toArray(value) {
  if (!value) return [];
  return isArray(value) ? value.slice() : [value];
}
function isGuardHelper(value) {
  return isObject(value) && value.predicate != null;
}

// src/guard-utils.ts
var Truthy = () => true;
function exec(guardMap, ctx, event, meta) {
  return (guard) => {
    if (isString(guard)) {
      return !!guardMap[guard]?.(ctx, event, meta);
    }
    if (isFunction(guard)) {
      return guard(ctx, event, meta);
    }
    return guard.predicate(guardMap)(ctx, event, meta);
  };
}
function or(...conditions) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => conditions.map(exec(guardMap, ctx, event, meta)).some(Boolean)
  };
}
function and(...conditions) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => conditions.map(exec(guardMap, ctx, event, meta)).every(Boolean)
  };
}
function not(condition) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => {
      return !exec(guardMap, ctx, event, meta)(condition);
    }
  };
}
function stateIn(...values) {
  return (_ctx, _evt, meta) => meta.state.matches(...values);
}
var guards = { or, and, not, stateIn };
function choose(actions) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => actions.find((def) => {
      const guard = def.guard ?? Truthy;
      return exec(guardMap, ctx, event, meta)(guard);
    })?.actions
  };
}
function determineGuardFn(guard, guardMap) {
  guard = guard ?? Truthy;
  return (context, event, meta) => {
    if (isString(guard)) {
      const value = guardMap[guard];
      return isFunction(value) ? value(context, event, meta) : value;
    }
    if (isGuardHelper(guard)) {
      return guard.predicate(guardMap)(context, event, meta);
    }
    return guard?.(context, event, meta);
  };
}
function determineActionsFn(values, guardMap) {
  return (context, event, meta) => {
    if (isGuardHelper(values)) {
      return values.predicate(guardMap)(context, event, meta);
    }
    return values;
  };
}

// src/machine.ts
var import_store2 = require("../@zag-js/store");

// src/create-proxy.ts
var import_store = require("../@zag-js/store");
function createProxy(config) {
  const computedContext = config.computed ?? cast({});
  const initialContext = config.context ?? cast({});
  const initialTags = config.initial ? config.states?.[config.initial]?.tags : [];
  const state = (0, import_store.proxy)({
    value: config.initial ?? "",
    previousValue: "",
    event: cast({}),
    previousEvent: cast({}),
    context: (0, import_store.proxyWithComputed)(initialContext, computedContext),
    done: false,
    tags: initialTags ?? [],
    hasTag(tag) {
      return this.tags.includes(tag);
    },
    matches(...value) {
      return value.includes(this.value);
    },
    can(event) {
      return cast(this).nextEvents.includes(event);
    },
    get nextEvents() {
      const stateEvents = config.states?.[this.value]?.["on"] ?? {};
      const globalEvents = config?.on ?? {};
      return Object.keys({ ...stateEvents, ...globalEvents });
    },
    get changed() {
      if (this.event.value === "machine.init" /* Init */ || !this.previousValue) return false;
      return this.value !== this.previousValue;
    }
  });
  return cast(state);
}

// src/delay-utils.ts
function determineDelayFn(delay, delaysMap) {
  return (context, event) => {
    if (isNumber(delay)) return delay;
    if (isFunction(delay)) {
      return delay(context, event);
    }
    if (isString(delay)) {
      const value = Number.parseFloat(delay);
      if (!Number.isNaN(value)) {
        return value;
      }
      if (delaysMap) {
        const valueOrFn = delaysMap?.[delay];
        invariant(
          valueOrFn == null,
          `[@zag-js/core > determine-delay] Cannot determine delay for \`${delay}\`. It doesn't exist in \`options.delays\``
        );
        return isFunction(valueOrFn) ? valueOrFn(context, event) : valueOrFn;
      }
    }
  };
}

// src/transition-utils.ts
function toTarget(target) {
  return isString(target) ? { target } : target;
}
function determineTransitionFn(transitions, guardMap) {
  return (context, event, meta) => {
    return toArray(transitions).map(toTarget).find((transition) => {
      const determineGuard = determineGuardFn(transition.guard, guardMap);
      const guard = determineGuard(context, event, meta);
      return guard ?? transition.target ?? transition.actions;
    });
  };
}

// src/machine.ts
var Machine = class {
  // Let's get started!
  constructor(config, options) {
    __publicField(this, "status", "Not Started" /* NotStarted */);
    __publicField(this, "state");
    __publicField(this, "initialState");
    __publicField(this, "initialContext");
    __publicField(this, "id");
    __publicField(this, "type", "machine" /* Machine */);
    // Cleanup function map (per state)
    __publicField(this, "activityEvents", /* @__PURE__ */ new Map());
    __publicField(this, "delayedEvents", /* @__PURE__ */ new Map());
    // state update listeners the user can opt-in for
    __publicField(this, "stateListeners", /* @__PURE__ */ new Set());
    __publicField(this, "doneListeners", /* @__PURE__ */ new Set());
    __publicField(this, "contextWatchers", /* @__PURE__ */ new Set());
    // Cleanup functions (for `subscribe`)
    __publicField(this, "removeStateListener", noop);
    // For Parent <==> Spawned Actor relationship
    __publicField(this, "parent");
    __publicField(this, "children", /* @__PURE__ */ new Map());
    // A map of guard, action, delay implementations
    __publicField(this, "guardMap");
    __publicField(this, "actionMap");
    __publicField(this, "delayMap");
    __publicField(this, "activityMap");
    __publicField(this, "sync");
    __publicField(this, "options");
    __publicField(this, "config");
    __publicField(this, "_created", () => {
      const event = toEvent("machine.created" /* Created */);
      this.executeActions(this.config?.created, event);
    });
    // Starts the interpreted machine.
    __publicField(this, "start", (init) => {
      this.state.value = "";
      this.state.tags = [];
      if (this.status === "Running" /* Running */) {
        return this;
      }
      this.status = "Running" /* Running */;
      this.removeStateListener = (0, import_store2.subscribe)(
        this.state,
        () => {
          this.stateListeners.forEach((listener) => {
            listener(this.stateSnapshot);
          });
        },
        this.sync
      );
      this.setupContextWatchers();
      this.executeActivities(toEvent("machine.start" /* Start */), toArray(this.config.activities), "machine.start" /* Start */);
      this.executeActions(this.config.entry, toEvent("machine.start" /* Start */));
      const event = toEvent("machine.init" /* Init */);
      const target = isObject(init) ? init.value : init;
      const context = isObject(init) ? init.context : void 0;
      if (context) {
        this.setContext(context);
      }
      const transition = {
        target: target ?? this.config.initial
      };
      const next = this.getNextStateInfo(transition, event);
      this.initialState = next;
      this.performStateChangeEffects(this.state.value, next, event);
      return this;
    });
    __publicField(this, "setupContextWatchers", () => {
      const { watch } = this.config;
      if (!watch) return;
      let prev = (0, import_store2.snapshot)(this.state.context);
      const cleanup = (0, import_store2.subscribe)(this.state.context, () => {
        const next = (0, import_store2.snapshot)(this.state.context);
        for (const [key, fn] of Object.entries(watch)) {
          const isEqual = this.options.compareFns?.[key] ?? Object.is;
          if (isEqual(prev[key], next[key])) continue;
          this.executeActions(fn, this.state.event);
        }
        prev = next;
      });
      this.contextWatchers.add(cleanup);
    });
    // Stops the interpreted machine
    __publicField(this, "stop", () => {
      if (this.status === "Stopped" /* Stopped */) return;
      this.performExitEffects(this.state.value, toEvent("machine.stop" /* Stop */));
      this.executeActions(this.config.exit, toEvent("machine.stop" /* Stop */));
      this.setState("");
      this.setEvent("machine.stop" /* Stop */);
      this.stopStateListeners();
      this.stopChildren();
      this.stopActivities();
      this.stopDelayedEvents();
      this.stopContextWatchers();
      this.status = "Stopped" /* Stopped */;
      return this;
    });
    __publicField(this, "stopStateListeners", () => {
      this.removeStateListener();
      this.stateListeners.clear();
    });
    __publicField(this, "stopContextWatchers", () => {
      this.contextWatchers.forEach((fn) => fn());
      this.contextWatchers.clear();
    });
    __publicField(this, "stopDelayedEvents", () => {
      this.delayedEvents.forEach((state) => {
        state.forEach((stop) => stop());
      });
      this.delayedEvents.clear();
    });
    // Cleanup running activities (e.g `setInterval`, invoked callbacks, promises)
    __publicField(this, "stopActivities", (state) => {
      if (state) {
        this.activityEvents.get(state)?.forEach((stop) => stop());
        this.activityEvents.get(state)?.clear();
        this.activityEvents.delete(state);
      } else {
        this.activityEvents.forEach((state2) => {
          state2.forEach((stop) => stop());
          state2.clear();
        });
        this.activityEvents.clear();
      }
    });
    /**
     * Function to send event to spawned child machine or actor
     */
    __publicField(this, "sendChild", (evt, to) => {
      const event = toEvent(evt);
      const id = runIfFn(to, this.contextSnapshot);
      const child = this.children.get(id);
      if (!child) {
        invariant(`[@zag-js/core] Cannot send '${event.type}' event to unknown child`);
      }
      child.send(event);
    });
    /**
     * Function to stop a running child machine or actor
     */
    __publicField(this, "stopChild", (id) => {
      if (!this.children.has(id)) {
        invariant(`[@zag-js/core > stop-child] Cannot stop unknown child ${id}`);
      }
      this.children.get(id).stop();
      this.children.delete(id);
    });
    __publicField(this, "removeChild", (id) => {
      this.children.delete(id);
    });
    // Stop and delete spawned actors
    __publicField(this, "stopChildren", () => {
      this.children.forEach((child) => child.stop());
      this.children.clear();
    });
    __publicField(this, "setParent", (parent) => {
      this.parent = parent;
    });
    __publicField(this, "spawn", (src, id) => {
      const actor = runIfFn(src);
      if (id) actor.id = id;
      actor.type = "machine.actor" /* Actor */;
      actor.setParent(this);
      this.children.set(actor.id, cast(actor));
      actor.onDone(() => {
        this.removeChild(actor.id);
      }).start();
      return cast((0, import_store2.ref)(actor));
    });
    __publicField(this, "stopActivity", (key) => {
      if (!this.state.value) return;
      const cleanups = this.activityEvents.get(this.state.value);
      cleanups?.get(key)?.();
      cleanups?.delete(key);
    });
    __publicField(this, "addActivityCleanup", (state, key, cleanup) => {
      if (!state) return;
      if (!this.activityEvents.has(state)) {
        this.activityEvents.set(state, /* @__PURE__ */ new Map([[key, cleanup]]));
      } else {
        this.activityEvents.get(state)?.set(key, cleanup);
      }
    });
    __publicField(this, "setState", (target) => {
      this.state.previousValue = this.state.value;
      this.state.value = target;
      const stateNode = this.getStateNode(target);
      if (target == null) {
        clear(this.state.tags);
      } else {
        this.state.tags = toArray(stateNode?.tags);
      }
    });
    /**
     * To used within side effects for React or Vue to update context
     */
    __publicField(this, "setContext", (context) => {
      if (!context) return;
      deepMerge(this.state.context, compact(context));
    });
    __publicField(this, "setOptions", (options) => {
      const opts = compact(options);
      this.actionMap = { ...this.actionMap, ...opts.actions };
      this.delayMap = { ...this.delayMap, ...opts.delays };
      this.activityMap = { ...this.activityMap, ...opts.activities };
      this.guardMap = { ...this.guardMap, ...opts.guards };
    });
    __publicField(this, "getStateNode", (state) => {
      if (!state) return;
      return this.config.states?.[state];
    });
    __publicField(this, "getNextStateInfo", (transitions, event) => {
      const transition = this.determineTransition(transitions, event);
      const isTargetless = !transition?.target;
      const target = transition?.target ?? this.state.value;
      const changed = this.state.value !== target;
      const stateNode = this.getStateNode(target);
      const reenter = !isTargetless && !changed && !transition?.internal;
      const info = {
        reenter,
        transition,
        stateNode,
        target,
        changed
      };
      this.log("NextState:", `[${event.type}]`, this.state.value, "---->", info.target);
      return info;
    });
    __publicField(this, "getAfterActions", (transition, delay) => {
      let id;
      return {
        entry: () => {
          id = globalThis.setTimeout(() => {
            const next = this.getNextStateInfo(transition, this.state.event);
            this.performStateChangeEffects(this.state.value, next, this.state.event);
          }, delay);
        },
        exit: () => {
          globalThis.clearTimeout(id);
        }
      };
    });
    /**
     * All `after` events leverage `setTimeout` and `clearTimeout`,
     * we invoke the `clearTimeout` on exit and `setTimeout` on entry.
     *
     * To achieve this, we split the `after` defintion into `entry` and `exit`
     *  functions and append them to the state's `entry` and `exit` actions
     */
    __publicField(this, "getDelayedEventActions", (state) => {
      const stateNode = this.getStateNode(state);
      const event = this.state.event;
      if (!stateNode || !stateNode.after) return;
      const entries = [];
      const exits = [];
      if (isArray(stateNode.after)) {
        const transition = this.determineTransition(stateNode.after, event);
        if (!transition) return;
        if (!hasProp(transition, "delay")) {
          throw new Error(`[@zag-js/core > after] Delay is required for after transition: ${JSON.stringify(transition)}`);
        }
        const determineDelay = determineDelayFn(transition.delay, this.delayMap);
        const __delay = determineDelay(this.contextSnapshot, event);
        const actions = this.getAfterActions(transition, __delay);
        entries.push(actions.entry);
        exits.push(actions.exit);
        return { entries, exits };
      }
      if (isObject(stateNode.after)) {
        for (const delay in stateNode.after) {
          const transition = stateNode.after[delay];
          const determineDelay = determineDelayFn(delay, this.delayMap);
          const __delay = determineDelay(this.contextSnapshot, event);
          const actions = this.getAfterActions(transition, __delay);
          entries.push(actions.entry);
          exits.push(actions.exit);
        }
      }
      return { entries, exits };
    });
    /**
     * Function to executes defined actions. It can accept actions as string
     * (referencing `options.actions`) or actual functions.
     */
    __publicField(this, "executeActions", (actions, event) => {
      const pickedActions = determineActionsFn(actions, this.guardMap)(this.contextSnapshot, event, this.guardMeta);
      for (const action of toArray(pickedActions)) {
        const fn = isString(action) ? this.actionMap?.[action] : action;
        warn(
          isString(action) && !fn,
          `[@zag-js/core > execute-actions] No implementation found for action: \`${action}\``
        );
        fn?.(this.state.context, event, this.meta);
      }
    });
    /**
     * Function to execute running activities and registers
     * their cleanup function internally (to be called later on when we exit the state)
     */
    __publicField(this, "executeActivities", (event, activities, state) => {
      for (const activity of activities) {
        const fn = isString(activity) ? this.activityMap?.[activity] : activity;
        if (!fn) {
          warn(`[@zag-js/core > execute-activity] No implementation found for activity: \`${activity}\``);
          continue;
        }
        const cleanup = fn(this.state.context, event, this.meta);
        if (cleanup) {
          const key = isString(activity) ? activity : activity.name || uuid();
          this.addActivityCleanup(state ?? this.state.value, key, cleanup);
        }
      }
    });
    /**
     * Normalizes the `every` definition to transition. `every` can be:
     * - An array of possible actions to run (we need to pick the first match based on guard)
     * - An object of intervals and actions
     */
    __publicField(this, "createEveryActivities", (every, callbackfn) => {
      if (!every) return;
      if (isArray(every)) {
        const picked = toArray(every).find((transition) => {
          const delayOrFn = transition.delay;
          const determineDelay2 = determineDelayFn(delayOrFn, this.delayMap);
          const delay2 = determineDelay2(this.contextSnapshot, this.state.event);
          const determineGuard = determineGuardFn(transition.guard, this.guardMap);
          const guard = determineGuard(this.contextSnapshot, this.state.event, this.guardMeta);
          return guard ?? delay2 != null;
        });
        if (!picked) return;
        const determineDelay = determineDelayFn(picked.delay, this.delayMap);
        const delay = determineDelay(this.contextSnapshot, this.state.event);
        const activity = () => {
          const id = globalThis.setInterval(() => {
            this.executeActions(picked.actions, this.state.event);
          }, delay);
          return () => {
            globalThis.clearInterval(id);
          };
        };
        callbackfn(activity);
      } else {
        for (const interval in every) {
          const actions = every?.[interval];
          const determineDelay = determineDelayFn(interval, this.delayMap);
          const delay = determineDelay(this.contextSnapshot, this.state.event);
          const activity = () => {
            const id = globalThis.setInterval(() => {
              this.executeActions(actions, this.state.event);
            }, delay);
            return () => {
              globalThis.clearInterval(id);
            };
          };
          callbackfn(activity);
        }
      }
    });
    __publicField(this, "setEvent", (event) => {
      this.state.previousEvent = this.state.event;
      this.state.event = (0, import_store2.ref)(toEvent(event));
    });
    __publicField(this, "performExitEffects", (current, event) => {
      const currentState = this.state.value;
      if (currentState === "") return;
      const stateNode = current ? this.getStateNode(current) : void 0;
      this.stopActivities(currentState);
      const _exit = determineActionsFn(stateNode?.exit, this.guardMap)(this.contextSnapshot, event, this.guardMeta);
      const exitActions = toArray(_exit);
      const afterExitActions = this.delayedEvents.get(currentState);
      if (afterExitActions) {
        exitActions.push(...afterExitActions);
      }
      this.executeActions(exitActions, event);
    });
    __publicField(this, "performEntryEffects", (next, event) => {
      const stateNode = this.getStateNode(next);
      const activities = toArray(stateNode?.activities);
      this.createEveryActivities(stateNode?.every, (activity) => {
        activities.unshift(activity);
      });
      if (activities.length > 0) {
        this.executeActivities(event, activities);
      }
      const pickedActions = determineActionsFn(stateNode?.entry, this.guardMap)(
        this.contextSnapshot,
        event,
        this.guardMeta
      );
      const entryActions = toArray(pickedActions);
      const afterActions = this.getDelayedEventActions(next);
      if (stateNode?.after && afterActions) {
        this.delayedEvents.set(next, afterActions?.exits);
        entryActions.push(...afterActions.entries);
      }
      this.executeActions(entryActions, event);
      if (stateNode?.type === "final") {
        this.state.done = true;
        this.doneListeners.forEach((listener) => {
          listener(this.stateSnapshot);
        });
        this.stop();
      }
    });
    __publicField(this, "performTransitionEffects", (transitions, event) => {
      const transition = this.determineTransition(transitions, event);
      this.executeActions(transition?.actions, event);
    });
    /**
     * Performs all the requires side-effects or reactions when
     * we move from state A => state B.
     *
     * The Effect order:
     * Exit actions (current state) => Transition actions  => Go to state => Entry actions (next state)
     */
    __publicField(this, "performStateChangeEffects", (current, next, event) => {
      this.setEvent(event);
      const changed = next.changed || next.reenter;
      if (changed) {
        this.performExitEffects(current, event);
      }
      this.performTransitionEffects(next.transition, event);
      this.setState(next.target);
      if (changed) {
        this.performEntryEffects(next.target, event);
      }
    });
    __publicField(this, "determineTransition", (transition, event) => {
      const fn = determineTransitionFn(transition, this.guardMap);
      return fn?.(this.contextSnapshot, event, this.guardMeta);
    });
    /**
     * Function to send event to parent machine from spawned child
     */
    __publicField(this, "sendParent", (evt) => {
      if (!this.parent) {
        invariant("[@zag-js/core > send-parent] Cannot send event to an unknown parent");
      }
      const event = toEvent(evt);
      this.parent?.send(event);
    });
    __publicField(this, "log", (...args) => {
      if (isDev() && this.options.debug) {
        console.log(...args);
      }
    });
    /**
     * Function to send an event to current machine
     */
    __publicField(this, "send", (evt) => {
      const event = toEvent(evt);
      this.transition(this.state.value, event);
    });
    __publicField(this, "transition", (state, evt) => {
      const stateNode = isString(state) ? this.getStateNode(state) : state?.stateNode;
      const event = toEvent(evt);
      if (!stateNode && !this.config.on) {
        const msg = this.status === "Stopped" /* Stopped */ ? "[@zag-js/core > transition] Cannot transition a stopped machine" : `[@zag-js/core > transition] State does not have a definition for \`state\`: ${state}, \`event\`: ${event.type}`;
        warn(msg);
        return;
      }
      const transitions = (
        // @ts-expect-error - Fix this
        stateNode?.on?.[event.type] ?? this.config.on?.[event.type]
      );
      const next = this.getNextStateInfo(transitions, event);
      this.performStateChangeEffects(this.state.value, next, event);
      return next.stateNode;
    });
    __publicField(this, "subscribe", (listener) => {
      this.stateListeners.add(listener);
      if (this.status === "Running" /* Running */) {
        listener(this.stateSnapshot);
      }
      return () => {
        this.stateListeners.delete(listener);
      };
    });
    __publicField(this, "onDone", (listener) => {
      this.doneListeners.add(listener);
      return this;
    });
    __publicField(this, "onTransition", (listener) => {
      this.stateListeners.add(listener);
      if (this.status === "Running" /* Running */) {
        listener(this.stateSnapshot);
      }
      return this;
    });
    this.config = structuredClone(config);
    this.options = structuredClone(options ?? {});
    this.id = this.config.id ?? `machine-${uuid()}`;
    this.guardMap = this.options?.guards ?? {};
    this.actionMap = this.options?.actions ?? {};
    this.delayMap = this.options?.delays ?? {};
    this.activityMap = this.options?.activities ?? {};
    this.sync = this.options?.sync ?? false;
    this.state = createProxy(this.config);
    this.initialContext = (0, import_store2.snapshot)(this.state.context);
  }
  // immutable state value
  get stateSnapshot() {
    return cast((0, import_store2.snapshot)(this.state));
  }
  getState() {
    return this.stateSnapshot;
  }
  // immutable context value
  get contextSnapshot() {
    return this.stateSnapshot.context;
  }
  /**
   * A reference to the instance methods of the machine.
   * Useful when spawning child machines and managing the communication between them.
   */
  get self() {
    const self = this;
    return {
      id: this.id,
      send: this.send.bind(this),
      sendParent: this.sendParent.bind(this),
      sendChild: this.sendChild.bind(this),
      stop: this.stop.bind(this),
      stopChild: this.stopChild.bind(this),
      spawn: this.spawn.bind(this),
      stopActivity: this.stopActivity.bind(this),
      get state() {
        return self.stateSnapshot;
      },
      get initialContext() {
        return self.initialContext;
      },
      get initialState() {
        return self.initialState?.target ?? "";
      }
    };
  }
  get meta() {
    return {
      state: this.stateSnapshot,
      guards: this.guardMap,
      send: this.send.bind(this),
      self: this.self,
      initialContext: this.initialContext,
      initialState: this.initialState?.target ?? "",
      getState: () => this.stateSnapshot,
      getAction: (key) => this.actionMap[key],
      getGuard: (key) => this.guardMap[key]
    };
  }
  get guardMeta() {
    return {
      state: this.stateSnapshot
    };
  }
  get [Symbol.toStringTag]() {
    return "Machine";
  }
};
var createMachine = (config, options) => new Machine(config, options);
var isMachine = (value) => {
  return value instanceof Machine || value?.type === "machine" /* Machine */;
};

// src/merge-props.ts
var clsx = (...args) => args.map((str) => str?.trim?.()).filter(Boolean).join(" ");
var CSS_REGEX = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;
var serialize = (style) => {
  const res = {};
  let match;
  while (match = CSS_REGEX.exec(style)) {
    res[match[1]] = match[2];
  }
  return res;
};
var css = (a, b) => {
  if (isString(a)) {
    if (isString(b)) return `${a};${b}`;
    a = serialize(a);
  } else if (isString(b)) {
    b = serialize(b);
  }
  return Object.assign({}, a ?? {}, b ?? {});
};
function mergeProps(...args) {
  let result = {};
  for (let props of args) {
    for (let key in result) {
      if (key.startsWith("on") && typeof result[key] === "function" && typeof props[key] === "function") {
        result[key] = callAll(props[key], result[key]);
        continue;
      }
      if (key === "className" || key === "class") {
        result[key] = clsx(result[key], props[key]);
        continue;
      }
      if (key === "style") {
        result[key] = css(result[key], props[key]);
        continue;
      }
      result[key] = props[key] !== void 0 ? props[key] : result[key];
    }
    for (let key in props) {
      if (result[key] === void 0) {
        result[key] = props[key];
      }
    }
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Machine,
  choose,
  createMachine,
  deepMerge,
  guards,
  isMachine,
  mergeProps,
  proxy,
  ref,
  snapshot,
  subscribe
});
//# sourceMappingURL=index.js.map