
const gameAreaElement = document.getElementById('gameArea')
const widgetsElement = document.getElementById('widgets')
const width = window.innerWidth
const height = window.innerHeight - 60
const cellSize = 20
const numberOfColumns = Math.floor(width / cellSize)
const numberOfRows = Math.floor(height / cellSize)
gameAreaElement.style.width = `${width}px`
gameAreaElement.style.height = `${height}px`

let currentGameState = []
let cellElements = []
let gamePaused = false
let updateInterval = 500 //ms

class Cell {
  constructor(x, y, state) {
    this.x = x
    this.y = y
    this.isAlive = state
  }

  toggleState() {
    this.isAlive = !this.isAlive
  }

  updateView(element) {
    if (this.isAlive) {
      element.setAttribute("class", "cell alive")
    } else {
      element.setAttribute("class", "cell dead")
    }
  }

  countLivingNeighbors() {
    let livingNeighbors = 0
    for (let x = this.x - 1; x <= this.x + 1; x++) {
      for (let y = this.y - 1; y <= this.y + 1; y++) {
        if (x >= 0 && x < numberOfColumns && y >= 0 && y < numberOfRows && !(x === this.x && y === this.y)) {
          if (currentGameState[x][y].isAlive) {
            livingNeighbors++
          }
        }
      }
    }
    return livingNeighbors
  }

  // return a new cell object based on its current neighbors
  nextGenerationCell() {
    const livingNeighbors = this.countLivingNeighbors()
    const nextCell = new Cell(this.x, this.y, this.isAlive)
    if (this.isAlive) {
      if (livingNeighbors < 2 || livingNeighbors > 3) {
        nextCell.isAlive = false
      }
    } else {
      if (livingNeighbors === 3) {
        nextCell.isAlive = true
      }
    }
    return nextCell
  }
}

// Pause/resume from UI button
function handleTogglePause() {
  gamePaused = !gamePaused
  document.getElementById('toggleSimButton').innerText = gamePaused ? 'Resume' : 'Pause'
}

// Killall/clear from UI button
function handleClearGame() {
  for (let x = 0; x < numberOfColumns; x++) {
    for (let y = 0; y < numberOfRows; y++) {
      const cell = currentGameState[x][y]
      cell.isAlive = false
    }
  }
  renderGameState(currentGameState)
}

// Restart from UI button
function handleRestartGame() {
  initializeGame()
  gameLoop()
}

// Change the update interval from UI slider
function handleIntervalChange(value) {
  updateInterval = value
  document.getElementById('intervalValue').innerText = `Interval: ${updateInterval} ms`
}

// Toggle cell state from UI click
function handleToggleStateForCellAt(x, y) {
  const cell = currentGameState[x][y]
  cell.toggleState()
  cell.updateView(cellElements[x][y])
  console.log(x, y, cell.isAlive ? "alive" : "dead")
}

function createElementAt(x, y) {
  const element = document.createElement('div')
  element.style.width = `${cellSize}px`
  element.style.height = `${cellSize}px`
  element.style.left = `${x * cellSize}px`
  element.style.top = `${y * cellSize}px`
  element.classList.add('cell')
  gameAreaElement.appendChild(element)
  element.addEventListener('click', () => {
    handleToggleStateForCellAt(x, y)
  })
  return element
}


function initializeGame() {
  currentGameState = []
  cellElements = []
  gameAreaElement.innerHTML = ''
  for (let x = 0; x < numberOfColumns; x++) {
    currentGameState[x] = []
    cellElements[x] = []
    for (let y = 0; y < numberOfRows; y++) {
      const cell = new Cell(x, y, Math.random() > 0.66)
      const cellElement = createElementAt(x, y)
      cellElements[x][y] = cellElement
      currentGameState[x][y] = cell
      cell.updateView(cellElement)
    }
  }
}

function renderGameState(gameState) {
  for (let x = 0; x < numberOfColumns; x++) {
    for (let y = 0; y < numberOfRows; y++) {
      const cell = gameState[x][y]
      cell.updateView(cellElements[x][y])
    }
  }
}

function calculateNextGameState() {
  const nextGameState = []
  for (let x = 0; x < numberOfColumns; x++) {
    nextGameState[x] = []
    for (let y = 0; y < numberOfRows; y++) {
      const cell = currentGameState[x][y]
      nextGameState[x][y] = cell.nextGenerationCell()
    }
  }
  return nextGameState
}

function gameLoop() {
  if (!gamePaused) {
    const nextGameState = calculateNextGameState()
    renderGameState(nextGameState)
    currentGameState = nextGameState
  }
  setTimeout(() => {
    window.requestAnimationFrame(gameLoop)
  }, updateInterval)
}

initializeGame()
gameLoop()

