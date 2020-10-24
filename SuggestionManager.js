class SuggestionManager {

    suggestionHandler = (suggestion) => {
        resolve(suggestion);
        // return;
    }

    constructor(communication, players) {
        //this.socket = socket;
        this.communication = communication;
        this.players = players;
        this.suggestingPlayer;
        //communication.setSuggestHandler(suggestionHandler);
    }

    suggest(player) {

        this.suggestingPlayer = player;
        return new Promise((resolve) => {
            this.promptSuggestion(player).then((suggestion) => {
                resolve(suggestion);
                //this.communication.send(player.id, "disprove server response", player.username + " has the card: " + data);
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

                console.log('Suggestion:', suggestion);
                this.askDisprove(this.getNextPlayer(player), suggestion).then(done => {
                    resolve(done);
                    resolve(suggestion);
                });


                //resolve(suggestion);
                // return;
            }

            this.communication.send(player.id, "suggestion", "Your turn " + player.username, handler);
        });
    }

    askDisprove(player, suggestion) {
        return new Promise((resolve) => {

            const handler = (data) => {
                console.log("Player disprove respones:", data);
                this.communication.send(this.suggestingPlayer.id, "disprove server response", player.username + " has the card: " + data);
                resolve(data);
                // return;
            }

            this.communication.send(player.id, "disprove", suggestion, handler);

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