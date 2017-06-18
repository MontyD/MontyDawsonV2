
class OrganicSkew {

    private skewFactor: number = Math.random();
    private index = 0;

    public draw(context: CanvasRenderingContext2D) {
        // TODO - fix this
        this.index++;
        context.setTransform(1, 0, 0, 1, this.index, 0);
    }

}

export default OrganicSkew;