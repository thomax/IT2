// a) Lag et program som presenterer en oversikt over de tre største kategoriene målt i antall apper.Oversikten skal vise antallet apper, gjennomsnittsratingen og det gjennomsnittlige antallet installasjoner for hver av disse tre kategoriene.

const { readFileSync } = require('fs')
const data = readFileSync('googleplaystore/googleplaystore.json', 'utf8')
const apps = JSON.parse(data)
console.log('Loaded', apps.length, 'apps')

const categories = {}

// 3 største kategorier (antall apper)
// antall apper, gjsnitt rating, gj. antall installasjoner

// First pass, assign apps to categories
apps.forEach(app => {
  const categoryName = app.Category
  const category = categories[categoryName] || { name: categoryName, apps: [] }
  category.apps.push({
    name: app.App,
    rating: Number(app.Rating),
    installs: Number(app.Installs.replaceAll(',', '').replace('+', ''))
  })
  categories[categoryName] = category
})

// Second pass, calculate averages
const categoryList = Object.values(categories)
categoryList.forEach(category => {
  const appCount = category.apps.length
  let totalRatings = 0
  let appsWithRatings = 0
  let appsWithInstalls = 0
  let totalInstalls = 0

  category.apps.forEach(app => {
    if (isNaN(app.rating)) {
      //console.log(app.name, 'has invalid rating', app.rating)
    } else {
      appsWithRatings++
      totalRatings += app.rating
    }

    if (isNaN(app.installs)) {
      //console.log(app.name, 'has invalid installs', app.installs)
    } else {
      appsWithInstalls++
      totalInstalls += app.installs
    }
  })

  category.appCount = appCount
  category.averageRating = totalRatings / appsWithRatings
  category.averageInstalls = totalInstalls / appsWithInstalls
})

// Third pass, sort by app count and display top 3
categoryList.sort((a, b) => b.appCount - a.appCount).slice(0, 3).forEach((category, index) => {
  console.log(index + 1, category.name, 'has', category.appCount, 'apps with average rating', category.averageRating.toFixed(2), 'and average installs', category.averageInstalls.toFixed(0))

  // b) Utvid programmet slik at det også presenterer de tre mest populære appene, målt i antall installasjoner, i hver av disse tre kategoriene. 
  category.apps.sort((a, b) => b.installs - a.installs).slice(0, 3).forEach((app, index) => {
    console.log('  ', index + 1, app.name, 'has', app.installs, 'installs')
  })
})

