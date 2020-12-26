
class Explosion {
  constructor (ctx, canvas, x, y) {
    this.ctx = ctx
    this.canvas = canvas
    this.x = x
    this.y = y
    this.shift = 0
    this.explosion = new Image()
    this.explosion.src = './images/explosion.png'
    this.finished = false
    this.effect = new Image()
    this.effect.src = './images/effect.png'
  }

  drawExplosion () {
    this.ctx.drawImage(this.explosion, this.shift, 0, 128, 128, this.x - 30, this.y - 30, 128, 128)
  }

  changeFrames () {
    this.shift += 128
    if (this.shift > 1500) {
      this.shift = 0
      this.finished = true
    }
  }

  draw () {
    this.drawExplosion()
  }
}

export default Explosion
