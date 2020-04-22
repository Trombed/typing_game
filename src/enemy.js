
class Enemy {
    constructor (ctx, canvas, word) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.word = word;
        this.length = this.word.length;
        this.x = this.spawnX();
        this.y = 600;
        this.image = new Image ();
        this.image.src = "./images/enemy.png";
        this.shift = 0
    }

    spawnX() {
        let num = Math.random() * this.canvas.width
        if (num > 550 && num ) {
            num -= 80;
        }
        return num;
    }

    drawWord () {
        this.y -= 1
        this.ctx.fillStyle = "black";
        this.ctx.font = "16px Arial"
        this.ctx.fillText(this.word, this.x, this.y)
        this.ctx.beginPath()
        this.ctx.rect(this.x - 2, this.y + 4, this.length * 12, -22)
        this.ctx.stroke();
    }

    drawEnemy() {
        this.ctx.drawImage(this.image, this.shift, 310,
           50, 100,
           this.x+10, this.y,
           40, 85)
    }

    changeFrames() {
        this.shift += 80;
        if (this.shift > 200) {
            this.shift = 0;
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