const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5001;

// Function to create a deck of cards
function createDeck() {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const values = [
    '2', '3', '4', '5', '6', '7', '8', '9', '10',
    'J', 'Q', 'K', 'A'
  ];
  let deck = [];

  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push({ suit, value });
    });
  });

  return deck;
}

// Function to shuffle a deck
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Initialize player and computer decks
let playerDeck = shuffleDeck(createDeck().slice(0, 26));
let computerDeck = shuffleDeck(createDeck().slice(0, 26));

// Helper function to draw a card from a deck
function drawCard(deck) {
  return deck.pop();
}

// Endpoint to flip a card
app.post('/api/flip', (req, res) => {
  if (playerDeck.length === 0 || computerDeck.length === 0) {
    return res.status(400).json({ message: "Game over. One of the decks is empty." });
  }

  const playerCard = drawCard(playerDeck);
  const computerCard = drawCard(computerDeck);

  let playerValue = getValue(playerCard.value);
  let computerValue = getValue(computerCard.value);

  let result = '';
  if (playerValue > computerValue) {
    result = 'You win this round!';
  } else if (computerValue > playerValue) {
    result = 'Computer wins this round!';
  } else {
    result = 'It\'s a tie! In War, ties are broken by flipping three more cards.';
  }

  res.json({
    playerCard,
    computerCard,
    result,
    playerDeckCount: playerDeck.length,
    computerDeckCount: computerDeck.length,
  });
});

// Function to convert card values to numbers
function getValue(value) {
  if (value === 'A') return 14;
  if (value === 'K') return 13;
  if (value === 'Q') return 12;
  if (value === 'J') return 11;
  return parseInt(value);
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});