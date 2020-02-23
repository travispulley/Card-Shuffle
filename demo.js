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
console.log("Random shuffle", newdeck)

newdeck = [...deck]
shuffle.fisher_yates(newdeck)
console.log("Fisher-Yates (Knuth) Shuffle", newdeck)

newdeck = shuffle.riffle(deck)
console.log("Riffle", newdeck)

newdeck = [...deck]
shuffle.cut(newdeck)
console.log("Cut", newdeck)