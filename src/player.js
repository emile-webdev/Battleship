import { Gameboard } from './gameboard';

class Player {
    constructor(isComputer = false) {
        this.isComputer = isComputer;
        this.gameboard = new Gameboard(isComputer ? 'Computer' : 'Player');
        this.attackedCoordinates = new Set();
    }

    attack(computerGameboard, x, y) {
        if (this.isComputer) {
            ({ x, y } = this.getRandomCoordinates(computerGameboard));
        }

        const coordinateString = `${x},${y}`;
        if (this.attackedCoordinates.has(coordinateString)) {
            return false;
        }

        this.attackedCoordinates.add(coordinateString);
        return computerGameboard.receiveAttack(x, y);
    }

    getRandomCoordinates(computerGameboard) {
        let x, y;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } 
        while (this.attackedCoordinates.has(`${x},${y}`) || 
                computerGameboard.receivedAttacks.has(`${x},${y}`));
                    return { x, y };
    }

    placeShipsRandomly() {
        let ships = [
            { length: 5, name: 'Carrier' },
            { length: 4, name: 'Battleship' },
            { length: 3, name: 'Cruiser' },
            { length: 3, name: 'Submarine' },
            { length: 2, name: 'Destroyer' }
        ];

        ships.forEach(ship => {
            let placed = false;
            while (!placed) {
                let x = Math.floor(Math.random() * 10);
                let y = Math.floor(Math.random() * 10);
                let isVertical = Math.random() < 0.5;
                placed = this.gameboard.placeShip(ship.length, x, y, isVertical);
            }
        });
    }
}

export { Player };