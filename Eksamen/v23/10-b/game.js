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
    scoreElement.innerText = this.score
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

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function initializeGame() {
  // spawn whatever
  spawnTroll()
  // spawn food
  for (let n = 0; n < initialFoodCount; n++) {
    spawnFood()
  }
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
    foods.forEach((food, index) => {
      if (isColliding(food.rect(), troll.rect())) {
        // goooood stemning
        troll.increaseScore()
        troll.increseSpeed(speedIncrement)
        // remove food
        food.element.remove()
        foods.splice(index, 1)
        // spawn obstacle, but wait to avoid instakill
        setTimeout(() => {
          spawnObstacle(food.x, food.y)
        }, 500)
        spawnFood()
      }
    })

    // check obstacle collision
    obstacles.forEach(obstacle => {
      if (isColliding(obstacle.rect(), troll.rect())) {
        gameOver = true
        gameOverReason = 'You hit an obstacle'
      }
    })

    window.requestAnimationFrame(gameLoop)
  }
}

function spawnTroll() {
  const element = document.getElementById('troll')
  troll = new Troll(gameWidth / 2, gameHeight / 2, trollInitialSpeed, element)
}

function spawnFood() {
  const element = document.createElement('div')
  element.classList.add('food')
  gameAreaElement.appendChild(element)
  const x = randomBetween(0, gameWidth - spriteSize)
  const y = randomBetween(0, gameHeight - spriteSize)
  const food = new Food(x, y, element)

  const allTheThings = foods.concat(obstacles).concat([troll])
  ensureItemNotOverlappingWithThings(food, allTheThings)

  foods.push(food)
}

function ensureItemNotOverlappingWithThings(item, things) {
  things.forEach(thing => {
    while (isColliding(thing.rect(), item.rect())) {
      console.log('overlapping, reposition')
      const x = randomBetween(0, gameWidth - spriteSize)
      const y = randomBetween(0, gameHeight - spriteSize)
      item.positionAt(x, y)
    }
  })
}

function spawnObstacle(x, y) {
  const element = document.createElement('div')
  element.classList.add('obstacle')
  gameAreaElement.appendChild(element)
  obstacle = new Obstacle(x, y, element)
  obstacles.push(obstacle)
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
const initialFoodCount = 3
const gameWidth = 1000
const gameHeight = 600
const gameAreaRect = { x: 0, y: 0, width: gameWidth, height: gameHeight }
const gameAreaElement = document.getElementById('gameArea')
const scoreElement = document.getElementById('score')
const messageElement = document.getElementById('message')
document.addEventListener('keydown', onKeyDown)

const foods = []
const obstacles = []

let gameOver = false
let troll
let gameOverReason

initializeGame()


