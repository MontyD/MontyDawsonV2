
class OrganicSkew {

    constructor(
        private skewFactor: number = Math.random(),
        private index = 0
    ) {
        this.animate = this.animate.bind(this);
     }

    public animate(context: CanvasRenderingContext2D) {
        context.setTransform(this.index++ * this.skewFactor * 0.004, this.index++ * this.skewFactor * 0.0006 , this.index++ * this.skewFactor * 0.0006, 1, this.index++ * this.skewFactor * 0.0006, 0);
    }

}

export default OrganicSkew;