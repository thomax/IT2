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
      width: spriteSize,
      height: spriteSize
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
    this.element.innerText = this.score
  }

  carrySheep() {
    this.isCarryingSheep = true
  }

}

class Ghost extends GameObject {
  constructor(x, y, speed, element) {
    super(x, y, element)
    this.speed = speed
    this.direction = randomBetween(0, 360)
  }

  changeDirection() {
    // probably improve this into bounce direction
    this.direction = randomBetween(0, 360)
  }

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
  spawnGhost()
  for (let i = 0; i < initialObstacleCount; i++) {
    spawnObstacle()
  }
  gameLoop()
}

function spawnPlayer() {
  const element = document.getElementById('player')
  player = new Player(freezoneWidth / 2, gameHeight / 2, playerSpeed, element)
}

function spawnGhost() {
  const element = document.createElement('div')
  element.classList.add('ghost')
  const x = randomBetween(freezoneWidth, gameWidth - freezoneWidth - spriteSize)
  const y = randomBetween(0, gameHeight - spriteSize)
  gameAreaElement.appendChild(element)
  ghost = new Ghost(x, y, ghostSpeed, element)
  ghosts.push(ghost)
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
  if (pressedKeys.w || pressedKeys.ArrowUp) {
    player.moveInDirection(player.speed, 'up')
  } else if (pressedKeys.a || pressedKeys.ArrowLeft) {
    player.moveInDirection(player.speed, 'left')
  } else if (pressedKeys.d || pressedKeys.ArrowRight) {
    player.moveInDirection(player.speed, 'right')
  } else if (pressedKeys.s || pressedKeys.ArrowDown) {
    player.moveInDirection(player.speed, 'down')
  }
}

function moveGhost(ghost) {
  const dx = Math.sin(ghost.direction) * ghost.speed
  const dy = Math.cos(ghost.direction) * ghost.speed
  ghost.move(dx, dy)
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
  // player pick up sheep
  if (!player.isCarryingSheep && isColliding(player.rect(), sheep.rect())) {
    // plukke opp sauen
    player.isCarryingSheep = true
    sheep.isCarried = true
    // fjerne sauen fra friområdet
    sheep.element.remove()
    // endre css på player
    player.element.style.border = '3px solid black'
    // redusere fart
    player.changeSpeed(playerSpeed / 2)
  }

  // player drop off sheep
  if (player.isCarryingSheep && isInside(player.rect(), freezoneLeftRect)) {
    // fjerne border
    player.element.style.border = 'none'
    // øke speed
    player.changeSpeed(playerSpeed)
    // ikke carried
    sheep.isCarried = false
    player.isCarryingSheep = false
    // ny sau
    spawnSheep()
    // endre score
    player.increaseScore()
    // legg til flere problemer
    spawnGhost()
    spawnObstacle()
  }
  // player vs obstacles
  obstacles.forEach(anObstacle => {
    if (isColliding(player.rect(), anObstacle.rect())) {
      player.revertToPreviousPosition()
    }
  })

  ghosts.forEach(ghost => {
    // ghosts vs game area
    if (!isInside(ghost.rect(), middleGameZoneRect)) {
      // ghost er utenfor
      ghost.revertToPreviousPosition()
      ghost.changeDirection()
    }

    // ghosts vs player
    if (isColliding(ghost.rect(), player.rect())) {
      gameOver = true
    }
  })
}

function gameLoop() {
  if (gameOver) {
    // handle game over
    alert("game over")
  } else {
    // keep playing
    movePlayer()
    ghosts.forEach(ghost => {
      moveGhost(ghost)
    })
    checkCollisions()
    window.requestAnimationFrame(gameLoop)
  }
}


const gameWidth = 600
const gameHeight = 400
const spriteSize = 20
const freezoneWidth = 50
const playerSpeed = 6
const ghostSpeed = 3
const initialObstacleCount = 3
const gameAreaElement = document.getElementById('gameArea')
const gameAreaRect = { x: 0, y: 0, width: gameWidth, height: gameHeight }
const freezoneLeftRect = { x: 0, y: 0, width: freezoneWidth, height: gameHeight }
const middleGameZoneRect = { x: freezoneWidth, y: 0, width: gameWidth - (freezoneWidth * 2), height: gameHeight }
const pressedKeys = {}
let gameOver = false

// GameObjects, maybe these belong in an array on the Game instance
const obstacles = []
const ghosts = []
let sheep
let player

document.addEventListener('keydown', onKeyDown)
document.addEventListener('keyup', onKeyUp)
initializeGame()