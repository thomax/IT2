//"05994: Tid brukt til ulike aktiviteter en gjennomsnittsdag blant alle (timer og minutter), etter alle aktiviteter, kjønn, statistikkvariabel, år og alder"

const { readFileSync } = require('fs')
const data = readFileSync('datasett.json', 'utf8')

const rawActivities = JSON.parse(data)

function convertNumberToMinutes(number) {
  const numberAsString = number + ''
  const hours = Number(numberAsString.split('.')[0])
  const minutes = Number(numberAsString.split('.')[1])
  if (isNaN(minutes)) {
    return hours * 60
  }
  return (hours * 60) + minutes
}

const activities = []

let currentCategory = undefined

rawActivities.forEach(rawActivity => {
  let subCategory = undefined
  if (rawActivity['alle aktiviteter'].startsWith('� ')) {
    subCategory = rawActivity['alle aktiviteter'].replace('� ', '')
  } else {
    currentCategory = rawActivity['alle aktiviteter']
    subCategory = undefined
  }

  const activity = {
    kategori: currentCategory,
    underkategori: subCategory,
    kjønn: rawActivity['kjønn'],
    tidsbruk: convertNumberToMinutes(rawActivity['Tidsbruk 2000 I alt'])
  }
  activities.push(activity)
})

console.log(activities)

let totalMinutes = 0
//const womanAll = activities.filter(activity => activity.underkategori === undefined && activity.kjønn === 'Kvinner' && activity.kategori !== 'I alt')

const womanAll = activities
  .filter(activity => activity.underkategori === undefined)
  .filter(activity => activity.kjønn === 'Kvinner')
  .filter(activity => activity.kategori !== 'I alt')

womanAll.forEach(activity => {
  totalMinutes += activity.tidsbruk
  console.log(activity.kategori, activity.tidsbruk)
})

console.log('Kvinner, hovedkategori', totalMinutes)
