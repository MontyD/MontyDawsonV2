import { raf } from '../../dom';

class Circle {

    private centerX: number;
    private centerY: number;
    private radius: number;
    private colour: string;
    private ctx: CanvasRenderingContext2D;

    constructor(centerX: number, centerY: number, radius: number, colour: string, ctx: CanvasRenderingContext2D) {
        this.centerY = centerY;
        this.centerX = centerX;
        this.radius = radius;
        this.colour = colour;
        this.ctx = ctx;
    }

    public draw(x?: number, y?: number, radius?: number): void {
        if (x) {
            this.centerX = x;
        }
        if(y) {
            this.centerY = y;
        }
        if (radius) {
            this.radius = radius;
        }
        raf(() => {
            this.ctx.beginPath();
            this.ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.fillStyle = this.colour;
            this.ctx.fill();
        });
    }



}

export default Circle;