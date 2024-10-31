import './style.css';
import { Player } from './player';
import { renderGameboards, setupEventListeners } from './dom';
import { setupShipPlacement, resetShipPlacement } from './shipPlacement';

let player, computer;
let isGameOver = false;

document.addEventListener('DOMContentLoaded', () => {
    player = new Player();
    computer = new Player(true);

    // Place ships for the computer randomly
    computer.placeShipsRandomly();

    // Render the initial gameboards
    renderGameboards(player.gameboard, computer.gameboard);

    // Set up ship placement for the player
    setupShipPlacement(player);
});

function startGame() {
    // Reset ship placement event listeners
    if (typeof resetShipPlacement === 'function') {
        resetShipPlacement();
    }

    // Render the gameboards with both player and computer boards
    renderGameboards(player.gameboard, computer.gameboard);

    // Set up the main game event listeners
    setupEventListeners(player, computer);

    const instructions = document.getElementById('instructions');
    instructions.innerHTML = 'Game started';
}

function gameOver(winner) {
    // Game over message
    isGameOver = true;
    const gameOverMessage = document.createElement('div');
    gameOverMessage.id = 'game-over-message';
    gameOverMessage.textContent = `Game over: ${winner} wins!`;

    // Restart button
    const restartButton = document.createElement('button');
    restartButton.id = 'restart-btn';
    restartButton.textContent = 'Restart Game';
    restartButton.addEventListener('click', () => {
        location.reload();
    });

    gameOverMessage.appendChild(restartButton);
    document.body.appendChild(gameOverMessage);

    // Disable further clicks on the game board
    const actionButtons = document.querySelectorAll('.cell');
    actionButtons.forEach(button => {
        button.style.pointerEvents = 'none';
    });
}

export { 
    startGame,
    gameOver,
    isGameOver 
};