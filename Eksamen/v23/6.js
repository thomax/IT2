const readline = require('node:readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function assessment(score) {
  if (score >= 0 && score < 50) {
    return "Ikke bestått"
  } else if (score >= 50 && score < 70) {
    return "Bestått"
  } else if (score >= 70 && score < 90) {
    return "Godt bestått"
  } else if (score >= 90 && score <= 100) {
    return "Meget godt bestått"
  } else {
    return "Ikke gyldig poengsum!"
  }
}


rl.question('Input score: ', score => {
  console.log(assessment(score))
  rl.close()
})
