class Game {

}

class GameObject {
  constructor(x, y, element) {
    this.x = x
    this.y = y
    this.previousX = x
    this.previousX = y
    this.element = element
    this.positionAt(this.x, this.y)
  }

  rect() {
    return {
      x: this.x,
      y: this.y,
      width: this.element.style.width,
      height: this.element.style.height
    }
  }

  positionAt(x, y) {
    this.x = x
    this.y = y
    this.element.style.left = Math.floor(this.x) + 'px'
    this.element.style.top = Math.floor(this.y) + 'px'
  }

  move(dx, dy) {
    this.previousX = this.x
    this.previousY = this.y
    this.x += dx
    this.y += dy
    this.positionAt(this.x, this.y)
  }

  revertToPreviousPosition() {
    this.positionAt(this.previousX, this.previousY)
  }
}

class Player extends GameObject {
  constructor(x, y, speed, element) {
    super(x, y, element)
    this.speed = speed
    this.score = 0
    this.isCarryingSheep = false
  }

  moveInDirection(distance, direction) {
    if (direction === 'up') {
      this.move(0, -distance)
    }
    if (direction === 'down') {
      this.move(0, distance)
    }
    if (direction === 'left') {
      this.move(-distance, 0)
    }
    if (direction === 'right') {
      this.move(distance, 0)
    }
  }

  changeSpeed(newSpeed) {
    this.speed = newSpeed
  }

  increaseScore() {
    this.score += 1
  }

  carrySheep() {
    this.isCarryingSheep = true
  }

}

class Ghost extends GameObject {

}

class Obstacle extends GameObject {
  constructor(x, y, element) {
    super(x, y, element)
  }

}

class Sheep extends GameObject {
  constructor(x, y, element) {
    super(x, y, element)
    this.isCarried = false
  }
  // blirLøftet() utgår foreløpig

  removeSheep() {
    // TODO
  }

}

// all setup goes here
function initializeGame() {
  spawnPlayer()
  spawnSheep()
  for (let i = 0; i < initialObstacleCount; i++) {
    spawnObstacle()
  }
  gameLoop()
}

function spawnPlayer() {
  const element = document.getElementById('player')
  player = new Player(freezoneWidth / 2, gameHeight / 2, playerSpeed, element)
}

function spawnSheep() {
  const x = randomBetween(gameWidth - freezoneWidth, gameWidth - spriteSize)
  const y = randomBetween(0, gameHeight - spriteSize)
  // create div for obstacle
  const element = document.createElement('div')
  element.id = 'sheep'
  // add div to gameAreaElement
  gameAreaElement.appendChild(element)
  sheep = new Sheep(x, y, element)
}

function spawnObstacle() {
  const x = randomBetween(freezoneWidth, gameWidth - freezoneWidth - spriteSize)
  const y = randomBetween(0, gameHeight - spriteSize)
  // create div for obstacle
  const element = document.createElement('div')
  element.className = 'obstacle'
  // add div to gameAreaElement
  gameAreaElement.appendChild(element)
  const obstacle = new Obstacle(x, y, element)
  obstacles.push(obstacle)
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function onKeyDown(event) {
  pressedKeys[event.key] = true
}

function onKeyUp(event) {
  pressedKeys[event.key] = false
}

function movePlayer() {
  if (pressedKeys.w) {
    player.moveInDirection(playerSpeed, 'up')
  } else if (pressedKeys.a) {
    player.moveInDirection(playerSpeed, 'left')
  } else if (pressedKeys.d) {
    player.moveInDirection(playerSpeed, 'right')
  } else if (pressedKeys.s) {
    player.moveInDirection(playerSpeed, 'down')
  }
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


function checkCollisions() {
  // player vs gameArea
  if (!isInside(player.rect(), gameAreaRect)) {
    player.revertToPreviousPosition()
  }
  // player vs sheep
  if (isColliding(player.rect(), sheep.rect())) {
    console.log('player colliding with sheep')
  }
  // player vs obstacles
  // ghosts vs game area
  // ghosts vs player
}

function gameLoop() {
  movePlayer()
  // moveGhosts()
  checkCollisions()
  window.requestAnimationFrame(gameLoop)
}


const gameWidth = 600
const gameHeight = 400
const spriteSize = 20
const freezoneWidth = 50
const playerSpeed = 10
const initialObstacleCount = 3
const gameAreaElement = document.getElementById('gameArea')
const gameAreaRect = { x: 0, y: 0, width: gameWidth - spriteSize, height: gameHeight - spriteSize } // modified to get realistic collisions
const pressedKeys = {}

// GameObjects, maybe these belong in an array on the Game instance
const obstacles = []
let sheep
let player

document.addEventListener('keydown', onKeyDown)
document.addEventListener('keyup', onKeyUp)
initializeGame()