const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

app.use(cors());

let playerDeck = [];
let computerDeck = [];

function initializeDecks() {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const values = [
    '2', '3', '4', '5', '6', '7', '8', '9', '10',
    'J', 'Q', 'K', 'A'
  ];

  let fullDeck = [];

  // Create the full deck of 52 cards.
  suits.forEach(suit => {
    values.forEach(value => {
      fullDeck.push({ value, suit });
    });
  });

  // Shuffle the deck.
  fullDeck = fullDeck.sort(() => Math.random() - 0.5);

  // Split the deck evenly between player and computer.
  playerDeck = fullDeck.slice(0, 26);
  computerDeck = fullDeck.slice(26, 52);
}

app.post('/api/flip', (req, res) => {
    //Checks to see if the game is over
    if (playerDeck.length === 0) {
      return res.status(400).json({
        result: 'Game over! You lose!',
        playerDeckCount: playerDeck.length,
        computerDeckCount: computerDeck.length,
      });
    }
    if (computerDeck.length === 0) {
        return res.status(400).json({
          result: 'Game over! You win!',
          playerDeckCount: playerDeck.length,
          computerDeckCount: computerDeck.length,
        });
      }
  
    const playerCard = playerDeck.pop();
    const computerCard = computerDeck.pop();
  
    let result = '';
    if (playerCard.value > computerCard.value) {
      result = 'You win this round!';
      playerDeck.unshift(playerCard);
      playerDeck.unshift(computerCard);
    } else if (playerCard.value < computerCard.value) {
      result = 'Computer wins this round!';
      computerDeck.unshift(playerCard);
      computerDeck.unshift(computerCard);
    } else {
      result = 'It’s a tie! War!';
      playerDeck.unshift(playerCard);
      computerDeck.unshift(computerCard);
    }
  
    res.json({
      playerCard,
      computerCard,
      result,
      playerDeckCount: playerDeck.length,
      computerDeckCount: computerDeck.length,
    });
  });

// Initialize the decks when the server starts.
initializeDecks();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
