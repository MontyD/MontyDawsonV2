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
      attachEvent('resize', window, () => raf(this.setFullScreen.bind(this)));
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
