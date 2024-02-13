
class Game {

  constructor(width, height) {
    this.width = width
    this.height = height
    this.gameObjects = []
  }

  addObject(gameObject) {
    this.gameObjects.push(gameObject)
  }

  removeObject(gameObject) {
    this.gameObjects = this.gameObjects.filter(obj => obj !== gameObject)
  }
}

class GameObject {
  constructor(x, y, element) {
    this.x = x
    this.y = y
    this.previousX = 0
    this.previousY = 0
    this.element = element
    this.positionAt(x, y)
  }

  positionAt(x, y) {
    this.x = Math.floor(x)
    this.y = Math.floor(y)
    this.element.style.left = this.x + 'px'
    this.element.style.top = this.y + 'px'
  }

  move(dx, dy) {
    this.previousX = this.x
    this.previousY = this.y
    this.x += dx
    this.y += dy
    this.positionAt(this.x, this.y)
  }

  // this is useful for rolling back movement when a collision is detected
  rollBackMovement() {
    this.positionAt(this.previousX, this.previousY)
  }

  rect() {
    return {
      x: this.x,
      y: this.y,
      width: spriteSize,
      height: spriteSize,
    }
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
    } else if (direction === 'down') {
      this.move(0, distance)
    } else if (direction === 'left') {
      this.move(-distance, 0)
    } else if (direction === 'right') {
      this.move(distance, 0)
    }
  }

  changeSpeed(newSpeed) {
    this.speed = newSpeed
  }

  changeScore() {
    this.score += 1
  }

  carrySheep() {
    this.isCarryingSheep = true
  }
}

class Ghost extends GameObject {
  constructor(x, y, element) {
    super(x, y, element)
    this.direction = Math.random() * 360
  }

  changeDirection(newDirection) {
    this.direction = newDirection
  }

