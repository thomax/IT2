// a) Lag et program som finner og presenterer de ti landene i datasettet som har flest YouTube-kanaler.

const {readFileSync} = require('fs')
const data = readFileSync('./Datasett/Global YouTube Statistics.json', 'utf8')

const channels = JSON.parse(data)

// const result = {'Brazil': 41, 'India': 123, 'USA': 456}

const result = {}

channels.forEach(channel => {
  const country = channel.Country
  if (country !== 'nan') {
    if (!result[country]) {
      result[country] = 0
    }
    result[country] = result[country] + 1
  }
})

// lag et array
// sorter på antall kanaler
// ta de 10 første

const resultArray = Object.entries(result)
const sortedResultArray = resultArray.sort((countryA, countryB) => {
  return countryB[1] - countryA[1]
})
const topTenCountries = sortedResultArray.slice(0, 10)

console.log(topTenCountries)




