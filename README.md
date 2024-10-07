# War Card Game

Welcome to the War Card Game! This project is a simple implementation of the classic card game "War", where you can compete against the computer. The game is built using React for the frontend and Node.js for the backend.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Game Rules](#game-rules)
- [Next Steps](#next-steps)

## Features

- Two separate decks of cards (one for the player and one for the computer).
- Draw the top card from each player's decks.
- Display the remaining number of cards in each deck.
- Simple UI for easy gameplay.
- Messages indicating the winner of each round and the overall game.

## Technologies Used

- **Frontend**: 
  - React
  - Axios (for making HTTP requests)
- **Backend**: 
  - Node.js
  - Express
- **Database**: None (the game state is maintained in memory due to limited data requirements)

## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/war-card-game.git
   cd war-card-game

## Game Rules

1. Each player starts with a deck of 26 cards (half of the full shuffled deck).
2. Players draw one card at a time and compare their values.
3. The player withe the higher card wins the round.
4. In case of a tie, both players draw three additional cards; the value of the third card determines the winner in a tie.
5. The game continues until one player obtains all of the cards and is deemed the winner!

## Next Steps
- **Ties**: Create a more complicated method for dealing with ties that models the true card game
- **UI**: Create a UI that is more pleasing the view, with card displays 