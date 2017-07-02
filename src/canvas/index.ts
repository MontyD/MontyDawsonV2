interface IcanvasOptions {
  fullScreen: boolean;
  backgroundColor: string;
}

type listenableEvent = 'resize' | 'mousemove';

interface evt {
  type: listenableEvent;
  callback: Function;
}

abstract class Canvas {
  public element: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  protected options: IcanvasOptions;
  protected raf: Function;
  protected attachEvent: Function;

  private events: evt[] = [];

  constructor(id: string, options: IcanvasOptions, raf: Function, attachEvent: Function) {
    this.element = <HTMLCanvasElement>document.getElementById(id);
    this.options = options;
    this.raf = raf;
    this.attachEvent = attachEvent;

    if (!this.element || !this.element.getContext) {
      throw new Error(`Unable to find canvas element by ID ${id}`);
    }

    this.setup();
  }

  get center(): { [key: string]: number, x: number, y: number} {
    return { x: this.element.width / 2, y: this.element.height / 2 };
  }

  get bounds(): [number, number, number, number] {
    return [0, 0, this.element.width, this.element.height];
  }

  get shortestSide(): number {
    if (this.element.height < this.element.width) {
      return this.element.height;
    }
    return this.element.width;
  }

  public on(evnt: listenableEvent, callback: Function): number {
    return this.events.push({
      callback,
      type: evnt,
    });
  }

  public off(evnt?: listenableEvent, callback?: Function, index?: number): void {
    if (index) {
      this.events.splice(index, 1);
      return;
    }
    if (evnt && callback) {
      this.events = this.events.filter((event) => {
        return !(event.type === evnt && event.callback === callback);
      });
    }
  }

  public emit(evnt: listenableEvent): void {
    this.events.forEach((event) => {
      if (event.type === evnt) {
        event.callback();
      }
    });
  }

  public setFullScreen(): void {
    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;
  }

  public clear(): void {
    this.ctx.clearRect.apply(this.ctx, this.bounds);
  }

  private setup(): void {
    if (this.options.fullScreen) {
      this.setFullScreen();
      this.on('resize', this.setFullScreen.bind(this));
    }

    this.attachEvent(
      <listenableEvent>'resize', window, () => {
        this.raf(this.emit.bind(this, <listenableEvent>'resize'));
      });
    this.attachEvent(
      <listenableEvent>'mousemove', this.element, () => {
        this.raf(this.emit.bind(this, <listenableEvent>'mousemove'));
      });

    this.ctx = this.element.getContext('2d')!;
    this.clear();
    this.ctx.fillStyle = this.options.backgroundColor || 'transparent';
  }

}

export {
  Canvas,
  IcanvasOptions,
};
