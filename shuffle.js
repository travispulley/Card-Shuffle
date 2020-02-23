// shuffle by sorting each card by a random value
// this is ~9 times slower than Fisher-Yates
// returns new deck
function random_shuffle(deck) {    
  return deck.map(x => { return {card: x, order: Math.random()} })
             .sort((a,b) => a.order - b.order)
             .map(x => x.card)  
}

// split the deck in half, then interlace the cards
// returns new deck
function riffle(deck) {
  const length = deck.length, half = Math.floor(length/2)
  const newdeck = []

  for(let x=0; x<half; ++x) {
    newdeck.push(deck[x])
    newdeck.push(deck[x+half])
  }
  // handle edge case for decks with odd number of cards
  if(deck.length % 2)
    newdeck.push(deck[deck.length])

  return newdeck
}

// reorder the deck along a split point, random if not supplied
// IDEA: slice instead of splice to preserve input
// IDEA: throw an error for (position === 0 || position === deck.length) ?
// Mutates the input deck
function cut(deck, position = Math.floor(Math.random() * (deck.length-1))) {
  deck.splice(0, 0, ...deck.splice(position, deck.length-position))
}

// Fisher-Yates (aka Knuth) shuffle
// This is the most optimal method known to exist?
// Mutates the input deck
function fisher_yates(deck) {
  let i = deck.length
  let rand, temp
  while(--i > 0) {
    // swap values with a random location below or at this index
    rand = Math.floor(Math.random() * (i+1))
    // PERF: adding if(i !== rand) here would make this ~15% slower
    temp       = deck[rand]
    deck[rand] = deck[i]
    deck[i]    = temp
  }
}

module.exports = {
  random_shuffle,
  riffle,
  cut,
  fisher_yates
}