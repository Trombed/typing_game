import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("game-canvas")
  
    const ctx = canvas.getContext("2d");

    const input = document.getElementById("user-input")
    const infoBox = document.getElementById("Info")
    const cursor = document.getElementById("cursor")
    const wordBox = document.getElementById("Words")
    const hpBox = document.getElementById("HP")
    const killsBox = document.getElementById("KILLS")
    const wpmBox = document.getElementById("WPM")
    const tracks = []
    const preludeMusic = new Audio("./sound/prelude.mp3")
    const battleMusic = new Audio("./sound/battle.mp3")
    const volumeControl = document.getElementById("Volume")
    let muted = false; 

    volumeControl.addEventListener("click", toggleMusic)

    tracks.push(preludeMusic, battleMusic);
    
    document.fonts.ready
    const game = new Game(ctx, canvas, wordBox, input, infoBox, cursor, hpBox, killsBox, wpmBox, tracks, muted);
    
    document.addEventListener("keydown", start)
    
    function start(e) {
      if (e.code === "Enter") {
        let splash = document.getElementById("Splash")
        splash.classList.add("Swirl");
        splash.addEventListener("animationstart", () => {
          document.removeEventListener("keydown", start);
          game.startGame();
        
          splash.addEventListener("animationend", () => {
            document.getElementById("Splash").classList.add("hide");
          })
        })
      }

    }

    function toggleMusic() {
      muted = !muted;
      console.log(muted)
      switch (muted) {
        case false:
          volumeControl.innerHTML = '<img src="./images/unmuted.svg" class="Volume-Icon" id="Volume-Icon">'
          break;
        case true: 
          volumeControl.innerHTML = '<img src="./images/muted.svg" class="Volume-Icon" id="Volume-Icon">'
          break;
      }
      game.playMusic();
    }
  
  });