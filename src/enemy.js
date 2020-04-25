
class Enemy {
    constructor (ctx, canvas, word) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.word = word;
        this.length = this.word.length;
        this.image = new Image ();
        this.y = this.spawnY();
        this.x = 800;
       

        this.shift = 0;
       
    }

    spawnY() {
        let num = (Math.random() * (400)) 
        if ( num < 150 ) {
            this.image.src = "./images/flying.png";
            this.flying = true;
        } else  {
            this.image.src = "./images/enemy.png";
            this.flying = false;
        }
        return num;
    }

    drawWord () {
        this.x -= 1
        this.ctx.fillStyle = "purple";
        this.ctx.font = "16px Arial"
        this.ctx.fillText(this.word, this.x, this.y)
        this.ctx.beginPath()
        this.ctx.stroke();
    }

    drawEnemy() {
        if (!this.flying)
        this.ctx.drawImage(this.image, this.shift, 100,
           50, 100,
           this.x+10, this.y,
           30, 45);
        else {
            this.ctx.drawImage(this.image, this.shift, 0,
                188, 200,
                this.x-10, this.y-10,
                100, 80);
        }
    }

    changeFrames() {
        if (!this.flying) {
            this.shift += 80;
            if (this.shift > 200) {
                this.shift = 0;
            }
        }
        else {
            this.shift += 188;
            if (this.shift > 600) {
                this.shift = 0;
            }
        }
    }

    draw() {
        this.drawWord();
        this.drawEnemy();
    }


}

export default Enemy;

// width: 910 / 12 
// height: 415 / 4
// 