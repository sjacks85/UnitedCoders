// JavaScript source code
var GameSpace = require('./GameSpace.js');

var TYPE_ROOM = "room";
var TYPE_HALL = "hall";
var TYPE_EMPTY = "empty";

class GameBoard {
    constructor(communication) {
        this.communication = communication;
        this.mBoard = [[],[],[],[],[]]
        this.mCardLocations = [];
        this.createBoard();
    }

    createBoard() {
        //row 1
        this.mBoard[0].push(new GameSpace("Study", TYPE_ROOM, -1));
        this.mBoard[0].push(new GameSpace("hallway", TYPE_HALL, 1));
        this.mBoard[0].push(new GameSpace("Hall", TYPE_ROOM, -1));
        this.mBoard[0].push(new GameSpace("hallway", TYPE_HALL, 1));
        this.mBoard[0].push(new GameSpace("Lounge", TYPE_ROOM, -1));

        //row 2
        this.mBoard[1].push(new GameSpace("hallway", TYPE_HALL, 1));
        this.mBoard[1].push(new GameSpace("NOTHING", TYPE_EMPTY, 0));
        this.mBoard[1].push(new GameSpace("hallway", TYPE_HALL, 1));
        this.mBoard[1].push(new GameSpace("NOTHING", TYPE_EMPTY, 0));
        this.mBoard[1].push(new GameSpace("hallway", TYPE_HALL, 1));

        //row 3
        this.mBoard[2].push(new GameSpace("Library", TYPE_ROOM, -1));
        this.mBoard[2].push(new GameSpace("hallway", TYPE_HALL, 1));
        this.mBoard[2].push(new GameSpace("Billiard Room", TYPE_ROOM, -1));
        this.mBoard[2].push(new GameSpace("hallway", TYPE_HALL, 1));
        this.mBoard[2].push(new GameSpace("Dinning Room", TYPE_ROOM, -1));

        //row 4
        this.mBoard[3].push(new GameSpace("hallway", TYPE_HALL, 1));
        this.mBoard[3].push(new GameSpace("NOTHING", TYPE_EMPTY, 0));
        this.mBoard[3].push(new GameSpace("hallway", TYPE_HALL, 1));
        this.mBoard[3].push(new GameSpace("NOTHING", TYPE_EMPTY, 0));
        this.mBoard[3].push(new GameSpace("hallway", TYPE_HALL, 1));

        //row 5
        this.mBoard[4].push(new GameSpace("Conservatory", TYPE_ROOM, -1));
        this.mBoard[4].push(new GameSpace("hallway", TYPE_HALL, 1));
        this.mBoard[4].push(new GameSpace("Ballroom", TYPE_ROOM, -1));
        this.mBoard[4].push(new GameSpace("hallway", TYPE_HALL, 1));
        this.mBoard[4].push(new GameSpace("Kitchen", TYPE_ROOM, -1));

        //add characters to starting positions
        this.moveCharacter(0, [0, 3]);
        this.moveCharacter(1, [4, 1]);
        this.moveCharacter(2, [1, 4]);
        this.moveCharacter(3, [1, 0]);
        this.moveCharacter(4, [3, 0]);
        this.moveCharacter(5, [4, 3]);

        /*
        this.mBoard[0][3].enterPlayer("Ms. Scarlett");
        this.mCardLocations["Ms. Scarlett"] = [0, 3];
        this.mBoard[1][0].enterPlayer("Prof. Plum");
        this.mCardLocations["Prof. Plum"] = [1, 0];
        this.mBoard[1][4].enterPlayer("Col. Mustard");
        this.mCardLocations["Col. Mustard"] = [1, 4];
        this.mBoard[3][0].enterPlayer("Mrs. Peacock");
        this.mCardLocations["Mrs. Peacock"] = [3, 0];
        this.mBoard[4][1].enterPlayer("Mr. Green");
        this.mCardLocations["Mr. Green"] = [4, 1];
        this.mBoard[4][3].enterPlayer("Mrs. White");
        this.mCardLocations["Mrs. White"] = [4, 3];
        */

        //hardcoded weapon starting locations
        this.moveWeapon(6, [0, 0]);
        this.moveWeapon(7, [2, 0]);
        this.moveWeapon(8, [4, 0]);
        this.moveWeapon(9, [0, 4]);
        this.moveWeapon(10, [2, 4]);
        this.moveWeapon(11, [4, 4]);

        //map room IDs to locations
        this.mCardLocations[12] = [0, 0];
        this.mCardLocations[13] = [0, 2];
        this.mCardLocations[14] = [0, 4];
        this.mCardLocations[15] = [2, 4];
        this.mCardLocations[16] = [2, 2];
        this.mCardLocations[17] = [2, 0];
        this.mCardLocations[18] = [4, 0];
        this.mCardLocations[19] = [4, 2];
        this.mCardLocations[20] = [4, 4];
    }

