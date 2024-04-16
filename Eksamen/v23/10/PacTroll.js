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

  revertToPreviousPosition() {
    this.positionAt(this.previousX, this.previousY)
  }
}

class Player extends GameObject {
  constructor(x, y, speed, element) {
    super(x, y, element)
    this.speed = speed
    this.score = 0
    this.currentDirection = 'right'
  }

  moveInCurrentDirection() {
    if (this.currentDirection === 'up') {
      this.move(0, -this.speed)
    }
    if (this.currentDirection === 'down') {
      this.move(0, this.speed)
    }
    if (this.currentDirection === 'left') {
      this.move(-this.speed, 0)
    }
    if (this.currentDirection === 'right') {
      this.move(this.speed, 0)
    }
  }

  changeSpeed(newSpeed) {
    this.speed = newSpeed
  }

  increaseScore() {
    this.score += 1
    this.element.innerText = this.score
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


// all setup goes here
function initializeGame() {
  spawnPlayer()
  for (let i = 0; i < initialFoodCount; i++) {
    spawnFood()
  }
  gameLoop()
}

function spawnPlayer() {
  const element = document.getElementById('player')
  const x = gameAreaRect.width / 2
  const y = gameAreaRect.height / 2
  player = new Player(x, y, initialPlayerSpeed, element)
}

function spawnFood() {
  const element = document.createElement('div')
  element.classList.add('food')
  const { x, y } = randomCoordinates()
  const food = new Food(x, y, element)
  gameAreaElement.appendChild(element)
  ensureNoCollisions(food)
  foods.push(food)
}

function spawnObstacle(x, y) {
  const element = document.createElement('div')
  element.classList.add('obstacle')
  const obstacle = new Obstacle(x, y, element)
  gameAreaElement.appendChild(element)
  obstacles.push(obstacle)
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function randomCoordinates() {
  return {
    x: randomBetween(gameAreaRect.x, gameAreaRect.width - spriteSize),
    y: randomBetween(gameAreaRect.y, gameAreaRect.height - spriteSize)
  }
}

function onKeyDown(event) {
  switch (event.code) {
    case 'KeyW':
    case 'ArrowUp':
      player.currentDirection = 'up'
      break
    case 'KeyA':
    case 'ArrowLeft':
      player.currentDirection = 'left'
      break
    case 'KeyD':
    case 'ArrowRight':
      player.currentDirection = 'right'
      break
    case 'KeyS':
    case 'ArrowDown':
      player.currentDirection = 'down'
      break
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

function ensureNoCollisions(thing) {
  while (isColliding(thing.rect(), player.rect())) {
    const { x, y } = randomCoordinates()
    console.log('reposition because of collision with player')
    thing.positionAt(x, y)
  }
  while (foods.some(food => isColliding(thing.rect(), food.rect()))) {
    const { x, y } = randomCoordinates()
    console.log('reposition because of collision with other food')
    thing.positionAt(x, y)
  }
  while (obstacles.some(obstacle => isColliding(thing.rect(), obstacle.rect()))) {
    const { x, y } = randomCoordinates()
    console.log('reposition because of collision with obstacle')
    thing.positionAt(x, y)
  }
}


function checkCollisions() {
  // player vs gameArea
  if (!isInside(player.rect(), gameAreaRect)) {
    //player.revertToPreviousPosition()
    gameOver = true
    gameOverReason = 'Player left game area'
  }
  //player vs obstacles
  obstacles.forEach(anObstacle => {
    if (isColliding(player.rect(), anObstacle.rect())) {
      gameOver = true
      gameOverReason = 'Player hit an obstacle'
    }
  })

  //player vs food
  foods.forEach(food => {
    if (isColliding(player.rect(), food.rect())) {
      player.increaseScore()
      // increase player speed
      player.changeSpeed(player.speed + 0.5)
      // remove food from array
      foods.splice(foods.indexOf(food), 1)
      // remove food from DOM
      food.element.remove()
      // spawn obstacle at food location, but with delay to avoid immediate collision
      setTimeout(() => {
        spawnObstacle(food.x, food.y)
      }, 300)
      // spawn new food
      spawnFood()
    }
  })

}

function gameLoop() {
  if (gameOver) {
    // handle game over
    const element = document.getElementById('whytho')
    element.innerText = `Game over: ${gameOverReason}`
  } else {
    // keep playing
    player.moveInCurrentDirection()
    checkCollisions()
    window.requestAnimationFrame(gameLoop)
  }
}

const gameWidth = 600
const gameHeight = 400
const gameAreaRect = { x: 0, y: 0, width: gameWidth, height: gameHeight }
const gameAreaElement = document.getElementById('gameArea')

const spriteSize = 20
const initialPlayerSpeed = 2
const initialFoodCount = 3

let currentKey = undefined
let gameOver = false
let gameOverReason = ''

// GameObjects, maybe these belong in an array on the Game instance
const obstacles = []
const foods = []
let player

document.addEventListener('keydown', onKeyDown)

initializeGame()