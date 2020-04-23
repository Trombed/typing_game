import Words from "./words";
import Enemy from "./enemy";


class Game {
    constructor(ctx, canvas, input) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.input = input;
        this.gameOver = false;
        this.enemies = []
        this.words = new Words();
        this.health = 3;
        this.heart = new Image ();
        this.heart.src = "./images/heart.png";
        this.startGame = this.startGame.bind(this)
        this.wave = 1;
        this.wpmTime = new Date();
        this.wordsEntered = 0;
        this.wpm = 0;
    }


    startGame() {
        this.canvas.removeEventListener("click", this.startGame)
        let input = document.getElementById("user-input");
        input.classList.toggle("hide")
        this.spawnEnemy();
        this.currentFrame = new Date()
        this.animate();
    }

    spawnEnemy() {
        this.enemies.push(new Enemy(this.ctx, this.canvas, this.words.newWord()))
    }

    animate() {
        this.render = requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.drawEnemies();
        this.checkInput();
        this.showHealth();
        this.drawMenu();
        this.drawWPM();
    }


    drawEnemies() {
        let now = new Date();
        let step = now - this.currentFrame
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].draw();
            if (step > 200) {
                this.enemies[i].changeFrames();
                this.currentFrame = new Date();
            }
        }
    }

    checkInput() {
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.input.value.toUpperCase() === this.enemies[i].word) {
                this.enemies.splice(this.enemies[i],1)
                this.input.value = "";
                this.wordsEntered += 1;
                this.spawnEnemy();
            }
        }
    }

    showHealth() {
        let x = 10
        for (let i = 0; i < this.health; i++ ) {
            // debugger
            this.ctx.drawImage(this.heart, x, 5, 30, 30 );
            x += 35;
        }
    }

    drawMenu() {
        this.ctx.beginPath();
        this.ctx.moveTo(420, 0);
        this.ctx.lineTo(400, 20);
        this.ctx.lineTo(380, 0);
        this.ctx.closePath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#666';
        this.ctx.stroke();
        this.ctx.fillText(`Wave: ${this.wave}`, 600, 20)
        this.ctx.fillStyle = "#666";
        this.ctx.fill();
    }

    drawWPM() {
        let now = new Date();
        const diff = now - this.wpmTime
        this.wpm = Math.floor(this.wordsEntered / ( (diff / 1000) /  60))
        this.ctx.stroke();
        this.ctx.fillText(`WPM: ${this.wpm}`, 600, 40)
        this.ctx.fill();       
    }



    gameOver() {

    }
}

export default Game; 