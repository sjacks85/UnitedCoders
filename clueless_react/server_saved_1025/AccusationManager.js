class AccusationManager {

    constructor(communication) {
        this.communication = communication;
    }

    accuse(player) {
        return new Promise((resolve) => {
            this.promptAccusation(player).then((accusation) => {
                resolve(accusation);
            });
        });

    }

    promptAccusation(player) {
        return new Promise((resolve) => {
            const handler = (accusation) => {
                //broadcast accusation
                var accusation_string = "Player " + player.username + " has made an accusation of suspect: " + accusation.accused_character +
                    " weapon: " + accusation.accused_room + " room: " + accusation.accused_room;
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

                resolve(accusation);
                // return;
            }

            //this will prob go away eventually, not technically in ICD
            var accusation_request = {
                "accusation":""
            };

            this.communication.send(player.id, 34, accusation_request, handler, 44);
        });
    }
}

module.exports = AccusationManager;