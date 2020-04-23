import Words from "./words";
import Enemy from "./enemy";
import Mage from "./mage";


class Game {
    constructor(ctx, canvas, input) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.input = input;
        this.gameOver = false;
        this.enemies = [];
        this.explosion = [];
        this.words = new Words();
        this.health = 3;
        this.heart = new Image ();
        this.player = new Mage(this.ctx, this.canvas);
        this.heart.src = "./images/heart.png";
        this.startGame = this.startGame.bind(this)
        this.explosion = new Image ();
        this.explosion.src = "./images/explosion.png"
        this.background = new Image();
        this.background.src = "./images/background.png"
        this.wave = 1;
        this.wpmTime = new Date();
        this.wordsEntered = 0;
        this.wpm = 0;
        this.timer = 0;

        this.drawExplosion = this.drawExplosion.bind(this)

    }


    startGame() {
        this.canvas.removeEventListener("click", this.startGame)
        let input = document.getElementById("user-input");
        input.classList.toggle("hide")
        
        this.currentFrame = new Date()
        this.animate();
        this.input.focus();
       
    }

    spawnEnemy() {
        if (  (this.timer %  100) === 0 ) {
            console.log("true")
            this.enemies.push(new Enemy(this.ctx, this.canvas, this.words.newWord()))
        }
    }

    animate() {
        this.render = requestAnimationFrame(this.animate.bind(this));
        let timer = setInterval( () => { this.timer += 1, 10  })
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.drawBG();
        this.drawEnemies();
        this.checkOOB();
        this.checkInput();
        this.showHealth();
        this.drawMenu();
        this.drawWPM();
        this.spawnEnemy();
        this.player.draw();
     
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

    checkOOB() {
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].x < 100) {
                this.enemies.splice(i, 1)
                this.health -= 1;
            }
        }
    }

    checkInput() {
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.input.value.toUpperCase() === this.enemies[i].word) {
                this.drawExplosion(this.enemies[i].x, this.enemies[i].y)
                console.log(this.enemies)
                
                this.enemies.splice(i,1)
                // delete this.enemies[i]
                console.log(this.enemies)
                this.input.value = "";
                this.wordsEntered += 1;
            }
        }
    }

    showHealth() {
        let x = 480
        for (let i = 0; i < this.health; i++ ) {
            // debugger
            this.ctx.drawImage(this.heart, x, 5, 20, 20 );
            x += 35;
        }
    }

    drawMenu() {
        this.ctx.beginPath();
        this.ctx.moveTo(90, 0);
        this.ctx.lineTo(70, 20);
        this.ctx.lineTo(80, 0);
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

    drawExplosion(x, y) {
       
        
        for(var shift = 0; shift <= 1536; shift += 128 ) {
            this.ctx.drawImage(this.explosion, shift, 0, 128, 128, x, y, 128, 128);
        }
    }
    
    drawBG() {
        this.ctx.drawImage(this.background, 0,0, this.background.width, this.background.height,
            0,0, this.canvas.width, this.canvas.height)
    }

    gameOver() {

    }

}

export default Game; 