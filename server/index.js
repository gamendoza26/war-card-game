const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Define API endpoints here
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// CREATING THE INITIAL DECK OF CARDS
const createDeck = () => {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values = [
        '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'
    ];
    let deck = [];

    suits.forEach(suits => {
        values.forEach((value, index) => {
            deck.push({ suit, value, rank: index + 2});
        });
    });

    return deck.sort(() => Math.random() - 0.5);
};

// STARTING THE GAME AND HANDLING FLIPS
let playerDeck = [];
let computerDeck = [];

app.post('/start-game', (req, res) => {
  const deck = createDeck();
  playerDeck = deck.slice(0, 26);
  computerDeck = deck.slice(26);
  res.json({ message: 'Game started!' });
});

app.get('/flip', (req, res) => {
  if (playerDeck.length === 0 || computerDeck.length === 0) {
    return res.json({ message: 'Game over!', playerDeck, computerDeck });
  }

  const playerCard = playerDeck.shift();
  const computerCard = computerDeck.shift();

  if (playerCard.rank > computerCard.rank) {
    playerDeck.push(playerCard, computerCard);
    res.json({ winner: 'player', playerCard, computerCard });
  } else if (computerCard.rank > playerCard.rank) {
    computerDeck.push(playerCard, computerCard);
    res.json({ winner: 'computer', playerCard, computerCard });
  } else {
    const warCards = [playerCard, computerCard];
    if (playerDeck.length < 4 || computerDeck.length < 4) {
      res.json({ message: 'Not enough cards for war', warCards });
      return;
    }

    warCards.push(...playerDeck.splice(0, 3), ...computerDeck.splice(0, 3));
    const playerWarCard = playerDeck.shift();
    const computerWarCard = computerDeck.shift();

    if (playerWarCard.rank > computerWarCard.rank) {
      playerDeck.push(...warCards, playerWarCard, computerWarCard);
      res.json({ winner: 'player', warCards, playerWarCard, computerWarCard });
    } else {
      computerDeck.push(...warCards, playerWarCard, computerWarCard);
      res.json({ winner: 'computer', warCards, playerWarCard, computerWarCard });
    }
  }
});
