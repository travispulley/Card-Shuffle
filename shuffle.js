// shuffle by sorting each card by a random value
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
// Mutates the input deck
function cut(deck, position) {
  if(typeof(position) === "undefined")
    position = Math.floor(Math.random() * deck.length)
  
  let removed = deck.splice(position, deck.length-position)
  deck.splice(0, 0, ...removed)
}

// Fisher-Yates (aka Knuth) shuffle
// Mutates the input deck
function fisher_yates(deck) {
  let i = deck.length
  let rand, temp
  while(--i > 0) {
    // swap values with a random location below or at this index
    rand = Math.floor(Math.random() * (i+1))
    // IDEA: would adding if(i !== rand) make this faster? test it out
    temp = deck[rand]
    deck[rand] = deck[i]
    deck[i] = temp
  }
}

module.exports = {
  random_shuffle,
  riffle,
  cut,
  fisher_yates
}