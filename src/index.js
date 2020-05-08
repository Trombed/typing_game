import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("game-canvas")
  
    const ctx = canvas.getContext("2d");

    const input = document.getElementById("user-input")

    const checkPress = (e) => {
      if (e.keyCode === 32) e.preventDefault();
    }
    input.addEventListener("keypress", checkPress) 

    const infoBox = document.getElementById("Info")
    const cursor = document.getElementById("cursor")
    const wordBox = document.getElementById("Words")
    const hpBox = document.getElementById("HP")
    const killsBox = document.getElementById("KILLS")
    const wpmBox = document.getElementById("WPM")
    const volumeControl = document.getElementById("Volume")
    volumeControl.addEventListener("click", toggleMusic)
    let muted = false

    const howTo = document.getElementById("How-To")
    const helpBox = document.getElementById("Help-Box")

    howTo.addEventListener("click", showHelp)
    function showHelp(e) {

      console.log("test")
      helpBox.classList.toggle("hide")
    }

    
    function toggleMusic() {
      muted = !muted;

      switch (muted) {
        case true:
          volumeControl.innerHTML = '<img src="./images/unmuted.svg" class="Volume-Icon" id="Volume-Icon">'
          break;
        case false: 
          volumeControl.innerHTML = '<img src="./images/muted.svg" class="Volume-Icon" id="Volume-Icon">'
          break;
      }
      
    }

    document.fonts.ready
    const game = new Game(ctx, canvas, wordBox, input, infoBox, cursor, hpBox, killsBox, wpmBox, muted);
    
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

   
  });