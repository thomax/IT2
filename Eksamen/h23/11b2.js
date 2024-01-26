// b) Utvid programmet til å regne ut og presentere gjennomsnittlig antall abonnenter og videovisninger per kanal for hvert av disse landene.
const idealResult = {
  'Brazil': {
    channels: 0,
    views: [],
    subscribers: []
  }
}
const {readFileSync} = require('fs')
const data = readFileSync('./Datasett/Global YouTube Statistics.json', 'utf8')
const channels = JSON.parse(data)
const result = {}

channels.forEach(channel => {
  const country = channel.Country
  const views = channel['video views']
  const subscribers = channel['subscribers']
  
  if (country !== 'nan') {
    if (!result[country]) {
      result[country] = {
        channels: 0,
        views: [],
        subscribers: []
      }
    }
    result[country].channels = result[country].channels +1 
    result[country].views.push(views) 
    result[country].subscribers.push(subscribers) 
  }
})

// lag et array
// sorter på antall kanaler
// ta de 10 første

function calculateAverageOld(numbers) {
  let sum = 0
  numbers.forEach(aNumber => {
    sum += aNumber
  })
  return Math.floor(sum / numbers.length)
}

function calculateAverage(numbers) {
  const sum = numbers.reduce((previousNumber, currentNumber) => {
    return previousNumber + currentNumber
  })
  return sum / numbers.length
}


const resultArray = Object.entries(result)
const sortedResultArray = resultArray.sort((countryA, countryB) => {
  return countryB[1].channels - countryA[1].channels
})
const topTenCountries = sortedResultArray.slice(0, 10)

topTenCountries.forEach(country => {
  const countryName = country[0]
  const countryData = country[1]
  countryData.averageViews = calculateAverage(countryData.views)
  countryData.averageSubscribers = calculateAverage(countryData.subscribers)
})

console.log(topTenCountries)





