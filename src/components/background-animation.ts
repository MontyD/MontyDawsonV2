import { Canvas } from '../canvas';
import Circle from '../canvas/shape/circle';
import Path from '../canvas/animation/path';
import { Colors } from '../constants';

class BackgroundAnimation extends Canvas {

  private circles: Array<Circle>;
  private colors: Array<string>;

  constructor(colors: Array<string>, raf: Function, attachEvent: Function) {
    super('background', {
        fullScreen: true,
        backgroundColor: '#E0E0E0'
    }, raf, attachEvent);
    this.colors = colors;
    this.circles = colors.map((color, index) => {
      let circle = new Circle(this.center[0], this.center[1], this.shortestSide / 2.2, color, this.ctx);
      circle.draw();
      return circle;
    });
    this.on('mousemove', this.mouseMove.bind(this));
    this.on('resize', this.resize.bind(this));
  }

  public mouseMove(e: MouseEvent) {
    console.log('mousemove');
  };

  private resize(): void {
    this.clear();
    this.circles.forEach(circle => {
      circle.draw(this.center[0], this.center[1], this.shortestSide / 2.2);
    });
  }

}

export default BackgroundAnimation;
