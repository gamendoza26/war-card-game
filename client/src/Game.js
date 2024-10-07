// src/Game.js
import React, { useState } from 'react';
import axios from 'axios';

// src/Game.js
function Game() {
  const [playerCard, setPlayerCard] = useState(null);
  const [computerCard, setComputerCard] = useState(null);
  const [message, setMessage] = useState('');
  const [playerDeckCount, setPlayerDeckCount] = useState(26);
  const [computerDeckCount, setComputerDeckCount] = useState(26);

  const flipCard = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/flip');
      const { playerCard, computerCard, result, playerDeckCount, computerDeckCount } = response.data;

      // Update state with the received data
      setPlayerCard(playerCard);
      setComputerCard(computerCard);
      setMessage(result);
      setPlayerDeckCount(playerDeckCount);
      setComputerDeckCount(computerDeckCount);
    } catch (error) {
      console.error('Error flipping cards:', error);
      setMessage('An error occurred while flipping cards.');
    }
  };

  // Ensure playerCard and computerCard are not null before rendering.
  return (
    <div>
      <h1>War Card Game!</h1>
      <button onClick={flipCard}>Flip Cards</button>
      <img src={require(`./cards/1B.svg`)}/>
      <img src={require(`./cards/1B.svg`)}/>
      {playerCard && computerCard ? (
        <div >
          <h2>Computer's Card: {computerCard.value} of {computerCard.suit}</h2>
          <div className="card">
            <img src={require(`./cards/${computerCard.suit}_${computerCard.value}.svg`)}/>
            </div>
          <h2>Your Card: {playerCard.value} of {playerCard.suit}</h2>
          <div className="card">
            <img src={require(`./cards/${playerCard.suit}_${playerCard.value}.svg`)}/>
          </div>
          <h3>{message}</h3>
          <p>Your remaining cards: {playerDeckCount}</p>
          <p>Computer's remaining cards: {computerDeckCount}</p> 
        </div>
      ) : (
        <p>Click 'Flip Cards' to start the game.</p>
      )}
      
    </div>
  );
}

export default Game;
