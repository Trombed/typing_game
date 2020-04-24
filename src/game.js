import Words from "./words";
import Enemy from "./enemy";
import Mage from "./mage";
import Explosion from "./explosion";


class Game {
    constructor(ctx, canvas, wordBox, input) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.input = input;
        this.wordBox = wordBox;
        this.gameOver = false;
        this.enemies = [];
        this.explosion = [];
        this.words = new Words();
        this.health = 3;
        this.heart = new Image ();
        this.player = new Mage(this.ctx, this.canvas);
        this.heart.src = "./images/heart.png";
        this.startGame = this.startGame.bind(this)
    
        this.background = new Image();
        this.background.src = "./images/background.png"
        this.wave = 1;
        this.wpmTime = new Date();
        this.wordsEntered = 0;
        this.wpm = 0;
        this.timer = 0;


    }


    startGame() {
        this.canvas.removeEventListener("click", this.startGame)
        let input = document.getElementById("user-input");
        input.classList.toggle("hide")
        
        this.currentFrame = new Date();
        this.explosionFrame = new Date();
        this.animate();
        this.input.focus();
       
    }

    spawnEnemy() {
        if (  (this.timer %  100) === 0 ) {
            this.enemies.push(new Enemy(this.ctx, this.canvas, this.words.newWord()))
        }

        this.updateWord();
    }

    animate() {
        this.render = requestAnimationFrame(this.animate.bind(this));
        let timer = setInterval( () => { this.timer += 1, 10  })
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.drawBG();
        this.drawEnemies();
        this.drawExplosions();
        this.checkOOB();
        this.checkInput();
        this.showHealth();
        this.drawMenu();
        this.drawWPM();
        this.spawnEnemy();
        this.player.draw();

        // if (this.health <= 0) {
        //     cancelAnimationFrame(this.render)
        // }
     
    }


    drawEnemies() {
        let now = new Date();
        let step = now - this.currentFrame;
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].draw();
            if (step > 200) {
                this.enemies[i].changeFrames();
                this.currentFrame = new Date();
            }
        }
    }

    drawExplosions() {
        let now = new Date();
        let step = now - this.explosionFrame;
        for (let i = 0; i < this.explosion.length; i++) {
            this.explosion[i].draw();
            if (step > 200) {
                this.explosion[i].changeFrames();
                this.currentFrame = new Date();
            }
            if (this.explosion[i].finished) {
                this.explosion.splice(i, 1)
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
                this.explosion.push(new Explosion(this.ctx, this.canvas, this.enemies[i].x, this.enemies[i].y ))         
                this.enemies.splice(i,1)
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
        this.ctx.fillText(`Kills: ${this.wordsEntered}`, 600, 20)
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

    
    
    drawBG() {
        this.ctx.drawImage(this.background, 0,0, this.background.width, this.background.height,
            0,0, this.canvas.width, this.canvas.height)
    }

    updateWord() {
        this.wordBox.innerHTML = "";
        for (let i = 0; i < this.enemies.length; i++) {
            let newDiv = document.createElement("div")
            newDiv.classList.add("enemies-word")
            newDiv.innerHTML = this.enemies[i].word
            this.wordBox.append(newDiv)
        }
    }

    gameOver() {

    }

}

export default Game; 

