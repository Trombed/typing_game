class Explosion {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas; 
        this.drawSplash();
    }

    drawSplash() {
            this.ctx.fillStyle = "black";
            this.ctx.font = '30px Tangerine';
            this.ctx.alignText = "left";
            this.ctx.fillText("Typing of the Wizard", this.canvas.width /2,this.canvas.height /2);
    }
}

export default Explosion