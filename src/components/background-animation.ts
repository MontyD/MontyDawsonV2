import { Canvas } from '../canvas';
import Circle from '../canvas/shape/circle';
import OrganicSkew from '../canvas/animation/organic-skew';

class BackgroundAnimation extends Canvas {

  private circle: Circle;
  private circleAnimation: OrganicSkew;

  constructor(private colors: string[], raf: Function, attachEvent: Function) {
    super('background', {
        fullScreen: true,
        backgroundColor: '#E0E0E0'
    }, raf, attachEvent);

    this.circle = new Circle(
      this.center.x, 
      this.center.y, 
      this.shortestSide / 2.2, 
      '#0D47A1', 
      this.ctx
    );
    this.circleAnimation = new OrganicSkew();
    this.circle.setShadow('rgba(0, 0, 0, 0.1)', 8);
    this.circle.preDraw = this.circleAnimation.animate;
    this.circle.draw();
    this.on('resize', this.resize.bind(this));
    this.raf(this.update.bind(this));
  }

  private resize(): void {
    this.clear();
    this.circle.draw(this.center[0], this.center[1], this.shortestSide / 2.2);
  }

  private update(): void {
    this.clear();
    this.circle.draw();
    this.raf(this.update.bind(this));
  }

}

export default BackgroundAnimation;
