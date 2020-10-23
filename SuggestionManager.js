
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
                }*/
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