import { Canvas } from '../canvas';
import circle from '../canvas/shape/circle';
import organicSkew from '../canvas/animation/organic-skew';

class backgroundAnimation extends Canvas {

  private circles: circle[];

  constructor(private colors: string[], raf: Function, attachEvent: Function) {
    super('background', {
      fullScreen: true,
      backgroundColor: 'transparent',
    },    raf, attachEvent);

    this.circles = this.colors.map((color, index) => {
      const cir: circle = new circle(
        this.center.x, 
        this.center.y, 
        this.shortestSide / 2.2, 
        color, 
        this.ctx,
      );
      cir.preDraw = (new organicSkew()).animate;
      cir.draw();
      return cir;
    });
    this.on('resize', this.resize.bind(this));
    this.raf(this.update.bind(this));
  }

  private resize(): void {
    this.clear();
    this.circles.forEach((cir) => {
      cir.draw(this.center.x, this.center.y, this.shortestSide / 2.2);
    },                   this);
  }

  private update(): void {
    this.clear();
    this.circles.forEach(circle => circle.draw());
    this.raf(this.update.bind(this));
  }

}

export default backgroundAnimation;
