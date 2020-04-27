import Words from "./words";
import Enemy from "./enemy";
import Mage from "./mage";
import Explosion from "./explosion";


class Game {
    constructor(ctx, canvas, wordBox, input, infoBox, cursor, hpBox, killsBox, wpmBox, tracks, muted) {
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
        this.level = 1;
        this.tracks = tracks;
        this.words = new Words();
        this.player = new Mage(this.ctx, this.canvas);
        this.startGame = this.startGame.bind(this)
        this.background = new Image();
        // this.background.src = "./images/background.png"
        // this.background.src = "./images/25293.png"
        this.wpmTime = new Date();
        this.slashSound = new Audio("./sound/a4swordslash.mp3");
        this.gameOvered = this.gameOvered.bind(this);
        this.restartGame = this.restartGame.bind(this)
        this.newGame = this.newGame.bind(this)
        this.selector = new Image();
        this.selector.src = "./images/static_cursor.png"
        this.spawnTimer = 0;
        this.muted = muted;
        this.timer = 1000;
        this.spawnEnemy = this.spawnEnemy.bind(this)
       
        this.backgrounds = {
            1: './images/background.png',
            2: './images/background2.png',
            3: './images/background3.png',
            4: './images/background4.png',
        }
    }


    startGame() {
        this.input.classList.toggle("hide")
        this.cursor.classList.toggle("hide")
        this.infoBox.classList.toggle("hide")
        this.player.alive = true;
        this.wordsEntered = 0;
        this.speed = 1
        this.wpm = 0;
        this.scene = "Battle";
        this.currentBG = 0;
        this.rotateBackground();
        this.tracks[1].currentTime = 0;
        this.playMusic();
        this.enemies = [];
        this.explosion = [];
        this.maxHealth = 3
        this.health = 3;
        this.showHealth();
        this.currentFrame = new Date();
        this.explosionFrame = new Date();
        this.playerFrame = new Date();
        this.animate();
        this.input.value = "";
        this.input.focus();
        let that = this;

        this.spawnInterval = setInterval( function() {
        
            that.spawnEnemy();
            }, that.timer
        )

    }

    rotateBackground() {
        this.currentBG++;
        document.getElementById("Game-Background").style.backgroundImage = `url(${this.backgrounds[this.currentBG]})`;
        if (this.currentBG >= 4) this.currentBG = 0;
        
    }

    spawnEnemy() {
 
                this.enemies.push(new Enemy(this.ctx, this.canvas, this.words.newWord(), this.speed))
                this.updateWord();
            
    }


    animate() {
        this.render = requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        // this.drawBG();
        this.drawEnemies();
        this.drawExplosions();
        this.checkOOB();
        this.checkInput();
        // this.spawnEnemy();
        this.select();
        if (this.health <= 0) {
            this.player.alive = false; 
            this.drawPlayer()
            this.gameOvered();

            cancelAnimationFrame(this.render);
        }
        this.drawPlayer();
    }

  

    select() {
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].word.startsWith(this.input.value.toUpperCase() ) && this.input.value !== "") {
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
        } else if (!this.player.alive) {
            this.player.drawDead();
        }
        
        else {
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
                if (this.muted) this.slashSound.play();
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
                this.updateWord();
                if (this.wordsEntered % 10 === 0) this.updateLevel();
            }
        }
    }

    updateLevel() {
        this.level += 1;
        this.speed += 0.5;
        this.maxHealth += 1;
        this.timer -= 10;
        this.rotateBackground();
        if (this.health <= this.maxHealth) this.health += 1;
        for(let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].speedLevel = this.speed;
        }
        document.getElementById("LEVEL").innerHTML = this.level
        this.showHealth();
        this.showLevelUp();
    }

    showLevelUp() {
        let that = this
        let image = document.getElementById("Level-Up")
        image.classList.toggle("hide")
        
    }



    updateKill() {
        this.killsBox.innerHTML = `${this.wordsEntered}`
    }

    showHealth() {
        this.hpBox.innerHTML = `${this.health} / ${this.maxHealth}`
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
            newDiv.innerHTML = `${i+1}: ${this.enemies[i].word}`
            this.wordBox.append(newDiv)
        }
    }

    gameOvered() {
        // this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
        this.scene = "GameOver"
        this.tracks[0].currentTime = 0;
        this.playMusic();
        this.cursor.classList.toggle("hide")
        this.input.classList.toggle("hide")
        this.wordBox.classList.toggle("hide")
        document.getElementById("Game-Over").classList.toggle("hide")
        document.addEventListener("keydown", this.newGame);
        this.enemies = [];
        clearInterval(this.spawnInterval)
        
    }

    playMusic() {
        if (this.muted === false ) {
            // switch (this.scene) {
            //     case "Battle":
            //         this.tracks[0].pause();
            //         this.tracks[1].play();
            //         console.log("battle")
            //         break;
            //     case "GameOver":
            //         this.tracks[1].pause();
            //         this.tracks[0].play();
            //         console.log("gameover")
            //         break;
            //     default:
            //         this.tracks[0].pause();
            //         this.tracks[1].pause();
            //         console.log("DEFAULT")
            //         break;
              
            // }
        } 
    }

    pauseMusic() {
        debugger
        this.tracks[0].muted = true;
        this.tracks[1].muted = true;
    }

    restartGame() {
        this.wordBox.classList.toggle("hide")
        this.infoBox.classList.toggle("hide")
        document.getElementById("Game-Over").classList.toggle("hide");
        this.startGame();


    }

    newGame(e) {
        e.preventDefault();
        if (e.code === "Enter")
        {
            document.removeEventListener("keydown", this.newGame);
                this.restartGame();
        }
    }
}

export default Game; 

