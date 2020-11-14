var MovementManager = require('./MovementManager.js');
var SuggestionManager = require('./SuggestionManager.js');
var AccusationManager = require('./AccusationManager.js');
var GameBoard = require('./GameBoard.js');
const { resolve } = require('path');

class TurnManager {

    constructor(communication, players) {
        this.players = players;

        this.gameBoard = new GameBoard(communication);
        this.movementManager = new MovementManager(communication, this.gameBoard, players);
        this.suggestionManager = new SuggestionManager(communication, this.gameBoard, players);
        this.accusationManager = new AccusationManager(communication);
    }

    async startGame() {
        while (true) {
            for (var i = 0; i < this.players.length; i++) {
                console.log('\n---TurnManager starts next turn---\n');
                await this.newTurn(this.players[i]);
            }
        }
    }

    newTurn(player) {
        return new Promise((resolve) => {
            this.movementManager.move(player).then(move_done => {
                this.suggestionManager.suggest(player).then(suggest_done => {
                    this.accusationManager.accuse(player).then(accuse_done => {
                        resolve(accuse_done);
                        resolve(suggest_done);
                        resolve(move_done);
                    });
                });
            });
        })
    }

}

module.exports = TurnManager;
