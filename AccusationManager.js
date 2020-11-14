var Deck = require('./support_classes/Deck.js');

class AccusationManager {

    constructor(communication) {
        this.communication = communication;
    }

    accuse(player) {
        console.log('\n\t---AccusatinoManager starts accusation---');
        return new Promise((resolve) => {
            this.promptAccusation(player).then((accusation) => {
                resolve(accusation);
            });
        });

    }

    promptAccusation(player) {
        return new Promise((resolve) => {
            const handler = (accusation) => {
                //console.log(accusation)
                if (accusation.accuse_made == "true") {
                    //broadcast accusation
                    var character_string = Deck.getCardNameById(suggestion.suggested_character);
                    var weapon_string = Deck.getCardNameById(suggestion.suggested_weapon);
                    var room_string = Deck.getCardNameById(suggestion.suggested_room);
                    var accusation_string = "Player " + player.username + " has made an accusation of suspect: " + character_string +
                        " weapon: " + weapon_string + " room: " + room_string;
                    console.log("Player accusation:", accusation_string);
                    var accusation_broadcast = {
                        "broadcast_message": accusation_string
                    }
                    this.communication.send(0, 21, accusation_broadcast);

                    //right now, assume accusation is correct
                    var accusation_result = {
                        "accusation_correct": true,
                        "correct_room": accusation.accused_room,
                        "correct_character": accusation.accused_character,
                        "correct_weapon": accusation.accused_weapon,
                    }
                    this.communication.send(player.id, 52, accusation_result);

                    //broadcast accusation result
                    var accusation_result_string = "Player " + player.username + " has won, their accusation was correct.";
                    console.log("Player accusation result:", accusation_result_string);
                    var accusation_result_broadcast = {
                        "broadcast_message": accusation_result_string
                    }
                    this.communication.send(0, 21, accusation_result_broadcast);

                    //end of game message
                    //TODO - this should prob move to turn manager
                    var end = {
                        "game_over": true,
                        "wining_player": player.username,
                        "correct_room": accusation.accused_room,
                        "correct_character": accusation.accused_character,
                        "correct_weapon": accusation.accused_weapon,
                    }
                    this.communication.send(0, 61, end);
                }

                resolve(accusation);
                // return;
            }

            //accusation request is an empty message with the correct message ID
            var accusation_request = {};

            this.communication.send(player.id, 34, accusation_request, handler, 44);
        });
    }
}

module.exports = AccusationManager;