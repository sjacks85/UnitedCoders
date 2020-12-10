var io = require("socket.io-client");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// var CARDS = require('./game_data/cards.json');

var myArgs = process.argv.slice(2);
var username = myArgs[0];
var id;
var cards;

var url = "http://localhost:5000";

var socket = io.connect(url);

socket.on("connect", function () {
  console.log("Connected");
  socket.emit("join", username);
});

socket.on("game", (full_message) => {
  type = full_message.message_type;
  message = full_message.message;
  if (type == 01) {
    console.log(message);
    id = message.player_id;
    rl.question("Character: ", (char_id) => {
      var return_message = {
        username: username,
        character: char_id,
        player_id: message.player_id,
      };
      if (message.active_game == false) {
        return_message.create_game = true;
      } else {
        return_message.game_id = message.game_id;
      }
      socket.emit(02, return_message);
    });
  }

  if (type == 03) {
    console.log(message);
    if (message.host == id && message.can_start) {
      var start = {
        start_game: true,
      };
      console.log("starting game...");
      socket.emit(04, start);
    }
  }

  if (type == 11) {
    console.log("Cards:", message);
  }
  if (type == 21) {
    console.log(message.broadcast_message);
  }
  if (type == 22) {
    console.log(
      "player " +
        message.moved_character +
        " moved to [" +
        message.new_location_x +
        ", " +
        message.new_location_y +
        "]."
    );
  }
  if (type == 31) {
    console.log(message);

    rl.question("New Location: ", (move_id) => {
      var movement = {
        movement_made: "true",
        movement_id: move_id,
      };
      socket.emit(41, movement);
    });
  }
  if (type == 32) {
    console.log(message);

    rl.question("Suspect: ", (suspect) => {
      rl.question("Weapon: ", (weapon) => {
        rl.question("Room: ", (room) => {
          var suggestion = {
            suggested_character: suspect,
            suggested_weapon: weapon,
            suggested_room: room,
          };

          socket.emit(42, suggestion);
        });
      });
    });
  }
  if (type == 33) {
    rl.question(
      "do you have any of these cards?: " + JSON.stringify(message) + "\n",
      (card) => {
        if (card == "no") {
          var disprove = {
            can_disprove: "false",
            disprove_card: -1,
          };
        } else {
          var disprove = {
            can_disprove: "true",
            disprove_card: card,
          };
        }
        socket.emit(43, disprove);
      }
    );
  }
  if (type == 34) {
    console.log(message);

    rl.question("Accuse?: ", (accuse_res) => {
      if (accuse_res == "yes") {
        rl.question("Suspect: ", (suspect) => {
          rl.question("Weapon: ", (weapon) => {
            rl.question("Room: ", (room) => {
              var accuse = {
                accuse_made: "true",
                accused_room: room,
                accused_character: suspect,
                accused_weapon: weapon,
              };

              socket.emit(44, accuse);
            });
          });
        });
      } else {
        var accuse = {
          accuse_made: false,
        };
        socket.emit(44, accuse);
      }
    });
  }
  if (type == 51) {
    console.log("another player has " + message.disprove_card);
  }
});

socket.on("suggestion", (data) => {
  console.log(data);

  rl.question("Suspect: ", (suspect) => {
    rl.question("Weapon: ", (weapon) => {
      rl.question("Room: ", (room) => {
        var suggestion = {
          suspect: suspect,
          weapon: weapon,
          room: room,
        };

        socket.emit("suggestion", suggestion);
      });
    });
  });
});

socket.on("ping", (message) => {
  console.log(message);
  socket.emit("pong", "pong");
});

socket.on(11, (data) => {
  console.log("Cards:", data.message);
});

socket.on("disprove", (suggestion) => {
  rl.question(
    "do you have any of these cards?: " + JSON.stringify(suggestion) + "\n",
    (card) => {
      socket.emit("disprove", card);
    }
  );
});

socket.on(31, (move) => {
  console.log(move);

  rl.question("New Location: ", (move_id) => {
    var movement = {
      movement_made: true,
      movement_id: move_id,
    };
    socket.emit(41, movement);
  });
});

socket.on("accusation", (accusation) => {
  console.log(accusation);

  rl.question("Accuse?: ", (accuse_res) => {
    var accuse = {
      accuse: accuse_res,
    };
    socket.emit("accusation", accuse);
  });
});

socket.on(21, (broadcast) => {
  console.log(broadcast);
});

socket.on("disprove server response", (response) => {
  console.log(response);
});

rl.on("close", function () {
  process.exit(0);
});

function addHeader(type, message) {
  var full_message = {
    game_id: 0,
    player_id: 0,
    message_type: type,
    message: message,
  };
  return full_message;
}
