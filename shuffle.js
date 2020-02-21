// produce a "deck" of 52 "cards"
let deck = []
for(let x=0; x<52; ++x) {
  deck.push(x)
}

// shuffle by giving each one a random value that's used to sort
deck = deck.map(x => { return {card: x, order: Math.random()}})

function order_sort(a, b) {
  return a.order - b.order
}

console.log(deck.sort(order_sort))

// split the deck in half, then interlace the cards
// returns new deck
function riffle(deck) {
  const length = deck.length, half = Math.floor(length/2)
  const outdeck = []

  console.log(length, half)

  for(let x=0; x<half; ++x) {
    outdeck.push(deck[x])
    outdeck.push(deck[x+half])
  }
  // handle edge case for decks with odd number of cards
  if(deck.length % 2)
    outdeck.push(deck[deck.length])

  return outdeck
}
console.log(riffle(deck))

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

cut(deck)
console.log(deck)

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