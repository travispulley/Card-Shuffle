// shuffling a deck of cards in Go
// IDEA: mutate deck instead of returning new one
// PERF: why is the rand library's shuffle slightly faster than Fisher-Yates?
package main

import (
	"fmt"
	"math"
	"math/rand"
	"time"
)

// Card is a simple card type
type Card struct {
	number int
	value  string
	suit   string
}

func main() {
	rand.Seed(time.Now().UnixNano())
	var deck []Card

	// Make a standard 52-card deck
	suits := []string{"Clubs", "Diamonds", "Hearts", "Spades"}
	values := []string{"2", "3", "4", "5", "6", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"}
	for i := 0; i < 52; i++ {
		deck = append(deck, Card{i, values[i%13], suits[int(math.Floor(float64(i)/13))]})
	}

	fmt.Println("Unshuffled Deck\n", deck)

	fmt.Println("\nFisher-Yates Shuffle\n", fisherYates(deck))

	fmt.Println("\nShuffled Deck\n", shuffle(deck))

	// Performance tests
	// IDEA: use goroutines and get faster results?
	loops := 100000

	fmt.Println("\nPerformance tests on", loops, "loops:")

	start := time.Now()
	for i := 0; i < loops; i++ {
		fisherYates(deck)
	}
	fmt.Println("Fisher-Yates", time.Since(start))

	start = time.Now()
	for i := 0; i < loops; i++ {
		shuffle(deck)
	}
	fmt.Println("Shuffle", time.Since(start))
}

func fisherYates(deck []Card) []Card {
	for i := len(deck) - 1; i >= 0; i-- {
		rand := rand.Intn(i + 1)
		deck[i], deck[rand] = deck[rand], deck[i]
	}
	return deck
}

func shuffle(deck []Card) []Card {
	rand.Shuffle(len(deck), func(i, j int) {
		deck[i], deck[j] = deck[j], deck[i]
	})
	return deck
}
