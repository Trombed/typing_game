import Words from "./words";
import Enemy from "./enemy";
import Mage from "./mage";
import Explosion from "./explosion";


class Game {
    constructor(ctx, canvas, wordBox, input, infoBox, cursor, hpBox, killsBox, wpmBox) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.input = input;
        this.wordBox = wordBox;
        this.infoBox = infoBox;
        this.cursor = cursor;
        this.hpBox = hpBox;
        this.killsBox = killsBox;
        this.wpmBox = wpmBox;
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
        this.wpmTime = new Date();
        this.wordsEntered = 0;
        this.wpm = 0;
        this.timer = 0;
        this.slashSound = new Audio("./sound/a4swordslash.mp3")

    }


    startGame() {
        this.canvas.removeEventListener("click", this.startGame)
        // let input = document.getElementById("user-input");
        this.input.classList.toggle("hide")
        this.cursor.classList.toggle("hide")
        this.infoBox.classList.toggle("hide")
        this.currentFrame = new Date();
        this.explosionFrame = new Date();
        this.playerFrame = new Date();
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
        this.spawnEnemy();
        this.drawPlayer();

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

    drawPlayer() {
        let now = new Date();
        let step = now - this.playerFrame;

        if (this.input.value === "") {
            this.player.draw();
                if (step > 500) {
                    this.player.changeFrames();
                    this.playerFrame = new Date();
                }
        } else {
            this.player.drawChant();
            if (step > 500) {
                this.player.changeChantingFrames();
                this.playerFrame = new Date();
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
                this.showHealth();
                // this.slashSound.play();
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
                this.updateKill();
                this.updateWPM();
            }
        }
    }

    updateKill() {
        this.killsBox.innerHTML = `${this.wordsEntered}`
    }

    showHealth() {
        this.hpBox.innerHTML = `${this.health} / 3`
    }

    updateWPM() {
        let now = new Date();
        const diff = now - this.wpmTime
        this.wpm = Math.floor(this.wordsEntered / ( (diff / 1000) /  60))
        this.wpmBox.innerHTML = `${this.wpm}`
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

