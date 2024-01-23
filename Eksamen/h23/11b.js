const {readFileSync} = require('fs')
const data = readFileSync('Datasett/Global YouTube Statistics.json', 'utf8')
const channels = JSON.parse(data)


// b) Utvid programmet til å regne ut og presentere gjennomsnittlig antall abonnenter og videovisninger per kanal for hvert av disse landene.

// [{
//   "India": {
//     name: "India",
//     channelCount: 200,
//     averageViews: 123,
//     averageSubscribers: 456
//   }
// }]

const channelStatsByCountry = []

channels.forEach(channel => {
  const country = channel.Country
  if (!channelStatsByCountry[country]) {
    channelStatsByCountry[country] = {
      name: country,
      channelCount: 0,
      views: [],
      subscribers: []
    }
  }
  channelStatsByCountry[country].channelCount++
  channelStatsByCountry[country]['subscribers'].push(channel['subscribers'])
  channelStatsByCountry[country]['views'].push(channel['video views'])
})

Object.values(channelStatsByCountry)
  .sort((a, b) => b.channelCount - a.channelCount)
  .slice(0, 10)
  .forEach(country => {
    const averageViews = country.views.reduce((a, b) => Number(a) + Number(b)) / country.views.length
    const averageSubscribers = country.subscribers.reduce((a, b) => Number(a) + Number(b)) / country.subscribers.length
    
    console.log(`${country.name} har i snitt ${Math.floor(averageViews)} visninger og ${Math.floor(averageSubscribers)} abonnenter per kanal`)
  })
  