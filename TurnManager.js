var movement_man = require('./MovementManager.js');
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
}
