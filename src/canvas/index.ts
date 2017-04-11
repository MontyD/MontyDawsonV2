import { raf, attachEvent } from '../dom';

interface CanvasOptions {
  fullScreen: boolean,
  backgroundColor: string
};

class Canvas {
  element: HTMLCanvasElement;
  options: CanvasOptions;
  ctx: CanvasRenderingContext2D;

  constructor(id: string, options: CanvasOptions) {
    this.element = <HTMLCanvasElement>document.getElementById(id);
    this.options = options;

    if (!this.element || !this.element.getContext) {
      throw new Error(`Unable to find canvas element by ID ${id}`);
    }

    this.setup();
  }

  public setFullScreen() {
    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;
  }

  private setup() {
    if (this.options.fullScreen) {
      this.setFullScreen();
      attachEvent('resize', window, () => raf(this.setFullScreen.bind(this)));
    }
    this.ctx = this.element.getContext('2d')!;
    this.ctx.clearRect(0, 0, this.element.width, this.element.height);
    this.ctx.fillStyle = this.options.backgroundColor || 'transparent';
    this.ctx.fillRect(0, 0, this.element.width, this.element.height);
  }

}

export {
  Canvas,
  CanvasOptions
};
