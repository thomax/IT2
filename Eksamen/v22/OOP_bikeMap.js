class Bike {
  static allBikes = []

  static getBikeById(id) {
    return Bike.allBikes.find((bike) => bike.id === id)
  }

  constructor(x, y, charge) {
    this.id = generateId()
    this.x = x
    this.y = y
    this.charge = charge
    this.distance = 10000
  }

  // Calculate distance from map pin to this bike
  updateDistance(pinLocation) {
    this.distance = Math.sqrt(Math.pow(pinLocation.x - this.x, 2) + Math.pow(pinLocation.y - this.y, 2))
  }
}

function random(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

function generateId() {
  let uuid = ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 5; i++) {
    uuid += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return uuid
}

// Convert pixel screen placement to percent placement on map
function pixelsToPercent(pixels, absoluteSize) {
  return (pixels / absoluteSize) * 100
}

// Various app initialization
function initializeApp() {
  // Enable user to select number of bikes
  document.querySelector("#numberOfBikesSlider").value = numberOfBikes
  document.querySelector("#numberOfBikesSlider").oninput = function() {
    numberOfBikes = this.value
    document.querySelector("#numberOfBikesOutput").value = numberOfBikes
    createBikes()
    updateMap()
  }
  
  // Enable user to select minimum charge level
  document.querySelector("#chargeLevelSlider").value = minimumChargeLevel
  document.querySelector("#chargeLevelSlider").oninput = function() {
    minimumChargeLevel = this.value
    document.querySelector("#chargeLevelOutput").value = minimumChargeLevel + "%"
    updateMap()
  } 

  // Enable user to select point on map
  document.querySelector("#map").addEventListener('click', function(event) {
    if (isMapPinVisible) {
      removeMapPin()
    } else {
      const pinLocation = addMapPin(event)
      updateBikeDistances(pinLocation)
    }
    updateMap()
  })
}

// Create bikes (normally loaded from a server)
function createBikes() {
  Bike.allBikes = []
  for (let i = 0; i < numberOfBikes; i++) {
    const bike = new Bike(random(0, 90), random(0, 90), random(20, 100))
    Bike.allBikes.push(bike)
  }
}

// Recalculate distances from map pin to bikes
function updateBikeDistances(mapPinLocation) {
  Bike.allBikes.forEach((bike) => {
    bike.updateDistance(mapPinLocation)
  })
  // Ensure bikes are sorted by distance
  Bike.allBikes.sort((bikeA, bikeB) => bikeA.distance - bikeB.distance)
}

function updateMap() {
  // Get rid of all bikes on map
  document.querySelectorAll('.bikeContainer').forEach(e => e.remove())

  // Filter bikes based on minimum charge level
  let bikesToDisplay = Bike.allBikes.filter((bike) => (bike.charge >= minimumChargeLevel))

  // If map pin is visible, display four first bikes
  bikesToDisplay = isMapPinVisible ? bikesToDisplay.slice(0, 4) : bikesToDisplay

  // Create html for each bike
  bikesToDisplay.forEach((bike) => {
    const bikeContainer = document.createElement("div")
    bikeContainer.classList.add("bikeContainer")
    bikeContainer.setAttribute("onmouseover", `handleMouseoverBike("${bike.id}")`)
    bikeContainer.setAttribute("onmouseout", `handleMouseoutBike("${bike.id}")`)
    bikeContainer.setAttribute("onclick", `handleClickBike("${bike.id}")`)
    bikeContainer.innerHTML = `<div class="bike"><img src="ikon.png" alt="Bike"></div><div class="bar" id="bar${bike.id}"></div>`
    bikeContainer.style.left = bike.x + "%"
    bikeContainer.style.top = bike.y + "%"
    document.querySelector("#mapContainer").appendChild(bikeContainer)
  })
  maybeShowClosestBikesReport(bikesToDisplay)
}

// Add pin to map
function addMapPin(event) {
  const map = document.querySelector("#map")
  const mapPin = document.querySelector("#mapPin")
  const widgetContainer = document.querySelector("#widgetContainer")
  // Figure out x and y, as percentages of map size
  const pinLocation = {
    x: pixelsToPercent(event.clientX - (mapPin.offsetWidth/2), map.offsetWidth),
    y: pixelsToPercent(event.clientY - widgetContainer.offsetHeight - mapPin.offsetHeight, map.offsetHeight)
  }
  mapPin.style.left = pinLocation.x + '%'
  mapPin.style.top = pinLocation.y + '%'
  mapPin.style.visibility = "visible"
  isMapPinVisible = true
  return pinLocation
}

// Remove pin from map
function removeMapPin() {
  const mapPin = document.querySelector("#mapPin")
  mapPin.style.visibility = "hidden"
  isMapPinVisible = false
}

// Display animated charge bar
function handleMouseoverBike(id) {
  const bike = Bike.getBikeById(id)
  const bar = document.querySelector(`#bar${bike.id}`)
  bar.style.transition = "width 2s"
  bar.style.width = `${bike.charge}%`
}

// Remove charge bar
function handleMouseoutBike(id) {
  const bike = Bike.getBikeById(id)
  const bar = document.querySelector(`#bar${bike.id}`)
  bar.style.transition = "width 0.1s"
  bar.style.width = "0%"
}

function handleClickBike(id) {
  const bike = Bike.getBikeById(id)
  const feedbackContainer = document.querySelector("#feedbackContainer")
  feedbackContainer.style.visibility = "visible"
}

// Remove the feedback form
function handleCancel() {
  const feedbackContainer = document.querySelector("#feedbackContainer")
  feedbackContainer.style.visibility = "hidden"
}

// Create a summary of input about to be submitted
function toggleSummary(enableSummary) {
  const {selectedColor, problems, comment} = validateForm()
  const feedbackSummaryContainer = document.querySelector("#feedbackSummaryContainer")
  feedbackSummaryContainer.style.visibility = enableSummary ? "visible" : "hidden"
  const feedbackSummary = document.querySelector("#feedbackSummary")

  if (enableSummary) {
    feedbackSummary.innerHTML = `
      <h2>Oppsummering</h2>
      <span class="summaryLabel">Farge: </span><span>${selectedColor}</span><br>
      <span class="summaryLabel">Til hinder for: </span><span>${problems.join(", ")}</span><br>
      <span class="summaryLabel">Kommentar: </span><span>${comment}</span>
      `
  } else {
    feedbackSummary.innerHTML = ""
  }
}

function submitForm() {
  const {isValid} = validateForm()
  if (isValid) {
    toggleSummary(true)
  } else {
    alert("Du må velge en farge")
  }
}

function validateForm() {
  const form = document.feedbackForm
  // handle colors
  const colors = form.colors
  let selectedColor
  for (let i = 0; i < colors.length; i++) {
    if (colors[i].checked) {
      selectedColor = dictionary[colors[i].value]
    }
  }
  if (!selectedColor) {
    return {isValid: false}
  }
  // handle parking
  const potentialProblems = ["pedestrians", "vehicles", "traffic"]
  let problems = []
  if (form.pedestrians.checked) {
    problems.push(dictionary.pedestrians)
  }
  if (form.vehicles.checked) {
    problems.push(dictionary.vehicles)
  }
  if (form.traffic.checked) {
    problems.push(dictionary.traffic)
  }
  // handle comment
  const comment = form.comment.value

  return {isValid: true, selectedColor, problems, comment}
}

function maybeShowClosestBikesReport(bikesToDisplay) {
  const closestBikesReport = document.querySelector("#closestBikesReport")
  // toggle visibility of report
  closestBikesReport.style.visibility = isMapPinVisible ? "visible" : "hidden"
  // create and show report
  if (isMapPinVisible) {
    let htmlReport = ''
    bikesToDisplay.forEach((bike) => {
      htmlReport += `<li><span class="summaryLabel">Batteri: </span> ${bike.charge}%<br/><span class="summaryLabel">Avstand: </span> ${Math.ceil(bike.distance)}<br/><span class="summaryLabel">ID: </span> ${bike.id}</li>`
    })          
    closestBikesReport.innerHTML = `<h2>Nærmeste sykler</h2><ol>${htmlReport}</ol>`
  }
}

const dictionary = {
  "yellow": "Gul",
  "red": "Rød",
  "blue": "Blå",
  "pedestrians": "Fotgjengere",
  "vehicles": "Kjøretøy",
  "traffic": "Trafikk"
}
let numberOfBikes = 10
let minimumChargeLevel = 50
let mapPinLocation = {x: 0, y: 0}
let isMapPinVisible = false

initializeApp()
createBikes()
updateMap()