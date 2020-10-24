var SuggestionManager = require('./SuggestionManager.js');
// var AccusationManager = require('./AccusationManager.js');
const { resolve } = require('path');

class TurnManager {

    constructor(communication, players) {
        this.communication = communication;
        //this.socket = socket;
        this.players = players;

        this.suggestionManager = new SuggestionManager(communication, players);
    }

    async startGame() {
        // while (true) {
        // for (var i = 0; i < this.players.length; i++) {
        //     await this.newTurn(this.players[i]);
        // }

        // await this.newTurn(currPlayer);
        // this.players.push(currPlayer)
        // }

        //just do one turn for now
         var currPlayer = this.players[0];
        //var currPlayer = this.players[1]; //ISSUE: Works fin with the last client in the list but not for any before??, the server doesn't get the suggestion response from the client
        await this.newTurn(currPlayer);

    }

    newTurn(player) {
        return new Promise((resolve) => {
            this.suggestionManager.suggest(player).then(done => {
                console.log("end of suggestion")
                //console.log("Movement?");
                //console.log('Accusation?');
                resolve(done)
            });
        })
    }

}

module.exports = TurnManager;



/*var movement_man = require('./MovementManager.js');
var sugg_man = require('./SuggestionManager.js');
var accuation_man = require('./AccusationManager.js');

module.exports = {
    startTurn: (player_id) => {
        //communication.send(currPlayer.id, "turn", "Your turn " + currPlayer.username);

        //call movement manager to prompt and get movement

        //call suggestion manager to prompt, get, disprove suggestion
        //suggestion manager needs the turn order too
        //sugg_man.startSuggestion(player_id);
    }
}*/
