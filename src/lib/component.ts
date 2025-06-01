import { VanillaMachine } from ".";

interface ComponentInterface<Api> {
  el: HTMLElement;
  machine: VanillaMachine<any>;
  api: Api;

  init(): void;
  destroy(): void;
  render(): void;
}

export abstract class Component<Props, Api>
  implements ComponentInterface<Api>
{
  el: HTMLElement;
  machine: VanillaMachine<any>;
  api: Api;

  constructor(el: HTMLElement | null, props: Props) {
    if (!el) throw new Error("Root element not found");
    this.el = el;
    this.machine = this.initMachine(props)
    this.api = this.initApi();
  }

  abstract initMachine(props: Props): VanillaMachine<any>;
  abstract initApi(): Api;
  abstract render(): void;

  init = () => {
    this.render();
    this.machine.subscribe(() => {
      this.api = this.initApi();
      this.render();
    });
    this.machine.start();
  };

  destroy = () => {
    this.machine.stop();
  };
}
