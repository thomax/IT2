
function trekanttall(n) {
  return n * (n + 1) / 2
}

let sum = 0
for (let i = 1; i <= 10; i++) {
  const tall = trekanttall(i)
  sum = sum + tall
}
console.log('sum --> ', sum)