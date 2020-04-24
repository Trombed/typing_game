
class Enemy {
    constructor (ctx, canvas, word) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.word = word;
        this.length = this.word.length;
        this.y = this.spawnY();
        this.x = 800;
        this.image = new Image ();
        this.image.src = "./images/enemy.png";
        this.shift = 0;
        this.explosion = new Image ();
        this.explosion.src = "./images/explosion.png"
        console.log(this.y)
       
    }

    spawnY() {
        let num = (Math.random() * (340-200)) + 200
       
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
        this.ctx.drawImage(this.image, this.shift, 100,
           50, 100,
           this.x+10, this.y,
           30, 45)
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