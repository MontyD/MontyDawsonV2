import { Canvas } from '../canvas';
import Circle from '../canvas/shape/circle';
import OrganicSkew from '../canvas/animation/organic-skew';
import { Colors } from '../constants';

class BackgroundAnimation extends Canvas {

  private circles: Circle[];

  constructor(private colors: string[], raf: Function, attachEvent: Function) {
    super('background', {
        fullScreen: true,
        backgroundColor: '#E0E0E0'
    }, raf, attachEvent);
    this.circles = colors.map((color, index) => {
      let circle = new Circle(
        this.center.x, 
        this.center.y, 
        this.shortestSide / 2.2 - (index * 15), 
        color, 
        this.ctx
      );
      circle.setShadow('rgba(0, 0, 0, 0.3)', 6 + index);
      circle.animationFunction = new OrganicSkew();
      circle.draw();
      return circle;
    });
    this.on('resize', this.resize.bind(this));
    this.raf(this.update.bind(this));
  }

  private resize(): void {
    this.clear();
    this.circles.forEach(circle => {
      circle.draw(this.center[0], this.center[1], this.shortestSide / 2.2);
    });
  }

  private update(): void {
    this.clear();
    this.circles.forEach(circle => circle.draw());
    this.raf(this.update.bind(this));
  }

}

export default BackgroundAnimation;
