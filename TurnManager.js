
var SuggestionManager = require('./SuggestionManager.js');
var AccusationManager = require('./AccusationManager.js');

class TurnManager {

    constructor(socket, players) {
        this.socket = socket;
        this.players = players;

        this.suggestionManager = new SuggestionManager(socket, players);
    }

    // run through turns
    // call suugesstion manager
    startGame() {
        // while (true) {
        //     for (var i = 0; i < this.players.length; i++) {
        //         this.newTurn(this.players[i]);
        //     }
        // }
        
        this.newTurn(this.players[0]);
    }

    newTurn(player) {
        // this.suggestionManager.hello();

        // this.suggestionManager.suggest(player);
        this.suggestionManager.promptSuggestion(player);

        // var currClient = this.clients.shift();
        // currClient.socket.emit("turn", "Your turn " + currClient.username);
        // this.clients.push(currClient);
    }

}

module.exports = TurnManager;