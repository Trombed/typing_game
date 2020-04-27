
class Enemy {
    constructor (ctx, canvas, word, speed) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.word = word;
        this.length = this.word.length;
        this.image = new Image ();
        this.y = this.spawnY();
        this.x = 800;
        this.speedLevel = speed

        this.shift = 0;
        this.window = document.createElement("div");
        this.window.classList.add("Word-List-Container", "Enemy-Word");
        this.window.innerHTML = this.word;
        let background = document.getElementById("Game-Background");
        this.window.style.top = `${this.y-10}px`
        this.window.style.left = `${this.x}px`
        background.append(this.window)
    }

    spawnY() {
        let num = (Math.random() * (350)) 

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
        this.x -= this.speedLevel
        this.window.style.left = `${this.x}px`
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

    destroyWord() {
        this.window.remove();
     
    }


}

export default Enemy;

// width: 910 / 12 
// height: 415 / 4
// 