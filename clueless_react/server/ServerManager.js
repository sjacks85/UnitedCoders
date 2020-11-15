
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

var Communication = require("./Communication.js");
var TurnManager = require("./TurnManager.js");
var CardDeck = require("./support_classes/Deck.js");

var players = [];

function registerPlayer(playerObj) {
    players.push(playerObj);

    // If enough players have joined then start the game.
    if (players.length >= 1) {
        startGame();
    }
}

function startGame() {
    //Run initial setup and kickoff game.
    console.log("Starting Game");
    var deck = assignCards();
    var turnManager = new TurnManager(Communication, players, deck);
    turnManager.startGame();
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
            character_id: CardDeck.idMapping[i].Id, // Note: This works because the first 6 ID Mapping Objects are Characters/Suspects.
            character: CardDeck.idMapping[i].Name,
            cards: playerHandAssignment[i],
        };

        //Broadcast each Setup Message; Have clients look for matching username to get player id for future.
        Communication.send(0, 11, setup_message);

        players[i].character = CardDeck.idMapping[i].Id; // Note: This works because the first 6 ID Mapping Objects are Characters/Suspects.
    }

    return cardDeck;
}

http.listen(5000, () => {
    console.log("listening on http://localhost:5000");
    Communication.startListening(io, registerPlayer);
});

module.exports = app;