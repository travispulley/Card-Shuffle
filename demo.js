const shuffle = require('./shuffle')

// produce a "deck" of 52 "cards"
let deck = []
for(let x=0; x<52; ++x) {
  deck.push(x)
}
let newdeck // for copies

// mapping to a standard 52-card deck
deck = deck.map(x => {
  const suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades']
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
  let suit = suits[Math.floor(x / 13)]
  let value = values[x % 13]
  return { suit, value, number: x }
})

// output function results
console.log("Unshuffled Deck", deck)

newdeck = shuffle.random_shuffle(deck)
console.log("Random Shuffle", newdeck)

newdeck = [...deck]
shuffle.fisher_yates(newdeck)
console.log("Fisher-Yates (Knuth) Shuffle", newdeck)

newdeck = shuffle.riffle(deck)
console.log("Riffle", newdeck)

newdeck = [...deck]
shuffle.cut(newdeck)
console.log("Cut", newdeck)

console.log("Iterations of Cut and Riffle")
newdeck = [...deck]
for(let x=0; x < 3; ++x) {
  shuffle.cut(newdeck)
  newdeck = shuffle.riffle(newdeck)
  console.log(`Pass ${x+1}:`, newdeck)
}

// Performance stats
const { PerformanceObserver, performance } = require('perf_hooks')

const obs = new PerformanceObserver((items) => {
  const { name, duration } = items.getEntries()[0]
  console.log(name, duration + ' ms')
  performance.clearMarks()
})
obs.observe({ entryTypes: ['measure'] })

const loops = 100000
console.log(`Performance of ${loops} loops:`)

performance.mark('A')
for(let x=0; x < loops; ++x) { shuffle.riffle(newdeck) }
performance.mark('B')
performance.measure('Riffle', 'A', 'B')

performance.mark('A')
for(let x=0; x < loops; ++x) { shuffle.cut(newdeck) }
performance.mark('B')
performance.measure('Cut', 'A', 'B')

performance.mark('A')
for(let x=0; x < loops; ++x) {
  shuffle.cut(newdeck)
  newdeck = shuffle.riffle(newdeck)
}
performance.mark('B')
performance.measure('Cut and Riffle', 'A', 'B')

performance.mark('A')
for(let x=0; x < loops; ++x) { shuffle.fisher_yates(newdeck) }
performance.mark('B')
performance.measure('Fisher-Yates', 'A', 'B')

performance.mark('A')
for(let x=0; x < loops; ++x) { perfdeck = shuffle.random_shuffle(newdeck) }
performance.mark('B')
performance.measure('Random Shuffle', 'A', 'B')

