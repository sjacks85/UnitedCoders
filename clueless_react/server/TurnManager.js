var MovementManager = require('./MovementManager.js');
var SuggestionManager = require('./SuggestionManager.js');
var AccusationManager = require('./AccusationManager.js');
var GameBoard = require('./GameBoard.js');
const { resolve } = require('path');

class TurnManager {

    constructor(communication, players, deck) {
        this.players = players;
        this.communication = communication;
        this.deck = deck;
        this.revoked_players = [];
        this.game_over = false;

        this.gameBoard = new GameBoard(communication);
        this.movementManager = new MovementManager(communication, this.gameBoard, players);
        this.suggestionManager = new SuggestionManager(communication, this.gameBoard, players);
        this.accusationManager = new AccusationManager(communication, this.deck);
    }

    async startGame() {
        while (!this.game_over) {
            for (var i = 0; i < this.players.length; i++) {
                if (!this.game_over && !this.revoked_players.includes(this.players[i])) {
                    console.log('\n---TurnManager starts next turn---\n');
                    await this.newTurn(this.players[i]);
                }
                else {
                    console.log("revoked player, skipping turn");
                }
            }
        }
    }

    newTurn(player) {
        return new Promise((resolve) => {
            this.movementManager.move(player).then(move_done => {
                this.suggestionManager.suggest(player).then(suggest_done => {
                    this.accusationManager.accuse(player).then(accuse_done => {
                        this.game_over = accuse_done.game_over;
                        if (accuse_done.revoked_player) {
                            this.revoked_players.push(player);
                            //if all players are revoked, the game is over
                            if (this.revoked_players.length == this.players.length) {
                                this.game_over = true;
                                console.log("SENDING GAME OVER MESSAGE BECAUSE ALL PLAYERS REVOKED")
                                var envelope = this.deck.envelope;
                                //end of game message
                                var end = {
                                    "game_over": true,
                                    "wining_player": "no player",
                                    "correct_room": envelope[2].Name,
                                    "correct_character": envelope[0].Name,
                                    "correct_weapon": envelope[1].Name
                                };
                                this.communication.send(0, 61, end);
                            }
                        }
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
