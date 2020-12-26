class Mage {
  constructor (ctx, canvas) {
    this.ctx = ctx
    this.canvas = canvas
    this.y = 250
    this.x = 5
    this.image = new Image()
    this.image.src = './images/mage.png'
    this.shift = 142
    this.chantingShift = 90
    this.alive = true
  }

  drawMage () {
    this.ctx.drawImage(this.image, this.shift,
      0, 50, 50,
      this.x, this.y,
      60, 60)
  }

  drawDead () {
    this.ctx.drawImage(this.image, 0,
      0, 50, 50,
      this.x, this.y,
      60, 60)
  }

  changeFrames () {
    this.shift += 50
    if (this.shift > 200) {
      this.shift = 142
    }
  }

  draw () {
    this.drawMage()
  }

  drawChant () {
    this.drawChanting()
  }

  drawChanting () {
    this.ctx.drawImage(this.image, this.chantingShift,
      50, 50, 50,
      this.x, this.y,
      60, 60)
  }

  changeChantingFrames () {
    this.chantingShift += 48
    if (this.chantingShift > 180) {
      this.chantingShift = 90
    }
  }
}

export default Mage
