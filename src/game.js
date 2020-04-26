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
        this.level = 1
        this.words = new Words();
        this.player = new Mage(this.ctx, this.canvas);
        this.startGame = this.startGame.bind(this)
        this.background = new Image();
        this.background.src = "./images/background.png"
        this.wpmTime = new Date();
        this.slashSound = new Audio("./sound/a4swordslash.mp3");
        this.gameOvered = this.gameOvered.bind(this);
        this.restartGame = this.restartGame.bind(this)
        this.newGame = this.newGame.bind(this)
        this.selector = new Image();
        this.selector.src = "./images/static_cursor.png"

    }


    startGame() {
        // this.canvas.removeEventListener("click", this.startGame)
        this.input.classList.toggle("hide")
        this.cursor.classList.toggle("hide")
        this.infoBox.classList.toggle("hide")
        this.wordsEntered = 0;
        this.speed = 1
        this.wpm = 0;
        this.timer = 0;
        this.enemies = [];
        this.explosion = [];
        this.health = 3;
        this.showHealth();
        this.currentFrame = new Date();
        this.explosionFrame = new Date();
        this.playerFrame = new Date();
        this.animate();
        this.input.focus();

    }

    spawnEnemy() {
        if (  (this.timer %  100) === 0 ) {
            this.enemies.push(new Enemy(this.ctx, this.canvas, this.words.newWord(), this.speed))
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
        this.select();
        if (this.health <= 1) {
            this.gameOvered();
            cancelAnimationFrame(this.render);
        }
     
    }

    select() {
 
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].word.startsWith(this.input.value.toUpperCase() ) && this.input.value !== "") {
                console.log("true")
                this.ctx.drawImage(this.selector, 
                    this.enemies[i].x-13, this.enemies[i].y+20,
                    25,25
                    )   
            }
        }
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
                if (this.wordsEntered % 10 === 0) this.updateLevel();
            }
        }
    }

    updateLevel() {
        this.level += 1;
        this.speed += 0.5;
        for(let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].speedLevel = this.speed;
        }
        document.getElementById("LEVEL").innerHTML = this.level
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
                if (this.enemies[i].flying) {
                    newDiv.classList.add("enemies-word-flying")
                } else { 
                newDiv.classList.add("enemies-word")
                }
            newDiv.innerHTML = this.enemies[i].word
            this.wordBox.append(newDiv)
        }
    }

    gameOvered() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
        this.cursor.classList.toggle("hide")
        this.input.classList.toggle("hide")
        this.wordBox.classList.toggle("hide")
        document.getElementById("Game-Over").classList.toggle("hide")

        document.addEventListener("keydown", this.newGame)

    }

    restartGame() {
      
  
        document.getElementById("Game-Over").classList.toggle("hide");
        this.wordBox.classList.toggle("hide")
        this.infoBox.classList.toggle("hide")
        this.startGame();
    }

    newGame(e) {
        document.removeEventListener("keydown", this.newGame)
        e.preventDefault();
        if (e.code === "Enter")
        { 

        this.restartGame()
        }
    }
}

export default Game; 

