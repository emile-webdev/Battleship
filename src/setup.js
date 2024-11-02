import { renderGameboards } from './dom';
import { startGame } from './index';

let currentShipIndex = 0;
let ships = [
    { length: 5, name: 'Carrier' },
    { length: 4, name: 'Battleship' },
    { length: 3, name: 'Cruiser' },
    { length: 3, name: 'Submarine' },
    { length: 2, name: 'Destroyer' }
];
let isVertical = true;
let player;
let resetFns = [];

function setupShipPlacement(p) {
    player = p;
    const playerBoard = document.getElementById('player-board');

    // Instructions
    const instructions = document.getElementById('instructions');

    // Instruction Text
    const instructionText = document.createElement('div');
    instructionText.id = 'instruction-text';
    instructions.appendChild(instructionText);

    // Rotate Button
    const rotateButton = document.createElement('button');
    rotateButton.textContent = isVertical ? 'Vertical' : 'Horizontal';
    rotateButton.id = 'rotate-button';
    rotateButton.addEventListener('click', () => {
        isVertical = !isVertical;
        rotateButton.textContent = isVertical ? 'Vertical' : 'Horizontal';
    });
    instructions.appendChild(rotateButton);

    updateInstructions();

    const handleCellClick = (e) => {
        if (e.target.classList.contains('cell')) {
            const x = parseInt(e.target.dataset.x);
            const y = parseInt(e.target.dataset.y);

            if (player.gameboard.placeShip(ships[currentShipIndex].length, x, y, isVertical)) {
                currentShipIndex++;
                renderGameboards(player.gameboard, null);

                if (currentShipIndex < ships.length) {
                    updateInstructions();
                } else {
                    // All ships placed
                    finishPlacement();
                }
            } else {
                alert('Cannot place ship there.');
            }
        }
    };

    playerBoard.addEventListener('click', handleCellClick);
    resetFns.push(() => {
        playerBoard.removeEventListener('click', handleCellClick);
    });
}

function updateInstructions() {
    const instructionText = document.getElementById('instruction-text');
    instructionText.textContent = `Place your ${ships[currentShipIndex].name} (length ${ships[currentShipIndex].length}).`;
}

function finishPlacement() {
    const instructions = document.getElementById('instructions');
    instructions.innerHTML = ''; // Clear existing instructions

    const completionMessage = document.createElement('div');
    completionMessage.textContent = 'All ships placed. Click "Start Game" to begin.';
    instructions.appendChild(completionMessage);

    // Start Game Button
    const startButton = document.createElement('button');
    startButton.textContent = 'Start Game';
    startButton.id = 'start-game-button';
    startButton.addEventListener('click', () => {
        resetShipPlacement();
        startGame();
    });
    instructions.appendChild(startButton);
}

function resetShipPlacement() {
    resetFns.forEach((resetFn) => resetFn());
    resetFns = [];
    const instructions = document.getElementById('instructions');
    instructions.innerHTML = '';
}

export { 
    setupShipPlacement,
    resetShipPlacement
};