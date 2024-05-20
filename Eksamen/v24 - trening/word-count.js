const { readFileSync } = require('fs')
const data = readFileSync('./dracula.txt', 'utf8')
// str.replace(/[^a-zA-Z0-9 ]/g, "")
const allWords = data.replaceAll("\n", ' ').split(' ').filter(Boolean).map(word => {
  let wordWithOnlyCharacters = word.replace(/[^a-zA-Z0-9]/g, '')
  return wordWithOnlyCharacters.toLowerCase()
})


const wordsByOccurrence = {}

// First pass, gå igjennom alt, bygg datastruktur
allWords.forEach(word => {
  if (!wordsByOccurrence[word]) {
    wordsByOccurrence[word] = {
      word: word,
      count: 0
    }
  }
  wordsByOccurrence[word].count++
})

// Second pass, sortere og print
Object.values(wordsByOccurrence).sort((wordA, wordB) => {
  return wordB.count - wordA.count
}).slice(0, 100).forEach((word) => {
  console.log(word.word, word.count)
})
