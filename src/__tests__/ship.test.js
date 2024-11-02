import { Ship }  from '../ship';

describe('Ship', () => {
    let ship;

    beforeEach(() => {
        ship = new Ship(3);
    });

    test('should create a ship with the correct length', () => {
        expect(ship.length).toBe(3);
    });

    test('should increase hits when hit() is called', () => {
        ship.hit();
        expect(ship.hits).toBe(1);
    });

    test('should not be sunk initially', () => {
        expect(ship.isSunk()).toBe(false);
    });

    test('should be sunk when hits equal length', () => {
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
});