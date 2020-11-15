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

                var game_over = false;

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
                    var envelope_character = envelope[0].Name;
                    var envelope_weapon = envelope[1].Name;
                    var envelope_room = envelope[2].Name;

                    var accusation_result;

                    if (envelope_character === character_string && envelope_weapon === weapon_string && envelope_room === room_string) {
                        //correct accusation
                        accusation_result = {
                            "accusation_correct": true,
                            "correct_room": accusation.accused_room,
                            "correct_character": accusation.accused_character,
                            "correct_weapon": accusation.accused_weapon,
                        }

                        console.log("SENDING GAME OVER MESSAGE")
                        //end of game message
                        var end = {
                            "game_over": true,
                            "wining_player": player.username,
                            "correct_room": accusation.accused_room,
                            "correct_character": accusation.accused_character,
                            "correct_weapon": accusation.accused_weapon,
                        }
                        this.communication.send(0, 61, end);

                    } else {
                        //incorrect accusation
                        accusation_result = {
                            "accusation_correct": false,
                            "correct_room": accusation.accused_room,
                            "correct_character": accusation.accused_character,
                            "correct_weapon": accusation.accused_weapon,
                        }
                    }

                    this.communication.send(player.id, 52, accusation_result);

                    //broadcast accusation result
                    var accusation_result_string = "Player " + player.username + " has won, their accusation was correct.";
                    console.log("Player accusation result:", accusation_result_string);
                    var accusation_result_broadcast = {
                        "broadcast_message": accusation_result_string
                    }
                    this.communication.send(0, 21, accusation_result_broadcast);
                }

                resolve(game_over);
                // return;
            }

            //accusation request is an empty message with the correct message ID
            var accusation_request = {};

            this.communication.send(player.id, 34, accusation_request, handler, 44);
        });
    }
}

module.exports = AccusationManager;