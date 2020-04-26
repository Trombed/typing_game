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
    
    document.fonts.ready
    const game = new Game(ctx, canvas, wordBox, input, infoBox, cursor, hpBox, killsBox, wpmBox);
    
    document.addEventListener("keydown", start)
    
    function start(e) {
      if (e.code === "Enter") {
        console.log("test");
        document.getElementById("Splash").classList.add("hide");
        document.removeEventListener("keydown", start);
        debugger
        game.startGame();
      }

    }
  });