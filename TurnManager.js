var MovementManager = require('./MovementManager.js');
var SuggestionManager = require('./SuggestionManager.js');
var AccusationManager = require('./AccusationManager.js');
const { resolve } = require('path');

class TurnManager {

    constructor(communication, players) {
        this.communication = communication;
        this.players = players;

        this.movementManager = new MovementManager(communication);
        this.suggestionManager = new SuggestionManager(communication, players);
        this.accusationManager = new AccusationManager(communication);
    }

    async startGame() {
        while (true) {
            for (var i = 0; i < this.players.length; i++) {
                await this.newTurn(this.players[i]);
            }
        }
    }

    newTurn(player) {
        return new Promise((resolve) => {
            this.movementManager.move(player).then(move_done => {
                console.log('movement done');
                this.suggestionManager.suggest(player).then(suggest_done => {
                    console.log("end of suggestion")
                    this.accusationManager.accuse(player).then(accuse_done => {
                        console.log("end of accusation")
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
