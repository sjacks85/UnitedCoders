var io = require("socket.io-client");

// Start socket and export it for others to use
var url = "http://localhost:8000"; // This needs to change to the "public" url. | Originally 5000
const socket = io.connect(url);
export { socket };

// Called by App to join
const startClient = function (port) {
  socket.on("connect", function () {
    socket.emit("join", port);
  });
};

function sendJoinGame(create, game, username, char, player) {
  // create_game: (bool; true to start game)
  // game_id: (int; ID of the game to join if joining active game)
  // username: (string; player username)
  // character: (int; ID of chosen character)
  // player_id: (int; ID of player

  console.log("sendJoin" + game);
  var message = {
    create_game: create,
    game_id: game,
    username: username,
    character: char,
    player_id: player,
  };
  //console.log('movement request: ' + move + room)
  console.log("sendJoinGame: " + JSON.stringify(message));
  socket.emit(2, message);
}

function sendStartGame() {
  // create_game: (bool; true to start game)
  // game_id: (int; ID of the game to join if joining active game)
  // username: (string; player username)
  // character: (int; ID of chosen character)
  // player_id: (int; ID of player

  var message = {
    start_game: true,
  };
  //console.log('movement request: ' + move + room)
  console.log("sendCreateGame: " + JSON.stringify(message));
  socket.emit(4, message);
}

// Messages to server from client, called by user input
function makeMovement(move, room) {
  // “movement_made”:
  // “movement_id”:
  // }
  // movement_made (bool) - True if the player has moved to a new location, false otherwise.
  // new_location (int) - The unique ID of the chosen movement option.

  var movement = {
    movement_made: move,
    movement_id: room,
  };
  //console.log('movement request: ' + move + room)
  console.log("makeMovement: " + JSON.stringify(movement));
  socket.emit(41, movement);
}

function makeSuggestion(room, person, weapon) {
  // “suggested_character”:
  // “suggested_weapon”:
  // }
  // suggested_character (String) - The name of the character that was suggested.
  // suggested_weapon (String) - The name ID if the weapon that was suggested.

  var suggestion = {
    suggested_room: room,
    suggested_character: person,
    suggested_weapon: weapon,
  };
  console.log("suggestion request: " + room + person + weapon);
  console.log("makeSuggestion: " + JSON.stringify(suggestion));
  socket.emit(42, suggestion);
}

function makeDisprove(disprove, card) {
  // “suggestion_id”:
  // “can_disprove”:
  // “disprove_card”:
  // }
  // suggestion_id (int) - The unique ID of the suggestion being disproven.
  // can_disprove (bool) - True if the suggestion is disproved, false otherwise.
  // disprove_card (String) - The card used to disprove the suggestion; only populated if can_disprove is true.

  var disprove = {
    suggestion_id: 0,
    can_disprove: disprove,
    disprove_card: card,
  };
  //console.log('disprove request: ' + disprove + card)
  console.log("makeDisprove: " + JSON.stringify(disprove));
  socket.emit(43, disprove);
}

function makeAccusation(accuse, room, person, weapon) {
  // “accused_room”:
  // “accused_character”:
  // “accused_weapon”:
  // }
  // accused-room (String) - The name of the room that was accused.
  // accused_character (String) - The name of the character that was accused.
  // accused_weapon (String) - The name ID if the weapon that was accused.

  var accusation = {
    accuse_made: accuse,
    accused_room: room,
    accused_character: person,
    accused_weapon: weapon,
  };
  //console.log('accusation request: ' + accuse + person + weapon + room)
  console.log("makeAccusation: " + JSON.stringify(accusation));
  socket.emit(44, accusation);
}

export {
  startClient,
  sendJoinGame,
  sendStartGame,
  makeMovement,
  makeSuggestion,
  makeDisprove,
  makeAccusation,
};
