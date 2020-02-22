const {riffle} = require('./shuffle')

// produce a "deck" of 52 "cards"
let deck = []
for(let x=0; x<52; ++x) {
  deck.push(x)
}

let deckLength = deck.length

test('Riffle doesn\'t lose any cards', () => {
  expect(riffle(deck).length).toBe(deckLength)
  deck.push(1234) // add another card, changing it from an odd or even amount
  deckLength = deck.length
  expect(riffle(deck).length).toBe(deckLength)
})