class SuggestionManager {

    constructor(communication, players) {
        //this.socket = socket;
        this.communication = communication;
        this.players = players;
        this.suggestingPlayer;
    }

    suggest(player) {

        this.suggestingPlayer = player;
        return new Promise((resolve) => {
            this.promptSuggestion(player).then((suggestion) => {
                resolve(suggestion);
            });



            //iterate through each player
            //iterate through this.players starting at index

            // let playerIndex = 0;
            // for (var i = 0; i < this.players.length; i++) {
            //     if (this.players[i] === player) {
            //         playerIndex = i;
            //     }
            // }

            // for (var i = 0; i < this.players.length; i++) {
            //     var player = (i + playerIndex) % this.players.length;
            //     this.askDisprove(player, suggestion);
            // }

        });

    }

    promptSuggestion(player) {
        return new Promise((resolve) => {

            
            const handler = (suggestion) => {
                var suggestion_string = "Player " + player.username + " suggested suspect: " + suggestion.suggested_charater +
                    " weapon: " + suggestion.suggested_weapon + " room: " + suggestion.suggested_room;
                console.log('Suggestion:', suggestion_string);
                var broadcast = {
                    "broadcast_message": suggestion_string
                };

                this.communication.send(0, 21, broadcast);

                this.askDisprove(this.getNextPlayer(player), suggestion).then(done => {
                    resolve(done);
                    resolve(suggestion);
                });
                //resolve(suggestion);
                // return;
            }

            //need to figure out how to keep track of the rooms players are in for this validation
            var suggest_request = {
                "suggested_room":""
            };

            this.communication.send(player.id, 32, suggest_request, handler, 42);
        });
    }

    askDisprove(player, suggestion) {
        return new Promise((resolve) => {

            const handler = (data) => {
                var disprove_result = {
                    "is_disproved": data.can_disprove,
                    "disprove_card": data.disprove_card
                };

                this.communication.send(this.suggestingPlayer.id, 51, disprove_result);

                var disprove_result_string = "Player " + player.username + " disproved the suggestion";
                console.log("Player disprove respones:", disprove_result_string);
                var disprove_broadcast = {
                    "broadcast_message": disprove_result_string
                }
                this.communication.send(0, 21, disprove_broadcast);
                resolve(data);
                // return;
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

/*
module.exports = {
    startSuggestion: (player_id) => {

    }
}

class SuggestionManager {


    constructor(communication, turnOrder) {
        this.mCommunication = communication;
        communication.setSuggestionCallback(handleSuggestion);
        this.mTurnOrder = turnOrder;
    }

    startSuggestion(playerId) {
        return new Promise((resolve, reject) => {
           
            //send suggestion prompt
            //create prompt
            this.mCommunication.send(currPlayer.id, "turn", "Your turn " + currPlayer.username);

            function handleSuggestion(suggestion) {
                resolve();
                console.log(suggestion);

                /*
                var player_id = suggestion.player_id;
                var player_index;

                for (var i = 0; i < this.mTurnOrder; i++) {
                    if (this.mTurnOrder[i] == player_id) {
                        player_index = i;
                    }
                }

                var disprove = false;
                var counter = 1;
                while (!disprove || counter < this.mTurnOrder.length) {

                    //create the disprove json message
                    communication.send("Do you have?", suggestion);
                }
            }

            //socket.once('suggestion', handleSuggestion);
        });
    }

    handleSuggestion(suggestion) {
        console.log(suggestion);

        var player_id = suggestion.player_id;
        var player_index;

        for (var i = 0; i < this.mTurnOrder; i++) {
            if (this.mTurnOrder[i] == player_id) {
                player_index = i;
            }
        }

        var disprove = false;
        var counter = 1;
        while (!disprove || counter < this.mTurnOrder.length) {

            //create the disprove json message
            communication.send("Do you have?", suggestion);
        }
    }

}

module.exports = SuggestionManager;
*/