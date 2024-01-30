
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
    this.x += dx
    this.y += dy
    this.positionAt(this.x, this.y)
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
  spawnGameObject('player')
  spawnGameObject('sheep')
  spawnGameObject('ghost')
  Array(3).fill(null).map(_ => spawnGameObject('obstacle'))
  window.requestAnimationFrame(gameLoop)
}

function spawnGameObject(objectType) {
  const element = document.createElement('div')
  if (objectType === 'player' || objectType === 'sheep') {
    element.id = objectType
  } else {
    element.classList.add(objectType)
  }
  gameArea.appendChild(element)
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

function handleKeyDown(event) {
  if (event.key === 'w') {
    player.moveInDirection(player.speed, 'up')
  } else if (event.key === 's') {
    player.moveInDirection(player.speed, 'down')
  } else if (event.key === 'a') {
    player.moveInDirection(player.speed, 'left')
  } else if (event.key === 'd') {
    player.moveInDirection(player.speed, 'right')
  }
}

function randomLocation(objectType) {
  if (objectType === 'sheep') {
    return {
      x: randomBetween(gameWidth - freeZoneWidth, gameWidth - spriteSize),
      y: Math.random() * gameHeight - spriteSize
    }
  } else if (objectType === 'player') {
    return { x: 20, y: gameHeight / 2 } // player always starts at same location
  }
  return {
    x: randomBetween(freeZoneWidth, gameWidth - freeZoneWidth - spriteSize),
    y: Math.random() * gameHeight - spriteSize
  }
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function moveGhosts() {
  ghosts.forEach(ghost => {
    // calculate vector based on 0-360 angle
    const angleRadians = ghost.direction * (Math.PI / 180)
    const vector = {
      x: Math.cos(angleRadians) * ghostSpeed,
      y: Math.sin(angleRadians) * ghostSpeed
    }
    ghost.move(vector.x, vector.y)
  })
}

function checkCollisions() {
  // check if ghosts are within bounds
  ghosts.forEach((ghost) => {
    if (ghost.x < freeZoneWidth || ghost.x > gameWidth - freeZoneWidth - spriteSize) {
      // bounce off a vertical wall
      ghost.changeDirection(180 - ghost.direction)
    } else if (ghost.y < 0 || ghost.y > gameHeight - spriteSize) {
      // bounce off a horizontal wall
      ghost.changeDirection(360 - ghost.direction)
    }
  })
  // check if player is within bounds
  // check if player has picked up sheep
  // check if player has dropped off sheep
  // check if player has collided with ghost
  // check if player has collided with obstacle
}

function gameLoop() {
  moveGhosts()
  checkCollisions()
  window.requestAnimationFrame(gameLoop)
}

// DOM elements
const gameArea = document.getElementById('gameArea')

// Event listeners
document.addEventListener('DOMContentLoaded', initGame)
document.addEventListener('keydown', handleKeyDown)

// Global variables
let game, player, sheep
const obstacles = []
const ghosts = []
const gameWidth = 600
const gameHeight = 400
const freeZoneWidth = 50
const defaultPlayerSpeed = 10
const ghostSpeed = 2
const spriteSize = 20

