import Game from "./game";
import Splash from "./splash"

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("game-canvas")
  
    const ctx = canvas.getContext("2d");

    const input = document.getElementById("user-input")
    document.fonts.ready
    const splash = new Splash(ctx, canvas);
    const game = new Game(ctx, canvas, input);
    
    canvas.addEventListener("click", game.startGame)
  });