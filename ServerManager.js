// Separate backend into subsystems
// need functionality for accusation and movement

// This should set up initial game and handle clients joining
// Communication utility??
// initialize each of the managers and route traffic that way?


var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


var TurnManager = require('./TurnManager.js');


var CARDS = require('./game_data/cards.json');
var envelope;
var clients = [];

io.on('connection', function (socket) {

  // If a client joins then add them to the list of clients
  socket.on('join', function (username) {
    console.log(username, "joined")

    clientObj = {
      "username": username,
      "socket": socket
    };
    clients.push(clientObj);


    // if enough players have joined then start the game
    if (clients.length >= 2) {
      console.log("Starting Game");
      // assignCards();


      var turnManager = new TurnManager(socket, clients);
      turnManager.startGame();

    }


    if (clients.length > 6) {
      //STOP LISTENING FOR NEW CONNECTIONS
      // io.close(); ?
    }

    
  });


    // handle client disconnect
    socket.on('end', function () {
      console.log("Client disconnected...");
    });
  
    socket.on("pong", message => {
      console.log(message);
    });
  

  // handle the event sent with socket.send()
  socket.on('message', data => {
    console.log(data);
  });

});




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
  for (var i = 0; i < clients.length; i++) {
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

    var cards = {
      "suspect": suspect,
      "weapon": weapon,
      "room": room
    }

    // clients[i].socket.emit("assignCards", cards);
  }
}

function randomSelection(cards) {
  return cards[Math.floor(Math.random() * cards.length)];
}


http.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});

module.exports = app;



