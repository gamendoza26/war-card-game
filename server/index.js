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