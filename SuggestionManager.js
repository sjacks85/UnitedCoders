
class SuggestionManager {

    constructor(socket, players) {
        this.socket = socket;
        this.players = players;
    }

    suggest(player) {
        

        return new Promise((resolve) => {
            this.promptSuggestion(player).then((suggestion) => {
                console.log("Getting here 2")
                console.log('Suggestion:', suggestion);
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
                console.log("Getting here 1")
                resolve(suggestion);
                // return;
            }

            player.socket.emit("suggestion", "Your turn " + player.username);
            this.socket.on('suggestion', handler);
        });
    }

    askDisprove(player, suggestion) {
        return new Promise((resolve) => {

            const handler = function (data) {
                console.log("Player disprove respones:", data);
                player.socket.emit("disprove server response", player.username + " has the card: " + data);
                resolve(data);
                // return;
            }

            player.socket.emit('disprove', suggestion);
            this.socket.once('disprove', handler);
        });

    }

}


module.exports = SuggestionManager;