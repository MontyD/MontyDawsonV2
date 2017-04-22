interface CanvasOptions {
  fullScreen: boolean,
  backgroundColor: string
};

abstract class Canvas {
  public element: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  protected options: CanvasOptions;
  protected raf: Function;
  protected attachEvent: Function;

  constructor(id: string, options: CanvasOptions, raf: Function, attachEvent: Function) {
    this.element = <HTMLCanvasElement>document.getElementById(id);
    this.options = options;
    this.raf = raf;
    this.attachEvent = attachEvent;

    if (!this.element || !this.element.getContext) {
      throw new Error(`Unable to find canvas element by ID ${id}`);
    }

    this.setup();
  }

  get center(): [number, number] {
    return [this.element.width / 2, this.element.height / 2];
  }
  
  get bounds(): [number, number, number, number] {
    return [0, 0, this.element.width, this.element.height];
  }

  public setFullScreen(): void {
    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;
  }

  public clear(): void {
    this.ctx.clearRect(0, 0, this.element.width, this.element.height);
  }

  private setup(): void {
    if (this.options.fullScreen) {
      this.setFullScreen();
      this.attachEvent('resize', window, () => this.raf(this.setFullScreen.bind(this)));
    }
    this.ctx = this.element.getContext('2d')!;
    this.clear();
    this.ctx.fillStyle = this.options.backgroundColor || 'transparent';
  }

}

export {
  Canvas,
  CanvasOptions
};
