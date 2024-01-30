class Game {

}

class GameObject {
  constructor(x, y, element) {
    this.x = x
    this.y = y
    this.element = element
    this.positionAt(this.x, this.y)
  }

  positionAt(x, y) {
    this.x = x
    this.y = y
    this.element.style.left = Math.floor(this.x) + 'px'
    this.element.style.top = Math.floor(this.y) + 'px'
  }

  move(dx, dy) {
    this.x += dx
    this.y += dy
    this.positionAt(this.x, this.y)
  }
}

class Player extends GameObject {

}

class Ghost extends GameObject {

}

class Obstacle extends GameObject {
  constructor(x, y, element) {
    super(x, y, element)
  }

}

class Sheep extends GameObject {

}

// all setup goes here
function initializeGame() {
  for (let i = 0; i < 3; i++) {
    spawnObstacle()
  }
}

function spawnObstacle() {
  const x = randomBetween(freezoneWidth, gameWidth - freezoneWidth - spriteSize)
  const y = randomBetween(0, gameHeight - spriteSize)
  // create div for obstacle
  const element = document.createElement('div')
  element.className = 'obstacle'
  console.log(element)
  // add div to gameAreaElement
  gameAreaElement.appendChild(element)
  const obstacle = new Obstacle(x, y, element)
  obstacles.push(obstacle)
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

const gameWidth = 600
const gameHeight = 400
const spriteSize = 20
const freezoneWidth = 50
const obstacles = []
const gameAreaElement = document.getElementById('gameArea')

initializeGame()


