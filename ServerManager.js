

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var CARDS = require('./game_data/cards.json');
var envelope;

var clients = [];
var currClient;
var askedClientIndex = 0;
var currSuggestion;


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
    if (clients.length >= 3) {
      startGame();
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

  // handle the event sent with socket.send()
  socket.on('message', data => {
    console.log(data);
  });


  // handle socket.emit() suggestion
  socket.on('suggestion', suggestion => {
    console.log(suggestion);
    currSuggestion = suggestion;

    clients[askedClientIndex].socket.emit("Do you have?", currSuggestion);
  });


  socket.on("I have", (card) => {
    if (card.toUpperCase() === "NO" && (askedClientIndex + 2) < clients.length) {
      //ask next client
      askedClientIndex++;
      clients[askedClientIndex].socket.emit("Do you have?", currSuggestion);

    } else if (card.toUpperCase() === "NO") {
      askedClientIndex = 0;
      currClient.socket.emit("Has your card", "No player has your card");
      nextTurn();
    } else {
      currClient.socket.emit("Has your card", clients[askedClientIndex].username + " has the card: " + card); //send client which has the card
      nextTurn();
    }
  });
});


function startGame() {
  //Run initial setup and kickoff game
  console.log("Starting Game")
  assignCards();
  nextTurn();
}


function nextTurn() {
  currClient = clients.shift();
  currClient.socket.emit("turn", "Your turn " + currClient.username);
  clients.push(currClient);
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

    clients[i].socket.emit("assignCards", cards);
  }
}

function randomSelection(cards) {
  return cards[Math.floor(Math.random() * cards.length)];
}


http.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});

module.exports = app;



