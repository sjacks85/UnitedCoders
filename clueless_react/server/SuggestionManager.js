var Deck = require('./support_classes/Deck.js');

class SuggestionManager {

    constructor(communication, gameboard, players) {
        //will have to pass in cards for string mapping too
        this.communication = communication;
        this.gameboard = gameboard;
        this.players = players;
        this.suggestingPlayer;
    }

    suggest(player) {

        console.log('\n\t---SuggestionManager starts suggestion logic---');
        //only prompt for a suggestion if the player is in a room and can make a suggestion
        this.suggestingPlayer = player;
        return new Promise((resolve) => {
            if (this.gameboard.isInRoom(player.character)) {
                this.promptSuggestion(player).then((suggestion) => {
                    resolve(suggestion);
                });
            }
            else {
                resolve(null);
            }
        });
    }

    promptSuggestion(player) {
        return new Promise((resolve) => {

            const handler = (suggestion) => {
                var character_string = Deck.getCardNameById(suggestion.suggested_character);
                var weapon_string = Deck.getCardNameById(suggestion.suggested_weapon);
                var room_string = Deck.getCardNameById(suggestion.suggested_room);
                var suggestion_string = "Player " + player.username + " suggested suspect: " + character_string +
                    " weapon: " + weapon_string + " room: " + room_string;
                console.log('Suggestion:', suggestion_string);
                var broadcast = {
                    "broadcast_message": suggestion_string
                };

                this.communication.send(0, 21, broadcast);

                this.gameboard.handleSuggestionMovement(suggestion.suggested_character, suggestion.suggested_weapon, suggestion.suggested_room);

                //ask each next player
                for (let i = 0, p = Promise.resolve(); i < this.players.length - 1; i++) {
                    
                    p = p.then(() => this.askDisprove(this.getNextPlayer(player), suggestion).then(done => {
                        
                        if (done.can_disprove === "false") {
                            console.log("CURRENT PLAYER COULD NOT DISPROVE, MOVING TO THE NEXT")
                            player = this.getNextPlayer(player);
                        } else {
                            console.log("GOING INTO ELSE STATEMENT")
                            //BREAK OUT OF THE LOOP HERE SINCE A PLAYER WAS ABLE TO DISPROVE!!!
                            resolve(done);
                            resolve(suggestion);
                            
                        }

                        // if no player can disprove
                        if (i === this.players.length - 2) {
                            console.log("ENDING DISPROVE")
                            resolve(done);
                            resolve(suggestion);
                        }
                    }));
                }
            }

            //suggestion request is an empty message with the correct message ID
            var suggest_request = {};
            this.communication.send(player.id, 32, suggest_request, handler, 42);
        });
    }

    askDisprove(player, suggestion) {
        return new Promise((resolve) => {

            const handler = (data) => {
                var disprove_result = {
                    "is_disproved": data.can_disprove,
                    "disprove_card": data.disprove_card,
                    "disproving_player": player.username
                };

                this.communication.send(this.suggestingPlayer.id, 51, disprove_result);

                var disprove_result_string;
                if (data.can_disprove) {
                    disprove_result_string = "Player " + player.username + " disproved the suggestion";
                    
                }
                else {
                    disprove_result_string = "Player " + player.username + " could not disprove the suggestion";
                }
                console.log("Player disprove respones:", disprove_result_string);
                var disprove_broadcast = {
                    "broadcast_message": disprove_result_string
                }

                this.communication.send(0, 21, disprove_broadcast);
                resolve(data);
            }

            var disprove_request = {
                "suggested_room": suggestion.suggested_room,
                "suggested_character": suggestion.suggested_character,
                "suggested_weapon": suggestion.suggested_weapon
            };

            this.communication.send(player.id, 33, disprove_request, handler, 43);

        });

    }

    getNextPlayer(currPlayer) {
        var currPlayerIndex = 0;
        for (var i = 0; i < this.players.length; i++) {
            if (currPlayer.id == this.players[i].id) {
                currPlayerIndex = i;
            }
        }

        var nextPlayerIndex = currPlayerIndex + 1;
        if (nextPlayerIndex == this.players.length) {
            nextPlayerIndex = 0;
        }
        console.log(nextPlayerIndex)
        return this.players[nextPlayerIndex];
    }
}


module.exports = SuggestionManager;
