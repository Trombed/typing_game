
class Mage {
    constructor (ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;

        this.y = 250;
        this.x = 5;
        this.image = new Image ();
        this.image.src = "./images/mage.png";
        this.shift = 190;
    }


    drawMage () {
       this.ctx.drawImage(this.image, this.shift, 
            0, 100, 50,
            this.x, this.y,
            100, 60)
    }



    changeFrames() {
        this.shift += 80;
        if (this.shift > 200) {
            this.shift = 0;
        }
    }

    draw() {
        this.drawMage();
    }


}

export default Mage;

