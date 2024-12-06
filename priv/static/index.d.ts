import * as _zag_js_types from '@zag-js/types';
import * as dialog from '@zag-js/dialog';
import { Machine } from '@zag-js/core';
import { ViewHook } from 'phoenix_live_view';

interface ComponentInterface<Api> {
    el: HTMLElement;
    service: ReturnType<any>;
    api: Api;
    init(): void;
    destroy(): void;
    render(): void;
}
declare abstract class Component<Context, Api> implements ComponentInterface<Api> {
    el: HTMLElement;
    service: ReturnType<any>;
    api: Api;
    abstract initService(context: Context): Machine<any, any, any>;
    abstract initApi(): Api;
    abstract render(): void;
    constructor(el: HTMLElement, context: Context);
    init: () => void;
    destroy: () => void;
}

declare class Dialog extends Component<dialog.Context, dialog.Api> {
    initService(context: dialog.Context): Machine<any, any, any>;
    initApi(): dialog.Api<_zag_js_types.PropTypes<{
        [x: string]: any;
    }>>;
    render(): void;
}
interface DialogHook extends ViewHook {
    dialog: Dialog;
    context(): dialog.Context;
}
declare const _default: DialogHook;

declare const Hooks: {
    Dialog: DialogHook;
};

export { _default as Dialog, Hooks };
