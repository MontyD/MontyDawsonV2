import { raf } from '../../dom';

class Circle {

    private centerX: number;
    private centerY: number;
    private radius: number;
    private colour: string;
    private ctx: CanvasRenderingContext2D;
    private aniFunction: Function = (ctx: CanvasRenderingContext2D) => null;

    constructor(centerX: number, centerY: number, radius: number, colour: string, ctx: CanvasRenderingContext2D) {
        this.centerY = centerY;
        this.centerX = centerX;
        this.radius = radius;
        this.colour = colour;
        this.ctx = ctx;
    }

    public draw(centerX: number = this.centerX, centerY: number = this.centerY, radius: number = this.radius): void {
        this.aniFunction(this.ctx);
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
        
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = this.colour;
        this.ctx.fill();
    }

    public setShadow(colour: string, blur: number) {
        this.ctx.shadowColor = colour;
        this.ctx.shadowBlur = blur;
    }

    set animationFunction(animationFunction: Function) {
        this.aniFunction = animationFunction;
    }



}

export default Circle;