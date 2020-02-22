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
// mutates existing deck
function cut(deck, position) {
  if(typeof(position) === "undefined")
    position = Math.floor(Math.random() * deck.length)
  
  let removed = deck.splice(position, deck.length-position)
  // console.log(position, removed, deck)
  deck.splice(0, 0, ...removed)
}

// just a dev stub for now, need to build it out and test it
// copied from: https://www.tutorialspoint.com/what-is-fisher-yates-shuffle-in-javascript
function fisher_yates() {
  var arr = ['A','B','C','D','E','F','G','H']
   var i = arr.length, k , temp;      // k is to generate random index and temp is to swap the values
   while(--i > 0){
    k = Math.floor(Math.random() * (i+1))
    temp = arr[k]
    arr[k] = arr[i]
    arr[i] = temp
  }
}

module.exports = {
  random_shuffle,
  riffle,
  cut
}