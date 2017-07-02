
class organicSkew {

  private skewXFactor: number = Math.sin(this.getRandom(0.000001, 0.0001));
  private skewYFactor: number = Math.sin(this.getRandom(0.000001, 0.0001));
  private x: number = 0;
  private y: number = 0;
  private bounds: number = 0.1;

  constructor() {
    this.animate = this.animate.bind(this);
  }

  public animate(context: CanvasRenderingContext2D) {
    this.calculate();
    context.setTransform(1, this.y, this.x, 1, 0, 0);
  }

  private calculate() {
    this.x += this.skewXFactor;
    this.y += this.skewYFactor;
    this.checkBounds();
  }

  private checkBounds() {
    if (this.x > this.bounds) {
      this.skewXFactor = -Math.abs(this.skewXFactor);
    } else if (this.x < -this.bounds) {
      this.skewXFactor = +Math.abs(this.skewXFactor);
    }
    if (this.y > this.bounds) {
      this.skewYFactor = -Math.abs(this.skewYFactor);
    } else if (this.y < -this.bounds) {
      this.skewYFactor = +Math.abs(this.skewYFactor);
    }
  }

  private getRandom(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

}

export default organicSkew;
