import { Gameboard } from '../gameboard';
import { Ship } from '../ship';

describe('Gameboard', () => {
    let gameboard;

    beforeEach(() => {
        gameboard = new Gameboard();
    });

    test('should place ship correctly', () => {
        expect(gameboard.placeShip(3, 0, 0, false)).toBe(true);
    });

    test('should not place ship if it overlaps', () => {
        gameboard.placeShip(3, 0, 0, false);
        expect(gameboard.placeShip(3, 0, 0, true)).toBe(false);
    });

    test('should receive attack and record hit', () => {
        gameboard.placeShip(3, 0, 0, false);
        expect(gameboard.receiveAttack(0, 0)).toBe(true);
    });

    test('should record missed attack', () => {
        gameboard.receiveAttack(0, 0);
        expect(gameboard.missedAttacks).toContainEqual({ x: 0, y: 0 });
    });

    test('should report if all ships are sunk', () => {
        gameboard.placeShip(1, 0, 0, false);
        gameboard.receiveAttack(0, 0);
        expect(gameboard.allShipsSunk()).toBe(true);
    });
});