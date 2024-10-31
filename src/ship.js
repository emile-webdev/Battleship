class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
    }

    /* ---Increases the number of ‘hits’ in your ship--- */
    hit() {
        this.hits++;
    }

    /* ---Calculates whether a ship is considered sunk based on its length and the number of hits it has received--- */
    isSunk() {
        return this.hits >= this.length;
    }
}

export { Ship };