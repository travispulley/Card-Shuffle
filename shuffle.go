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
	// TODO figure out more concise code
	for i := 0; i < 52; i++ {
		var value, suit string

		// assign suit
		switch math.Floor(float64(i) / 13) {
		case 0:
			suit = "Clubs"
		case 1:
			suit = "Diamonds"
		case 2:
			suit = "Hearts"
		case 3:
			suit = "Spades"
		}

		// assign value
		switch i % 13 {
		case 0:
			value = "2"
		case 1:
			value = "3"
		case 2:
			value = "4"
		case 3:
			value = "5"
		case 4:
			value = "6"
		case 5:
			value = "6"
		case 6:
			value = "7"
		case 7:
			value = "8"
		case 8:
			value = "9"
		case 9:
			value = "10"
		case 10:
			value = "Jack"
		case 11:
			value = "Queen"
		case 12:
			value = "King"
		case 13:
			value = "Ace"
		}
		deck = append(deck, Card{i, value, suit})
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
