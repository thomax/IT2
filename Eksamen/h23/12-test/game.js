
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
  player = new Player(20, gameHeight / 2, 10, playerElement)
  const sheepLoc = randomLocation('sheep')
  sheep = new Sheep(sheepLoc.x, sheepLoc.y, sheepElement)
  obstacles = Array.from(obstacleElements).map(element => {
    const loc = randomLocation('obstacle')
    return new Obstacle(loc.x, loc.y, element)
  })
  ghosts = Array.from(ghostElements).map(element => {
    const loc = randomLocation('ghost')
    return new Ghost(loc.x, loc.y, element)
  })
  window.requestAnimationFrame(gameLoop)
}

function spawnObstacle() {

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
const playerElement = document.getElementById('player')
const sheepElement = document.getElementById('sheep')
const obstacleElements = document.getElementsByClassName('obstacle')
const ghostElements = document.getElementsByClassName('ghost')

// Event listeners
document.addEventListener('keydown', handleKeyDown)
document.addEventListener('DOMContentLoaded', initGame)

// Global variables
let game, player, sheep, obstacles, ghosts
const gameWidth = 600
const gameHeight = 400
const freeZoneWidth = 50
const ghostSpeed = 2
const spriteSize = 20

