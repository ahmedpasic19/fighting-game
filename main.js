const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const backgroud = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: '../images/background.png',
})

const player = new Fignter({
  position: { x: 50, y: 10 },
  velocity: { x: 0, y: 10 },
  offset: { x: 0, y: 0 },
  color: 'blue',
})
const enemy = new Fignter({
  position: { x: 200, y: 10 },
  velocity: { x: 0, y: 10 },
  offset: { x: -50, y: 0 },
  color: 'red',
})

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
}

function recangularColision({ recangle1, rectangle2 }) {
  return (
    recangle1.attackBox.position.x + recangle1.attackBox.width >=
      rectangle2.position.x &&
    recangle1.attackBox.position.x + recangle1.width <=
      rectangle2.position.x + rectangle2.width &&
    recangle1.attackBox.position.y + recangle1.attackBox.height >=
      rectangle2.position.y &&
    recangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}

//Restart game
function restart(e) {
  e.preventDefault()
  window.location.reload()
}

let timer = 60
function decreaceTimer() {
  if (timer > 0) {
    setTimeout(decreaceTimer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  }

  //Display dashboard & winner
  if (player.health > enemy.health && timer <= 0) {
    document.querySelector('#dashboard').addEventListener('click', restart)
    document.querySelector('#dashboard').style.display = 'flex'
    document.querySelector('#dashboard').innerHTML = 'Player won'
  }
  if (player.health < enemy.health && timer <= 0) {
    document.querySelector('#dashboard').addEventListener('click', restart)
    document.querySelector('#dashboard').style.display = 'flex'
    document.querySelector('#dashboard').innerHTML = 'Enemy won'
  }
  if (player.health === enemy.health && timer <= 0) {
    document.querySelector('#dashboard').addEventListener('click', restart)
    document.querySelector('#dashboard').style.display = 'flex'
    document.querySelector('#dashboard').innerHTML = 'Tie'
  }
}

decreaceTimer()

function animate() {
  window.requestAnimationFrame(animate)
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  backgroud.draw()
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

  //player mvnt
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5
  }

  //enemy mvnt
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5
  }

  //Player attack
  if (
    recangularColision({ recangle1: player, rectangle2: enemy }) &&
    player.isAttacking
  ) {
    player.isAttacking = false
    enemy.health -= 20
    document.querySelector('#enemyHealth').style.width = enemy.health + '%'
  }
  //Enemy attack
  if (
    recangularColision({ recangle1: player, rectangle2: enemy }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false
    player.health -= 20
    document.querySelector('#playerHealth').style.width = player.health + '%'
  }
  //Display dashboard & winner
  if (enemy.health <= 0) {
    document.querySelector('#dashboard').addEventListener('click', restart)
    document.querySelector('#dashboard').style.display = 'flex'
    document.querySelector('#dashboard').innerHTML = 'Player 1 wins'
  }
  if (player.health <= 0) {
    document.querySelector('#dashboard').addEventListener('click', restart)
    document.querySelector('#dashboard').style.display = 'flex'
    document.querySelector('#dashboard').innerHTML = 'Player 2 wins'
  }
}

animate()

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'd':
      keys.d.pressed = true
      player.lastKey = 'd'
      break
    case 'a':
      keys.a.pressed = true
      player.lastKey = 'a'
      break
    case 'w':
      keys.w.pressed = true
      if (player.velocity.y === 0) player.velocity.y = -20
      break
    case ' ':
      player.attack()
      break

    case 'ArrowRight':
      keys.ArrowRight.pressed = true
      enemy.lastKey = 'ArrowRight'
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true
      enemy.lastKey = 'ArrowLeft'
      break
    case 'ArrowUp':
      keys.ArrowUp.pressed = true
      if (enemy.velocity.y === 0) enemy.velocity.y = -20
      break
    case 'ArrowDown':
      enemy.attack()
      break
  }
})

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 'w':
      keys.w.pressed = false
      break

    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
    case 'ArrowUp':
      keys.ArrowUp.pressed = false
      break
  }
})
