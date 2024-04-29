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

  isInside(innerRect, outerRect) {
    return innerRect.x >= outerRect.x &&
      innerRect.x + innerRect.width <= outerRect.x + outerRect.width &&
      innerRect.y >= outerRect.y &&
      innerRect.y + innerRect.height <= outerRect.y + outerRect.height
  }

  isColliding(otherRect) {
    const { x, y, width, height } = this.rect()
    return x < otherRect.x + otherRect.width &&
      x + width > otherRect.x &&
      y < otherRect.y + otherRect.height &&
      y + height > otherRect.y
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
  messageElement.innerText = "We're expecting great things from you"

  // spawn whatever
  gameLoop()
}

// every game tick
function gameLoop() {
  maybeUpdateMessage()
  if (gameOver) {

  } else {
    // check collisions etc
    window.requestAnimationFrame(gameLoop)
  }
}

function maybeUpdateMessage() {
  if (player.score > 5) {
    messageElement.innerText = "You're performance is adequate"
  }
}

initializeGame()

const spriteSize = 15
const speedIncrement = 1
const gameWidth = 100
const gameHeight = 600
const gameAreaRect = { x: 0, y: 0, width: gameWidth, height: gameHeight }
const gameAreaElement = document.getElementById('gameArea')
const scoreElement = document.getElementById('score')
const messageElement = document.getElementById('message')
let gameOver = false