  currentVector() {
    // calculate vector based on 0-360 direction
    const angleRadians = this.direction * (Math.PI / 180)
    return {
      x: Math.cos(angleRadians) * ghostSpeed,
      y: Math.sin(angleRadians) * ghostSpeed
    }
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

  isLifted() {
    return this.isCarried
  }

  removeSheep(game) {
    game.removeObject(this)
  }
}


// set up game
function initGame() {
  game = new Game(gameWidth, gameHeight)
  gameArea.style.width = gameWidth + 'px'
  gameArea.style.height = gameHeight + 'px'
  spawnGameObject('player')
  spawnGameObject('sheep')
  for (let i = 0; i < initialGhostCount; i++) {
    spawnGameObject('ghost')
  }
  for (let i = 0; i < initialObstacleCount; i++) {
    spawnGameObject('obstacle')
  }

  // Begin game loop
  window.requestAnimationFrame(gameLoop)
}

// Spawn game objects. Maybe this should be broken up into separate functions for each object type
function spawnGameObject(objectType) {

  // Create DOM element for object
  const element = document.createElement('div')
  if (objectType === 'player' || objectType === 'sheep') {
    element.id = objectType
  } else {
    element.classList.add(objectType)
  }
  element.style.width = spriteSize + 'px'
  element.style.height = spriteSize + 'px'
  gameArea.appendChild(element)

  // Create game object
  const loc = randomLocation(objectType)
  let obj
  if (objectType === 'obstacle') {
    obj = new Obstacle(loc.x, loc.y, element)
    obstacles.push(obj)
  } else if (objectType === 'ghost') {
    obj = new Ghost(loc.x, loc.y, element)
    ghosts.push(obj)
  } else if (objectType === 'player') {
    obj = new Player(loc.x, loc.y, defaultPlayerSpeed, element)
    player = obj
  } else if (objectType === 'sheep') {
    obj = new Sheep(loc.x, loc.y, element)
    sheep = obj
  }
  game.addObject(obj)
}

function onKeyDown(event) {
  pressedKeys[event.key] = true
}

function onKeyUp(event) {
  pressedKeys[event.key] = false
}

// Where do game objects spawn
function randomLocation(objectType) {
  if (objectType === 'sheep') {
    return {
      x: randomBetween(gameWidth - freeZoneWidth, gameWidth - spriteSize),
      y: randomBetween(0, gameHeight - spriteSize)
    }
  } else if (objectType === 'player') {
    // player always appears at same location
    return { x: 20, y: gameHeight / 2 }
  }
  // ghost or obstacle
  return {
    x: randomBetween(freeZoneWidth, gameWidth - freeZoneWidth - spriteSize),
    y: randomBetween(0, gameHeight - spriteSize)
  }
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function moveGhosts() {
  ghosts.forEach(ghost => {
    const vector = ghost.currentVector()
    ghost.move(vector.x, vector.y)
  })
}

// Move player, allowing diagonal movement. Not sure if this is a good idea
function movePlayer() {
  if (pressedKeys['w'] || pressedKeys.ArrowUp) {
    player.moveInDirection(player.speed, 'up')
  }
  if (pressedKeys['s'] || pressedKeys.ArrowDown) {
    player.moveInDirection(player.speed, 'down')
  }
  if (pressedKeys['a'] || pressedKeys.ArrowLeft) {
    player.moveInDirection(player.speed, 'left')
  }
  if (pressedKeys['d'] || pressedKeys.ArrowRight) {
    player.moveInDirection(player.speed, 'right')
  }
}


function checkGhostCollisions() {
  // check ghost collisions
  ghosts.forEach((ghost) => {
    // check if ghost has collided with player
    if (isColliding(player.rect(), ghost.rect())) {
      gameOver = true
      return
    }

    if (ghost.x < freeZoneWidth || ghost.x > gameWidth - freeZoneWidth - spriteSize) {
      // bounce off a vertical wall
      ghost.rollBackMovement()
      ghost.changeDirection(180 - ghost.direction)
    } else if (ghost.y < 0 || ghost.y > gameHeight - spriteSize) {
      // bounce off a horizontal wall
      ghost.rollBackMovement()
      ghost.changeDirection(360 - ghost.direction)
    }
  })
}

function checkObstacleCollisions() {
  // check if obstacle and player overlap
  obstacles.forEach((obstacle) => {
    if (isColliding(player.rect(), obstacle.rect())) {
      player.rollBackMovement()
    }
  })
}

function checkPlayerCollisions() {
  // check if player is within game area
  if (!isInside(player.rect(), gameAreaRect)) {
    player.rollBackMovement()
  }

  // check if player should pick up sheep
  if (!player.isCarryingSheep && isColliding(player.rect(), sheep.rect())) {
    sheep.isCarried = true
    sheep.element.style.visibility = 'hidden'
    player.isCarryingSheep = true
    player.speed = player.speed / 2
    player.element.style.border = '2px solid yellow'
  }

  // check if player should drop off sheep
  if (player.isCarryingSheep && isInside(player.rect(), dropoffZoneRect)) {
    player.isCarryingSheep = false
    player.speed = player.speed * 2
    player.element.style.border = 'none'
    player.changeScore()
    document.getElementById('score').innerText = player.score

    // not removing and creating new sheep, just recycling it at new spawn location
    sheep.isCarried = false
    sheep.element.style.visibility = 'visible'
    const sheepPos = randomLocation('sheep')
    sheep.positionAt(sheepPos.x, sheepPos.y)

    // add more problems for player
    spawnGameObject('ghost')
    spawnGameObject('obstacle')
  }
}

// check if two rectangles are overlapping
function isColliding(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
}

// check if inner rectangle is inside outer rectangle
function isInside(innerRect, outerRect) {
  return innerRect.x >= outerRect.x &&
    innerRect.x + innerRect.width <= outerRect.x + outerRect.width &&
    innerRect.y >= outerRect.y &&
    innerRect.y + innerRect.height <= outerRect.y + outerRect.height;
}

// this happens every "tick", up to the display frequency of the monitor
function gameLoop() {
  if (gameOver) {
    document.getElementById('message').style.visibility = 'visible'
    return
  } else {
    movePlayer()
    moveGhosts()
    checkGhostCollisions()
    checkObstacleCollisions()
    checkPlayerCollisions()
    window.requestAnimationFrame(gameLoop)
  }
}

// DOM element for game area
const gameArea = document.getElementById('gameArea')

// Event listeners
document.addEventListener('DOMContentLoaded', initGame)
document.addEventListener('keydown', onKeyDown)
document.addEventListener('keyup', onKeyUp)

// Global variables
// Game objects
let game, player, sheep
const obstacles = []
const ghosts = []
// Constants for tweaking how the game works
const gameWidth = 600
const gameHeight = 400
const initialGhostCount = 1
const initialObstacleCount = 3
const freeZoneWidth = 50
const defaultPlayerSpeed = 6
const ghostSpeed = 2
const spriteSize = 20
const pressedKeys = {}
const dropoffZoneRect = { x: 0, y: 0, width: freeZoneWidth, height: gameHeight }
const gameAreaRect = { x: spriteSize, y: spriteSize, width: gameWidth - spriteSize, height: gameHeight - spriteSize }
let gameOver = false

