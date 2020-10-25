

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var Communication = require('./Communication.js');
var TurnManager = require('./TurnManager.js');

var CARDS = require('./game_data/cards.json');
var envelope;

var players = [];

function registerPlayer(playerObj) {
    players.push(playerObj);

    // if enough players have joined then start the game
    if (players.length >= 3) {
        startGame();
    }
}

function startGame() {
    //Run initial setup and kickoff game
    console.log("Starting Game")
    assignCards();
    var turnManager = new TurnManager(Communication, players);
    turnManager.startGame();
}

function assignCards() {
  var suspects = CARDS.suspects;
  var weapons = CARDS.weapons;
  var rooms = CARDS.rooms;

  // Assign cards for envelope
  var suspect = randomSelection(suspects);
  var weapon = randomSelection(weapons);
  var room = randomSelection(rooms);
  suspects.splice(suspects.indexOf(suspect), 1);
  weapons.splice(weapons.indexOf(weapon), 1);
  rooms.splice(rooms.indexOf(room), 1);

  envelope = {
    "suspect": suspect,
    "weapon": weapon,
    "room": room
  };

  console.log("Envelope Cards:", envelope);

  //Assign cards to players
  for (var i = 0; i < players.length; i++) {
    if (suspects.length > 0) {
      var suspect = randomSelection(suspects);
      suspects.splice(suspects.indexOf(suspect), 1);
    }
    if (weapons.length > 0) {
      var weapon = randomSelection(weapons);
      weapons.splice(weapons.indexOf(weapon), 1);
    }
    if (rooms.length > 0) {
      var room = randomSelection(rooms);
      rooms.splice(rooms.indexOf(room), 1);
      }

      var setup_message = {
          "username": players[i].username,
          // KPC: Is player id supposed to be 0?
          // {"game_id":0,"player_id":0,"message_type":11,"message":{"username":"3002","player_id":3,
          // "character":"Mrs. White","cards":["Mrs. White","Wrench","Billiards Room"]}}
          "player_id": players[i].id,
          //right now everyone is playing as the card they get
          "character": suspect,
          "cards": [suspect, weapon, room]
      };

      //broadcast these, have clients look for matching username to get player id for future
      Communication.send(0, 11, setup_message);
  }
}

function randomSelection(cards) {
  return cards[Math.floor(Math.random() * cards.length)];
}


http.listen(5000, () => {
    console.log('listening on http://localhost:5000');
    Communication.startListening(io, registerPlayer);
});

module.exports = app;



