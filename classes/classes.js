class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position
    this.height = 150
    this.width = 50
    this.image = new Image()
    this.image.src = imageSrc
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y)
  }
  update() {
    this.draw()
  }
}

//Player class
class Fignter {
  constructor({ position, velocity, color, offset }) {
    this.position = position
    this.velocity = velocity
    this.height = 150
    this.width = 50
    this.color = color
    this.lastKey
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 100,
      height: 50,
      offset,
    }
    this.isAttacking
    this.health = 100
  }

  draw() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  //attack box
  drawAttackBox() {
    ;(ctx.fillStyle = 'green'),
      ctx.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      )
  }

  update() {
    this.draw()
    if (this.isAttacking) this.drawAttackBox()

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.height + this.position.y + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0
    } else this.velocity.y += gravity
  }

  attack() {
    this.isAttacking = true
    setTimeout(() => {
      this.isAttacking = false
    }, 100)
  }
}
