class GameObject {
  constructor(x, y, element) {
    this.x = x
    this.y = y
    this.element = element
    this.positionAt(x, y)
  }

  positionAt(x, y) {
    this.x = x
    this.y = y
    this.element.style.left = this.x + 'px'
    this.element.style.top = this.y + 'px'
  }

  rect() {
    return {
      x: this.x,
      y: this.y,
      width: spriteSize,
      height: spriteSize
    }
  }
}

class Troll extends GameObject {
  constructor(x, y, speed, element) {
    super(x, y, element)
    this.speed = speed
    this.score = 0
    this.direction = undefined
  }

  move() {
    if (this.direction === "up") {
      this.positionAt(this.x, this.y - this.speed)
    } else if (this.direction === "down") {
      this.positionAt(this.x, this.y + this.speed)
    } else if (this.direction === "left") {
      this.positionAt(this.x - this.speed, this.y)
    } else if (this.direction === "right") {
      this.positionAt(this.x + this.speed, this.y)
    }
  }

  increaseScore() {
    this.score++
  }

  increseSpeed() {
    this.speed += speedIncrement
  }
}

class Food extends GameObject {
  constructor(x, y, element) {
    super(x, y, element)
  }
}

class Obstacle extends GameObject {
  constructor(x, y, element) {
    super(x, y, element)
  }
}

function initializeGame() {
  // spawn whatever
  spawnTroll()
  // spawn food
  gameLoop()
}

// every game tick
function gameLoop() {
  if (gameOver) {
    messageElement.innerText = 'Game over: ' + gameOverReason
  } else {
    troll.move()
    // check collisions etc
    if (!isInside(troll.rect(), gameAreaRect)) {
      gameOver = true
      gameOverReason = 'You left the game area'
    }
    // check food collision
    // check obstacle collision
    window.requestAnimationFrame(gameLoop)
  }
}

function spawnTroll() {
  const element = document.getElementById('troll')
  troll = new Troll(gameWidth / 2, gameHeight / 2, trollInitialSpeed, element)
}

function isInside(innerRect, outerRect) {
  return innerRect.x >= outerRect.x &&
    innerRect.x + innerRect.width <= outerRect.x + outerRect.width &&
    innerRect.y >= outerRect.y &&
    innerRect.y + innerRect.height <= outerRect.y + outerRect.height
}

function isColliding(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
}

function onKeyDown(event) {
  if (['KeyA', 'ArrowLeft'].includes(event.code)) {
    troll.direction = 'left'
  } else if (['KeyD', 'ArrowRight'].includes(event.code)) {
    troll.direction = 'right'
  } else if (['KeyW', 'ArrowUp'].includes(event.code)) {
    troll.direction = 'up'
  } else if (['KeyS', 'ArrowDown'].includes(event.code)) {
    troll.direction = 'down'
  }
}

const spriteSize = 15
const trollInitialSpeed = 2
const speedIncrement = 1

const gameWidth = 1000
const gameHeight = 600
const gameAreaRect = { x: 0, y: 0, width: gameWidth, height: gameHeight }
const gameAreaElement = document.getElementById('gameArea')
const scoreElement = document.getElementById('score')
const messageElement = document.getElementById('message')
document.addEventListener('keydown', onKeyDown)

let gameOver = false
let troll
let gameOverReason

initializeGame()


