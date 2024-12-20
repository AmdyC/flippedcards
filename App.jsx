// src/App.jsx
import { useState } from 'react';
import './App.css';

const generateBoard = () => {
  const pairs = ['A', 'B', 'C', 'D', 'E'];
  const cards = [...pairs, ...pairs]; // Duplicamos las cartas para crear los pares
  return cards.sort(() => Math.random() - 0.5); // Mezclamos las cartas aleatoriamente
};

function App() {
  const [board, setBoard] = useState(generateBoard());
  const [flipped, setFlipped] = useState([]); // Almacena los índices de las cartas volteadas
  const [matched, setMatched] = useState([]); // Almacena las cartas encontradas (pares)

  const handleFlip = (index) => {
    // Evitar que se pueda voltear más de 2 tarjetas o voltear una ya encontrada
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    // Verificar si se encontró un par
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (board[first] === board[second]) {
        setMatched([...matched, first, second]);
      }
      setTimeout(() => setFlipped([]), 1000); // Voltear las tarjetas después de 1 segundo
    }
  };

  const resetGame = () => {
    setBoard(generateBoard());
    setFlipped([]);
    setMatched([]);
  };

  return (
    <div className="app">
      <h1>Juego de Memoria</h1>
      <div className="board">
        {board.map((card, index) => (
          <div
            key={index}
            className={`card ${flipped.includes(index) || matched.includes(index) ? 'flipped' : ''}`}
            onClick={() => handleFlip(index)}
          >
            <div className="front">{card}</div>
            <div className="back">?</div>
          </div>
        ))}
      </div>
      <button onClick={resetGame} className="reset">
        Reiniciar
      </button>
      {matched.length === board.length && <div className="winner">¡Ganaste!</div>}
    </div>
  );
}

export default App;
