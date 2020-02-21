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