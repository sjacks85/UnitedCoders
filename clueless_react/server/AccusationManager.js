var Deck = require('./support_classes/Deck.js');

class AccusationManager {

    constructor(communication, deck) {
        this.communication = communication;
        this.deck = deck;

        console.log("ENVELOPE CARDS:", this.deck.envelope)
    }

    accuse(player) {
        console.log('\n\t---AccusatinoManager starts accusation---');
        return new Promise((resolve) => {
            this.promptAccusation(player).then((game_over) => {
                resolve(game_over);
            });
        });

    }

    promptAccusation(player) {
        return new Promise((resolve) => {
            const handler = (accusation) => {

                var return_info = {
                    "game_over": false,
                    "revoked_player": false
                };

                //console.log(accusation)
                if (accusation.accuse_made == "true") {
                    //broadcast accusation


                    var character_string = Deck.getCardNameById(accusation.accused_character);
                    var weapon_string = Deck.getCardNameById(accusation.accused_weapon);
                    var room_string = Deck.getCardNameById(accusation.accused_room);
                    var accusation_string = "Player " + player.username + " has made an accusation of suspect: " + character_string +
                        " weapon: " + weapon_string + " room: " + room_string;
                    console.log("Player accusation:", accusation_string);
                    var accusation_broadcast = {
                        "broadcast_message": accusation_string
                    }
                    this.communication.send(0, 21, accusation_broadcast);


                    var envelope = this.deck.envelope;
                    var envelope_character = envelope[0].Id;
                    var envelope_weapon = envelope[1].Id;
                    var envelope_room = envelope[2].Id;

                    var accusation_result;
                    var accusation_result_string;

                    if (envelope_character === character_string && envelope_weapon === weapon_string && envelope_room === room_string) {
                        //correct accusation
                        return_info.game_over = true;
                        accusation_result = {
                            "accusation_correct": true,
                            "correct_room": envelope_room,
                            "correct_character": envelope_character,
                            "correct_weapon": envelope_weapon,
                        }

                        accusation_result_string = "Player " + player.username + " has won, their accusation was correct.";

                        console.log("SENDING GAME OVER MESSAGE")
                        //end of game message
                        var end = {
                            "game_over": true,
                            "wining_player": player.username,
                            "correct_room": envelope_room,
                            "correct_character": envelope_character,
                            "correct_weapon": envelope_weapon,
                        }
                        this.communication.send(0, 61, end);

                    } else {
                        //incorrect accusation
                        accusation_result = {
                            "accusation_correct": false,
                            "correct_room": envelope_room,
                            "correct_character": envelope_character,
                            "correct_weapon": envelope_weapon,
                        }
                        return_info.revoked_player = true;

                        accusation_result_string = "Player " + player.username + " has lost, their accusation was incorrect.";
                    }

                    this.communication.send(player.id, 52, accusation_result);

                    //broadcast accusation result
                    console.log("Player accusation result:", accusation_result_string);
                    var accusation_result_broadcast = {
                        "broadcast_message": accusation_result_string
                    }
                    this.communication.send(0, 21, accusation_result_broadcast);
                }

                resolve(return_info);
                // return;
            }

            //accusation request is an empty message with the correct message ID
            var accusation_request = {};

            this.communication.send(player.id, 34, accusation_request, handler, 44);
        });
    }
}

module.exports = AccusationManager;