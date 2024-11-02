import { Player } from '../player';
import { Gameboard } from '../gameboard';

describe('Player', () => {
    let player;
    let enemyGameboard;

    beforeEach(() => {
        player = new Player();
        enemyGameboard = new Gameboard();
    });

    test('should attack enemy gameboard', () => {
        enemyGameboard.placeShip(3, 0, 0, false);
        expect(player.attack(enemyGameboard, 0, 0)).toBe(true);
    });

    test('should not attack the same coordinates twice', () => {
        player.attack(enemyGameboard, 0, 0);
        expect(player.attack(enemyGameboard, 0, 0)).toBe(false);
    });

    test('computer player should make random legal moves', () => {
        const computerPlayer = new Player(true);
        const attackedCoordinates = new Set();

        for (let i = 0; i < 100; i++) {
            computerPlayer.attack(enemyGameboard);
            expect(computerPlayer.attackedCoordinates.size).toBe(i + 1);
        
            const lastAttack = Array.from(computerPlayer.attackedCoordinates).pop();
            expect(attackedCoordinates.has(lastAttack)).toBe(false);
            attackedCoordinates.add(lastAttack);
        }
    });
});