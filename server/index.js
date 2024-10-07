// server/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());

app.get('/api/flip', (req, res) => {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  const getRandomCard = () => ({
    rank: ranks[Math.floor(Math.random() * ranks.length)],
    suit: suits[Math.floor(Math.random() * suits.length)],
  });

  const userCard = getRandomCard();
  const computerCard = getRandomCard();

  const rankValues = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 11, 'Q': 12, 'K': 13, 'A': 14
  };
  
  let result;
  if (rankValues[userCard.rank] > rankValues[computerCard.rank]) {
    result = 'You win!';
  } else if (rankValues[userCard.rank] < rankValues[computerCard.rank]) {
    result = 'Computer wins!';
  } else {
    result = 'It\'s a tie! Flipping three more cards...';
  }

  res.json({ userCard, computerCard, result });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});