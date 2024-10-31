import { gameOver, isGameOver } from './index';

function renderGameboards(playerGameboard, computerGameboard) {
    const playerBoard = document.getElementById('player-board');
    const computerBoard = document.getElementById('computer-board');
    
    renderBoard(playerBoard, playerGameboard);

    if (computerGameboard) {
        renderBoard(computerBoard, computerGameboard, true);
    } 
}

function renderBoard(boardElement, gameboard, isComputer) {
    boardElement.innerHTML = '';
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = x;
            cell.dataset.y = y;

            if (!isComputer && 
                gameboard.board[x][y] && 
                gameboard.board[x][y].ship instanceof Object) {
                    cell.classList.add('ship');
            }

            const coordinateString = `${x},${y}`;
            if (gameboard.receivedAttacks.has(coordinateString)) {
                if (gameboard.board[x][y] && 
                    gameboard.board[x][y].ship instanceof Object) {
                        cell.classList.add('hit');
                } else {
                    cell.classList.add('missed');
                }
            }
            boardElement.appendChild(cell);
        }
    }
}

function checkWin(playerGameboard, computerGameboard) {   
    if (computerGameboard.allShipsSunk()) {
        gameOver('Player');
        return true;
    } else if (playerGameboard.allShipsSunk()) {
        gameOver('Computer');
        return true;
    }
    return false;
}

function setupEventListeners(player, computer) {
    const computerBoard = document.getElementById('computer-board');

    const handleClick = (e) => {
        if (isGameOver) return;

        if (e.target.classList.contains('cell') &&
            !e.target.classList.contains('hit') &&
            !e.target.classList.contains('missed')) {
                const x = parseInt(e.target.dataset.x);
                const y = parseInt(e.target.dataset.y);

            let hit;
            do {
                hit = player.attack(computer.gameboard, x, y);
                renderGameboards(player.gameboard, computer.gameboard);

                if (checkWin(player.gameboard, computer.gameboard)) {
                    // Remove event listener to prevent further clicks
                    computerBoard.removeEventListener('click', handleClick);
                    return;
                }
            } 
            while (hit && !isGameOver);

            // Check if game is over before scheduling computer's turn
            if (!isGameOver) {
                setTimeout(() => {
                let computerHit;
                    do {
                        computerHit = computer.attack(player.gameboard);
                        renderGameboards(player.gameboard, computer.gameboard);
                            if (checkWin(player.gameboard, computer.gameboard)) {
                                return;
                            }
                    } 
                    while (computerHit && !isGameOver);
                }, 800);
            }
        }
    };
    computerBoard.addEventListener('click', handleClick);
}

export { 
    renderGameboards, 
    setupEventListeners 
};