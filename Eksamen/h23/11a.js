const {readFileSync} = require('fs')
const data = readFileSync('Datasett/Global YouTube Statistics.json', 'utf8')
const channels = JSON.parse(data)

// a) Lag et program som finner og presenterer de ti landene i datasettet som har flest YouTube-kanaler.
// [{"India": 123}, {"USA": 456}]

const channelCountByCountry = {}

channels.forEach(channel => {
  const country = channel.Country
  if (!channelCountByCountry[country]) {
    channelCountByCountry[country] = 0
  }
  channelCountByCountry[country]++
})

const countriesWithMostChannels = Object.entries(channelCountByCountry)
  .sort((a, b) => b[1] - a[1])
  .filter(country => country[0] !== 'nan')
  .slice(0, 10)
  
console.log(countriesWithMostChannels)


