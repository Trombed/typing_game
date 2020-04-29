## TYPING FANTASY
---
<img src="images/readme/demo.gif" />

Typing Fantasy is a speed typing game inspired by the classic game, The Typing of the Dead developed by Sega. 

As a swarm of enemy and dragon approaches the black mage, the player must input the 

Technologies used: Javascript, CSS3, HTML5

[Live Site](https://trombed.github.io/typing_game/)

---



## Canvas and DOM Manipulation
---
<img src="images/readme/layers.png" width="600px" />
Instead of drawing everything onto the canvas, I took a different approach of only using canvas for drawing sprites and sprites animations only. 

Background images are rendered as background-images of a div on a layer beneath the canvas. This approach lets me use CSS animation or translation to perform different effects on background changes.

Each word on top of enemies is a div container that is rendered on top of the canvas. I find this approach makes styling easier and text easier to read. 




CSS Animation Timed Event:
---

![LevelUp](/images/readme/level-up.gif)

One aspect I use css for animation was for a timer function instead of using a setInterval, I did this through DOM manipulation and events listeners.

When an animation is needed, the css class is added to the element. Afterward by adding a event listener to look for when the "animation end", it removes the animation class and event listener.


```
 showLevelUp() {
        let animate = document.getElementById("Level-Up")
        animate.classList.add("Level-Up-Animation")

        animate.addEventListener("animationend", () => {
            animate.classList.remove("Level-Up-Animation")
        })

        animate.removeEventListener("animationend", () => {
            animate.classList.remove("Level-Up-Animation")
        })
    }
```

```
.Level-Up-Animation {
    animation: level 3s;
}

keyframes level {
    0% { opacity: 0%;}
    100% { opacity: 100%;}
}
```


