class Mage {
    constructor (ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;

        this.y = 250;
        this.x = 5;
        this.image = new Image ();
        this.image.src = "./images/mage.png";
        this.shift = 142;
    }


    drawMage () {
       this.ctx.drawImage(this.image, this.shift, 
            0, 50, 50,
            this.x, this.y,
            60, 60)
    }



    changeFrames() {
        this.shift += 50;
        if (this.shift > 200) {
            this.shift = 142;
        }
    }

    draw() {
        this.drawMage();
    }


}

export default Mage;

