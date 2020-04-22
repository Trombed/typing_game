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

        this.spawnEnemy = this.spawnEnemy.bind(this)
    }


    startGame() {
        // this.canvas.removeEventListener("click", game.startGame)
        let input = document.getElementById("user-input");
        input.classList.toggle("hide")
        this.spawnEnemy();
        this.currentFrame = new Date ()
        this.animate()
    }

    spawnEnemy() {
        this.enemies.push(new Enemy(this.ctx, this.canvas, this.words.newWord()))
    }

    animate() {
        this.render = requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.drawEnemies();
        this.checkInput();
       
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
            if (this.input.value === this.enemies[i].word) {
                this.enemies.splice(this.enemies[i],1)
                this.input.value = "";
                this.spawnEnemy();
            }
        }
    }


}

export default Game; 