const { readFileSync } = require('fs')
const data = readFileSync('googleplaystore/googleplaystore.json', 'utf8')

const apps = JSON.parse(data)

// 3 største kategorier målt apper
// antall apper, gjennomsnitssrating, og gjennomsnitts installs i hver kategori

const categories = {}

// First pass, gå igjennom alt, bygg datastruktur
apps.forEach(app => {
  const categoryName = app.Category
  let category = categories[categoryName]
  if (!category) {
    category = { name: categoryName, apps: [] }
    categories[categoryName] = category
  }
  const appData = {
    name: app.App,
    rating: Number(app.Rating),
    installs: Number(app.Installs.replace('+', '').replaceAll(',', ''))
  }
  category.apps.push(appData)
})

// Second pass, do some math
Object.values(categories).forEach(category => {
  let ratingTotal = 0
  let appCountWithValidRating = 0
  let installsTotal = 0
  let appCountWithValidInstalls = 0
  category.apps.forEach(app => {
    if (!isNaN(app.rating)) {
      ratingTotal += app.rating
      appCountWithValidRating++
    }
    if (!isNaN(app.installs)) {
      installsTotal += app.installs
      appCountWithValidInstalls++
    }
  })
  category.appCount = category.apps.length
  category.averageRating = ratingTotal / appCountWithValidRating
  category.averageInstalls = installsTotal / appCountWithValidInstalls
})

// Third pass, sort and display
const sortedCategories = Object.values(categories).sort((catA, catB) => {
  return catB.appCount - catA.appCount
})

sortedCategories.slice(0, 3).forEach((category, index) => {
  // Display category data
  console.log(index + 1, category.name, 'App count:', category.appCount, 'Average ratings:', category.averageRating.toFixed(2), 'Average installs:', category.averageInstalls.toFixed(0))

  // sort most popular apps within category
  const sortedApps = category.apps.sort((appA, appB) => { return appB.installs - appA.installs }).slice(0, 3)

  // Display data for most popular apps
  sortedApps.forEach(app => {
    console.log('   ', app.name, 'Rating:', app.rating, 'Installs:', app.installs)
  })
})




