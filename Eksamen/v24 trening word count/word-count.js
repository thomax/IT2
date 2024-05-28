const { readFileSync } = require('fs')
const data = readFileSync('./frankenstein.txt', 'utf8')

const wordsByCount = {}

// remove all non alpha numeric characters (men en del tomme strenger)
let allWords = data.replace(/[^a-zA-Z0-9]/g, ' ')

// split the huge string into array of words
allWords = allWords.split(' ')

// get rid of empty strings
allWords = allWords.filter(word => {
  return word !== ''
})

// lowercase all words
allWords = allWords.map(word => {
  return word.toLowerCase()
})

// consider each word, count it
allWords.forEach(word => {
  if (wordsByCount[word]) {
    wordsByCount[word].count++
  } else {
    // first time we see this word, add object
    wordsByCount[word] = {
      count: 1,
      word: word
    }
  }
})

// sort words by count
const sortedWords = Object.values(wordsByCount).sort((wordA, wordB) => {
  return wordB.count - wordA.count
})

// output 10 most occurring
sortedWords.slice(0, 10).forEach(wordObject => {
  console.log(wordObject.word, 'occured', wordObject.count, 'times')
})

console.log(wordsByCount['frankenstein'])