    getCurrentPosition(card) {
        //assume that these get put in in order and if the card is outside the length is is not yet in array
        if (this.mCardLocations.length > card) {
            return this.mCardLocations[card];
        }
        return [];
    }

    handleSuggestionMovement(character, weapon, room) {
        var location = this.getCurrentPosition(room);

        var move_broadcast = {};
        if (this.moveCharacter(character, location)) {
            move_broadcast.character_moved = true;
            move_broadcast.moved_character = character;
        }
        else {
            move_broadcast.character_moved = false;
        }

        if (this.moveWeapon(weapon, location)) {
            move_broadcast.weapon_moved = true;
            move_broadcast.moved_weapon = weapon;
        }
        else {
            move_broadcast.weapon_moved = false;
        }

        if (move_broadcast.character_moved || move_broadcast.weapon_moved) {
            move_broadcast.new_location_x = location[0];
            move_broadcast.new_location_y = location[1];

            this.communication.send(0, 22, move_broadcast);
        }
    }

    handlePlayerMovement(character, newLocation) {
        //assuming this is called with a detemined valid move option and to a new location
        //so no check that the movement is valid or that the character was actually moved
        this.moveCharacter(character, newLocation);
        var move_broadcast = {
            "character_moved": true,
            "weapon_moved": false,
            "moved_character": character,
            "moved_weapon": "",
            "new_location_x": newLocation[0],
            "new_location_y": newLocation[1]
        };

        this.communication.send(0, 22, move_broadcast);
    }

    moveCharacter(character, newLocation) {
        var old_pos = this.getCurrentPosition(character);
        if (old_pos != newLocation) {
            if (old_pos.length > 0) {
                this.mBoard[old_pos[0]][old_pos[1]].exitCharacter(character);
            }
            this.mBoard[newLocation[0]][newLocation[1]].enterCharacter(character);
            this.mCardLocations[character] = newLocation;
            return true;
        }
        return false;
    }

    moveWeapon(weapon, newLocation) {
        var old_pos = this.getCurrentPosition(weapon);
        if (old_pos != newLocation) {
            if (old_pos.length > 0) {
                this.mBoard[old_pos[0]][old_pos[1]].exitWeapon(weapon);
            }
            this.mBoard[newLocation[0]][newLocation[1]].enterWeapon(weapon);
            this.mCardLocations[weapon] = newLocation;
            return true;
        }
        return false;
    }

    isInRoom(character) {
        var pos = this.getCurrentPosition(character);
        return this.mBoard[pos[0]][pos[1]].getType() == TYPE_ROOM;
    }

    getPossibleMovement(character) {
        var possible_moves = [];
        var cur_pos = this.getCurrentPosition(character);
        var row = cur_pos[0];
        var col = cur_pos[1];

        if (this.isCorner(row, col)) {
            possible_moves = this.handleCorner(row, col, possible_moves);
        }

        possible_moves = this.checkNewSpace(row - 1, col, possible_moves);
        possible_moves = this.checkNewSpace(row + 1, col, possible_moves);
        possible_moves = this.checkNewSpace(row, col - 1, possible_moves);
        possible_moves = this.checkNewSpace(row, col + 1, possible_moves);

        return possible_moves;
    }

    isRoom(row, col) {
        return this.mBoard[row][col].getType() == TYPE_ROOM;
    }

    isCorner(row, col) {
        if (row == 0) {
            if (col == 0 || col == this.mBoard[0].length - 1) {
                return true;
            }
        }

        if (row == this.mBoard.length - 1) {
            if (col == 0 || col == this.mBoard[0].length - 1) {
                return true;
            }
        }

        return false;
    }

    handleCorner(row, col, possible_moves) {
        var new_row;
        var new_col;
        if (row == 0) {
            new_row = 4;
        }
        else if (row == 4) {
            new_row = 0;
        }

        if (col == 0) {
            new_col = 4;
        }
        else if (col == 4) {
            new_col = 0;
        }

        if (!this.mBoard[new_row][new_col].isAtLimit) {
            possible_moves.push([new_row, new_col]);
        }

        return possible_moves;
    }

    checkNewSpace(row, col, possible_moves) {
        //see if new space is on board and valid
        //do not handle corner cases
        if (row >= 0 && row < this.mBoard.length && col >= 0 && col < this.mBoard[0].length) {
            if (!this.mBoard[row][col].isAtLimit()) {
                possible_moves.push([row, col]);
            }
        }
        return possible_moves;
    }
}

module.exports = GameBoard;