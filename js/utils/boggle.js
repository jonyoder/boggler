const GRID_SIZE = 4;

class Boggle {

    constructor(...props) {

        if (props.length % GRID_SIZE != 0) {
            throw new Error("Unexpected initialization array size");
        }

        let serial = 0;
        this.userData = [];

        // Build array of arrays representing rows and columns
        for (let y=0; y<GRID_SIZE; y++) { // Rows

            let row = [];

            for (let x=0; x<GRID_SIZE; x++) { // Columns
                let letter = new Letter(props[(y*GRID_SIZE)+x], serial++, y, x);
                row.push(letter);
            }

            this.userData.push(row);
        }

        /* Build a graph of letters in the grid
         *
         * This graph first consists of a base Map of Letters that allows us to look find a starting point
         * for any word based on the first letter of the word.
         *
         * Each Letter contains a map of adjacent Letters that allows us to quickly follow the graph to
         * determine if the current game contains a match for a particular dictionary word.
         */
        let baseMap = new Map();
        for (let row of this.userData) {
            for (let letter of row) {

                // Add all adjacent letters to the map of adjacencies for this letter.
                for (let position of letter.getAdjacentIndices()) {
                    letter.addAdjacent(this.userData[position.getY()][position.getX()]);
                }

                // Add the letter to the base map for the game
                let mapItem = baseMap.get(letter.getLetter());
                if (mapItem === undefined) {
                    mapItem = new Array();
                    baseMap.set(letter.getLetter(), mapItem);
                }
                mapItem.push(letter);
            }
        }
        this.baseMap = baseMap;

    }

    print() {
        console.log(this.baseMap);
    }

    match(word, letter, lettersInPath=new Array()) {
        let map = (letter === undefined) ? this.baseMap : letter.getAdjacent();
        let adjacentLetters = map.get(word.charAt(0))
        if (adjacentLetters !== undefined) {
            for (let adjacentLetter of adjacentLetters) {

                // Don't allow a letter to be used twice
                if (!lettersInPath.find((element, index, array) => {
                    return element === adjacentLetter;
                }))
                {
                    if (word.length > 1) {
                        // recursive call
                        let recursiveResult = this.match(word.substring(1), adjacentLetter, lettersInPath.concat(adjacentLetter)); 
                        if (recursiveResult !== undefined)
                            return recursiveResult; 
                    }
                    else {
                        return lettersInPath.concat(adjacentLetter);
                    }
                }
            }
        }
        return undefined;
    }
}

class Letter {

    constructor(letter, serial, x, y) {
        this.letter = letter.toLowerCase();
        this.serial = serial;
        this.x = x;
        this.y = y;
        this.adjacent = new Map();
    }

    getLetter() {
        return this.letter;
    }

    getSerial() {
        return this.serial;
    }

    getAdjacentIndices() {
        let adjacencies = new Array();
        let minRow = this.y == 0 ? 0 : this.y-1;
        let maxRow = this.y == GRID_SIZE-1 ? this.y : this.y+1;
        let minCol = this.x == 0 ? 0 : this.x-1;
        let maxCol = this.x == GRID_SIZE-1 ? this.x : this.x+1;
        for (let row=minRow; row<=maxRow; row++) {
            for (let col=minCol; col<=maxCol; col++) {
                if (!(row == this.y && col == this.x)) {
                    adjacencies.push(new Position(row, col));
                }
            }
        }
        return adjacencies;
    }

    addAdjacent(letter) {
        let mapItem = this.adjacent.get(letter.getLetter());
        if (mapItem === undefined) {
            mapItem = new Array();
            this.adjacent.set(letter.getLetter(), mapItem);
        }
        mapItem.push(letter);
        //console.log("Add adjacent to " + this.letter + ": " + letter.getLetter());
    }

    getAdjacent() {
        return this.adjacent;
    }

}

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}

export default Boggle;

