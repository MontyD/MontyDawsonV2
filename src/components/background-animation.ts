import { Canvas } from '../canvas';
import Circle from '../canvas/shape/circle';

class BackgroundAnimation extends Canvas {

  private circle: Circle;

  constructor(raf: Function, attachEvent: Function) {
    super('background', {
        fullScreen: true,
        backgroundColor: '#E0E0E0'
    }, raf, attachEvent);
    this.circle = new Circle(this.element.width / 2, this.element.height / 2, this.element.height / 10, 'red', this.ctx);
    this.circle.draw();
    this.attachEvent('mousemove', this.element, this.mouseMove.bind(this));
  }

  public mouseMove(e: MouseEvent) {
    this.clear();
    this.circle.draw(e.pageX - this.element.offsetLeft, e.pageY - this.element.offsetTop);
  };

}

export default BackgroundAnimation;
