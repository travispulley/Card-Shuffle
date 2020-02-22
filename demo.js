const shuffle = require('./shuffle')

// produce a "deck" of 52 "cards"
let deck = []
for(let x=0; x<52; ++x) {
  deck.push(x)
}

let newdeck = shuffle.random_shuffle(deck)
console.log("Random shuffle", newdeck)

newdeck = shuffle.riffle(deck)
console.log("Riffle", newdeck)

shuffle.cut(deck)
console.log("Cut", deck)