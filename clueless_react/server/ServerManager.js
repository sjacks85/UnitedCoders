
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

var Communication = require("./Communication.js");
var TurnManager = require("./TurnManager.js");
var CardDeck = require("./support_classes/Deck.js");

//players on waiting room screen
var waiting_players = [];
//players who have joined the game
var players = [];
var active_game = false;
var game_started = false;
var current_game_id, host;
var avail_characters = CardDeck.getAllSuspects();
var host;

function connectionCallback(playerObj) {
    //right now playerObj only has player id
    //do we need to keep track of this? Right now not removing anyone from waiting players
    //todo fill in the update players in Communication so broadbasts during gameplay only go to players who joined
    waiting_players.push(playerObj);

    var status_message = {
        "active_game": active_game,
        "game_started": game_started,
        "game_id": current_game_id,
        "num_players": players.length,
        "players": players,
        "host": host,
        "available_characters": avail_characters,
        "player_id": playerObj.id
    };
        
    Communication.send(playerObj.id, 01, status_message, setupPlayer, 02);
}

function setupPlayer(playerInfo) {
    if (!game_started) {

        //if there is an active game but the client requested to join a different game or
        //if there is not an active game but the client is not starting one
        //log that the player cannot join a game 
        if ((active_game && playerInfo.game_id != current_game_id) ||
            !active_game && playerInfo.create_game != 'true') {
            //todo send message back to client if players can't join?
            console.log("cannot find game to join");
            return;
        }

        if (!active_game && playerInfo.create_game == 'true') {
            //arbitrary - should probably do something nicer here
            //def need to do something nicer here for multi game support
            current_game_id = 1;
            active_game = true;
            host = playerInfo.player_id;
        }

        //create the new player
        var new_player = {
            "id": Number(playerInfo.player_id),
            "username": playerInfo.username,
            "character": Number(playerInfo.character)
        };
        players.push(new_player);

        //get the index of the character and remove it from available characters
        if (avail_characters.includes(new_player.character)) {
            var ind = avail_characters.indexOf(new_player.character);
            avail_characters.splice(ind, 1);
        }

        //send update message to everyone (this includes waiting room)
        //add update of avail characters?
        var can_start = players.length >= 4;
        var must_start = players.length === 6;
        var update_message = {
            "num_players": players.length,
            "can_start": can_start,
            "must_start": must_start,
            "players": players,
            "host": host,

        };

        Communication.send(0, 03, update_message, startGame, 04);

    }
    else {
        //todo send message back to client if players can't join?
        console.log("Cannot join game, game has started");
    }
}

function startGame(startMessage) {
    if (!game_started && players.length >= 4 && players.length < 7 && startMessage.start_game == 'true') {
        //Run initial setup and kickoff game.
        game_started = true;
        console.log("Starting Game");
        var deck = assignCards();
        var turnManager = new TurnManager(Communication, players, deck);
        turnManager.startGame();
    }
}

function assignCards() {
    // Create Deck of Clue-Less Cards.
    var cardDeck = new CardDeck();
    cardDeck.populateLocalDeck();

    // Assign/Add "Murder Scene" Solution Cards to Envelope.
    cardDeck.generateEnvelope();
    console.log("Picking Envelope Cards...");
    console.log(cardDeck.envelope);

    // Shuffle Remaining Cards in Deck.
    cardDeck.shuffleDeck();

    // Assign Each Player a Hand.
    var playerHandAssignment = cardDeck.generatePlayerHands(players.length);

    //Assign cards to players
    for (var i = 0; i < players.length; i++) {
        var setup_message = {
            username: players[i].username,
            player_id: players[i].id,
            character_id: players[i].character,
            character: CardDeck.getCardNameById(players[i].character),
            cards: playerHandAssignment[i],
        };

        //Broadcast each Setup Message; Have clients look for matching username to get player id for future.
        Communication.send(0, 11, setup_message);
    }

    return cardDeck;
}

http.listen(5000, () => {
    console.log("listening on http://localhost:5000");
    Communication.startListening(io, connectionCallback);
});

module.exports = app;