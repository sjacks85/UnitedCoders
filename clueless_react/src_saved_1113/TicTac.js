import React from "react";
import { Square } from "./Square";
import memoize from "memoize-one";
import {
  makeMovement,
  makeSuggestion,
  makeDisprove,
  makeAccusation,
} from "./ClientManager";

var uniqueIDs = [
  { type: "character", name: "Miss Scarlet", image: "P1" },
  { type: "character", name: "Mr. Green", image: "P2" },
  { type: "character", name: "Colonel Mustard", image: "P3" },
  { type: "character", name: "Prof. Plum", image: "P4" },
  { type: "character", name: "Mrs. Peacock", image: "P5" },
  { type: "character", name: "Mrs. White", image: "P6" },
  { type: "weapon", name: "Candlestick", image: "W1" },
  { type: "weapon", name: "Revolver", image: "W2" },
  { type: "weapon", name: "Knife", image: "W3" },
  { type: "weapon", name: "Pipe", image: "W4" },
  { type: "weapon", name: "Rope", image: "W5" },
  { type: "weapon", name: "Wrench", image: "W6" },
  { type: "room", name: "Study" },
  { type: "room", name: "Hall" },
  { type: "room", name: "Lounge" },
  { type: "room", name: "Dinning" },
  { type: "room", name: "Billiard" },
  { type: "room", name: "Library" },
  { type: "room", name: "Conservatory" },
  { type: "room", name: "Ballroom" },
  { type: "room", name: "Kitchen" },
];

var roomCode = [
  "11",
  "12",
  "13",
  "21",
  "22",
  "23",
  "31",
  "32",
  "33",
  "1112",
  "1213",
  "1121",
  "1222",
  "1323",
  "2122",
  "2223",
  "2131",
  "2232",
  "2333",
  "3132",
  "3233",
];

var startXY = {
  P0: {
    startX: -1,
    startY: -1,
  },
  P1: {
    startX: 3,
    startY: 4,
  },
  P2: {
    startX: 4,
    startY: 3,
  },
  P3: {
    startX: 3,
    startY: 0,
  },
  P4: {
    startX: 1,
    startY: 0,
  },
  P5: {
    startX: 0,
    startY: 1,
  },
  P6: {
    startX: 1,
    startY: 4,
  },
  W1: {
    startX: 0,
    startY: 0,
  },
  W2: {
    startX: 4,
    startY: 0,
  },
  W3: {
    startX: 2,
    startY: 2,
  },
  W4: {
    startX: 4,
    startY: 2,
  },
  W5: {
    startX: 0,
    startY: 4,
  },
  W6: {
    startX: 2,
    startY: 4,
  },
};

//All valid rooms and hallways to move in (based on player's current location). Sequence is important - Please don't change them.
var roomAccess = [
  [
    {
      roomId: "11",
      roomName: "Room",
      roomAccess: [
        { id: "1112", x: 0, y: 1 },
        { id: "1121", x: 1, y: 0 },
        { id: "33", x: 4, y: 4 },
      ],
      roomLimit: -1, // No limit
      roomPlayers: [],
      roomWeapons: ["W1"],
    },
    {
      roomId: "1112",
      roomName: "Hallway",
      roomAccess: [
        { id: "11", x: 0, y: 0 },
        { id: "12", x: 0, y: 2 },
      ],
      roomLimit: 1, // Because it is the hallway
      roomPlayers: ["P5"],
      roomWeapons: [],
    },
    {
      roomId: "12",
      roomName: "Room",
      roomAccess: [
        { id: "1112", x: 0, y: 1 },
        { id: "1222", x: 3, y: 3 },
        { id: "1213", x: 0, y: 3 },
      ],
      roomLimit: -1, // No limit
      roomPlayers: [],
      roomWeapons: [],
    },
    {
      roomId: "1213",
      roomName: "Hallway",
      roomAccess: [
        { id: "12", x: 0, y: 2 },
        { id: "13", x: 0, y: 4 },
      ],
      roomLimit: 1, // Because it is the hallway
      roomPlayers: [],
      roomWeapons: [],
    },
    {
      roomId: "13",
      roomName: "Room",
      roomAccess: [
        { id: "1213", x: 0, y: 3 },
        "1323",
        { id: "31", x: 4, y: 0 },
      ],
      roomLimit: -1, // No limit
      roomPlayers: [],
      roomWeapons: ["W2"],
    },
  ],
  [
    {
      roomId: "1121",
      roomName: "Hallway",
      roomAccess: [
        { id: "11", x: 0, y: 0 },
        { id: "21", x: 2, y: 0 },
      ],
      roomLimit: 1, // Because it is the hallway
      roomPlayers: ["P4"],
      roomWeapons: [],
    },
    {
      roomId: "0",
      roomName: "Empty",
      roomAccess: [],
      roomLimit: 0,
      roomPlayers: [],
      roomWeapons: [],
    },
    {
      roomId: "1222",
      roomName: "Hallway",
      roomAccess: [
        { id: "12", x: 0, y: 2 },
        { id: "22", x: 2, y: 2 },
      ],
      roomLimit: 1, // Because it is the hallway
      roomPlayers: [],
      roomWeapons: [],
    },
    {
      roomId: "0",
      roomName: "Empty",
      roomAccess: [],
      roomLimit: 0,
      roomPlayers: [],
      roomWeapons: [],
    },
    {
      roomId: "1323",
      roomName: "Hallway",
      roomAccess: [
        { id: "13", x: 0, y: 4 },
        { id: "23", x: 2, y: 4 },
      ],
      roomLimit: 1, // Because it is the hallway
      roomPlayers: ["P6"],
      roomWeapons: [],
    },
  ],
  [
    {
      roomId: "21",
      roomName: "Room",
      roomAccess: [
        { id: "1121", x: 1, y: 0 },
        { id: "2122", x: 2, y: 1 },
        { id: "2131", x: 3, y: 0 },
      ],
      roomLimit: -1, // No limit
      roomPlayers: [],
      roomWeapons: [],
    },
    {
      roomId: "2122",
      roomName: "Hallway",
      roomAccess: [
        { id: "21", x: 2, y: 0 },
        { id: "22", x: 2, y: 2 },
      ],
      roomLimit: 1, // Because it is the hallway
      roomPlayers: [],
      roomWeapons: [],
    },
    {
      roomId: "22",
      roomName: "Room",
      roomAccess: [
        { id: "2122", x: 2, y: 1 },
        { id: "1222", x: 1, y: 2 },
        { id: "2223", x: 2, y: 3 },
        { id: "2232", x: 3, y: 2 },
      ],
      roomLimit: -1, // No limit
      roomPlayers: [],
      roomWeapons: ["W3"],
    },
    {
      roomId: "2223",
      roomName: "Hallway",
      roomAccess: [
        { id: "22", x: 2, y: 2 },
        { id: "23", x: 2, y: 4 },
      ],
      roomLimit: 1, // Because it is the hallway
      roomPlayers: [],
      roomWeapons: [],
    },
    {
      roomId: "23",
      roomName: "Room",
      roomAccess: [
        { id: "2223", x: 2, y: 3 },
        { id: "1323", x: 1, y: 4 },
        { id: "2333", x: 3, y: 4 },
      ],
      roomLimit: -1, // No limit
      roomPlayers: [],
      roomWeapons: ["W4"],
    },
  ],
  [
    {
      roomId: "2131",
      roomName: "Hallway",
      roomAccess: [
        { id: "21", x: 2, y: 0 },
        { id: "31", x: 4, y: 0 },
      ],
      roomLimit: 1, // Because it is the hallway
      roomPlayers: ["P3"],
      roomWeapons: [],
    },
    {
      roomId: "0",
      roomName: "Empty",
      roomAccess: [],
      roomLimit: 0,
      roomPlayers: [],
      roomWeapons: [],
    },
    {
      roomId: "2232",
      roomName: "Hallway",
      roomAccess: [
        { id: "22", x: 2, y: 2 },
        { id: "32", x: 4, y: 2 },
      ],
      roomLimit: 1, // Because it is the hallway
      roomPlayers: [],
      roomWeapons: [],
    },
    {
      roomId: "0",
      roomName: "Empty",
      roomAccess: [],
      roomLimit: 0,
      roomPlayers: [],
      roomWeapons: [],
    },
    {
      roomId: "2333",
      roomName: "Hallway",
      roomAccess: [
        { id: "23", x: 2, y: 4 },
        { id: "33", x: 4, y: 4 },
      ],
      roomLimit: 1, // Because it is the hallway
      roomPlayers: ["P1"],
      roomWeapons: [],
    },
  ],
  [
    {
      roomId: "31",
      roomName: "Room",
      roomAccess: [
        { id: "2131", x: 3, y: 0 },
        { id: "3132", x: 4, y: 1 },
        { id: "13", x: 0, y: 4 },
      ],
      roomLimit: -1, // No limit
      roomPlayers: [],
      roomWeapons: ["W5"],
    },
    {
      roomId: "3132",
      roomName: "Hallway",
      roomAccess: [
        { id: "31", x: 4, y: 0 },
        { id: "32", x: 4, y: 2 },
      ],
      roomLimit: 1, // Because it is the hallway
      roomPlayers: [],
      roomWeapons: [],
    },
    {
      roomId: "32",
      roomName: "Room",
      roomAccess: [
        { id: "3132", x: 4, y: 1 },
        { id: "2232", x: 3, y: 2 },
        { id: "3233", x: 4, y: 3 },
      ],
      roomLimit: -1, // No limit
      roomPlayers: [],
      roomWeapons: ["W6"],
    },
    {
      roomId: "3233",
      roomName: "Hallway",
      roomAccess: [
        { id: "32", x: 4, y: 2 },
        { id: "33", x: 4, y: 4 },
      ],
      roomLimit: 1, // Because it is the hallway
      roomPlayers: ["P2"],
      roomWeapons: [],
    },
    {
      roomId: "33",
      roomName: "Room",
      roomAccess: [
        { id: "3233", x: 4, y: 3 },
        { id: "2233", x: 3, y: 4 },
        { id: "11", x: 0, y: 0 },
      ],
      roomLimit: -1, // No limit
      roomPlayers: [],
      roomWeapons: [],
    },
  ],
];

export class TicTac extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dim: 3,
      count: 0,

      // Gameboard grid
      grid: roomAccess,

      // Stores players current locID
      players: [
        "2333", //Miss Scarlet
        "3233", //Mr. Green
        "2131", //Colonel Mustard
        "1121", //Prof. Plum
        "1112", //Mrs. Peacock
        "1323", //Mrs. White
      ],
      playerLocations: startXY,

      // Stores weapons current locID
      weapons: ["11", "13", "22", "23", "31", "32"],

      currentPlayer: this.props.player_id,
      currentPlayerId: this.props.player_id,
      currentX: 0,
      currentY: 0,
      currentPlayer: this.props.player_id,
      validOptions: [],
      movementTurn: false,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.noMovementClick = this.noMovementClick.bind(this);
    this.suggestionClicked = this.suggestionClicked.bind(this);
    this.accusationClicked = this.accusationClicked.bind(this);
    this.dims = [
      parseFloat(500 / this.state.grid.length),
      parseFloat(500 / this.state.grid[0].length),
    ];
  }

  state = {
    playerLocations: startXY,
  };

  suggestionClicked(a, b) {
    //alert(a);
    //alert(b);
    const cx = this.state.playerLocations[this.props.player_id].startX;
    const cy = this.state.playerLocations[this.props.player_id].startY;
    //alert(JSON.stringify(this.state.grid[cx][cy]));
    //alert(this.state.grid[cx][cy].roomName);

    var roomName = "";
    switch (this.state.grid[cx][cy].roomId) {
      case "11":
        roomName = "kitchen";
        break;
      case "12":
        roomName = "ballroom";
        break;
      case "13":
        roomName = "conservatory";
        break;
      case "21":
        roomName = "dinning";
        break;
      case "22":
        roomName = "hall";
        break;
      case "23":
        roomName = "billiard";
        break;
      case "31":
        roomName = "library";
        break;
      case "32":
        roomName = "study";
        break;
      case "33":
        roomName = "lounge";
        break;
      default:
        alert("You need to be in a room!");
        break;
    }
    if (roomName == "") return;
    var playerInput = "You are Suggesting : " + roomName + " " + a + " " + b;
    alert(playerInput);
    //this.setState({ inputs : [playerInput, ...this.state.inputs]})
    makeSuggestion(roomName, a, b);
  }

  accusationClicked(a, b) {
    //alert(a);
    //alert(b);
    const cx = this.state.playerLocations[this.props.player_id].startX;
    const cy = this.state.playerLocations[this.props.player_id].startY;
    //alert(JSON.stringify(this.state.grid[cx][cy]));
    //alert(this.state.grid[cx][cy].roomName);
    var roomName = "";
    switch (this.state.grid[cx][cy].roomId) {
      case "11":
        roomName = "kitchen";
        break;
      case "12":
        roomName = "ballroom";
        break;
      case "13":
        roomName = "conservatory";
        break;
      case "21":
        roomName = "dinning";
        break;
      case "22":
        roomName = "hall";
        break;
      case "23":
        roomName = "billiard";
        break;
      case "31":
        roomName = "library";
        break;
      case "32":
        roomName = "study";
        break;
      case "33":
        roomName = "lounge";
        break;
      default:
        alert("You need to be in a room!");
        break;
    }
    if (roomName == "") return;
    var playerInput = "Your Accusation : " + roomName + " " + a + " " + b;
    alert(playerInput);
    //this.setState({ inputs : [playerInput, ...this.state.inputs]})
    makeAccusation(roomName, a, b);
  }

  moveCurrentPlayer(x, y) {
    console.log("moveCurrentplayer");
    var g = this.state.grid;
    const cx = this.state.playerLocations[this.props.player_id].startX;
    const cy = this.state.playerLocations[this.props.player_id].startY;

    var index = g[cx][cy].roomPlayers.indexOf(this.props.player_id);
    g[cx][cy].roomPlayers.splice(index, 1); //Remove current player to old room
    g[x][y].roomPlayers.push(this.props.player_id); //Add current player to new room

    this.setState({ grid: g, currentX: x, currentY: y });

    var s = this.state.playerLocations;
    s[this.props.player_id].startX = x;
    s[this.props.player_id].startY = y;
    this.setState({ playerLocations: s });

    //const cx = this.state.playerLocations[this.props.player_id].startX;
    //const cy = this.state.playerLocations[this.props.player_id].startY;

    //console.log("After:" + this.state.grid[x][y].roomPlayers);
    // console.log("moveCurrentplayer");
    // var g = this.state.grid;
    // var index = g[this.state.currentX][this.state.currentY].roomPlayers.indexOf(this.state.currentPlayer)
    // g[this.state.currentX][this.state.currentY].roomPlayers.splice(index, 1) //Remove current player to old room
    // g[x][y].roomPlayers.push(this.state.currentPlayer) //Add current player to new room
    // this.setState({grid: g, currentX: x, currentY: y})
  }

  validateMove(x, y) {
    const cx = this.state.playerLocations[this.props.player_id].startX;
    const cy = this.state.playerLocations[this.props.player_id].startY;
    const currentRoom = this.state.grid[cx][cy];
    const requestedRoom = this.state.grid[x][y];

    // Validate move
    for (var i = 0; i < currentRoom.roomAccess.length; i++) {
      //Valid room from current position
      //console.log(JSON.stringify(currentRoom.roomAccess[i]));
      if (
        currentRoom.roomAccess[i].x == x &&
        currentRoom.roomAccess[i].y == y
      ) {
        //console.log("match")
        //Room with no max
        if (requestedRoom.roomLimit == -1) {
          console.log("room with no max");
          return true;
        }

        //Picked empty spot
        if (requestedRoom.roomLimit == 0) {
          console.log("empty space");
          return false;
        }

        // Check limit, 1 = hallway with 1 max
        if (
          requestedRoom.roomLimit == 1 &&
          requestedRoom.roomPlayers.length == 0
        ) {
          console.log("hallway not blocked");
          return true;
        } else {
          console.log("hallway blocked");
          return false;
        }
      }
      //console.log("no match")
    }
    return false;
  }

  // {"game_id":0,"player_id":1,"message_type":31,"message":
  // {"movement_required":true,"movement_possible":true,"valid_locations":
  // [{"movement_id":1,"location":[0,0]},{"movement_id":2,"location":[0,1]},
  // {"movement_id":3,"location":[0,2]},{"movement_id":4,"location":[0,3]},
  // {"movement_id":5,"location":[0,4]},{"movement_id":6,"location":[1,0]},
  // {"movement_id":7,"location":[1,1]},{"movement_id":8,"location":[1,2]},
  // {"movement_id":9,"location":[1,3]},{"movement_id":10,"location":[1,4]},
  // {"movement_id":11,"location":[2,0]},{"movement_id":12,"location":[2,1]},
  // {"movement_id":13,"location":[2,2]},{"movement_id":14,"location":[2,3]},
  // {"movement_id":15,"location":[2,4]},{"movement_id":16,"location":[3,0]},
  // {"movement_id":17,"location":[3,1]},{"movement_id":18,"location":[3,2]},
  // {"movement_id":19,"location":[3,3]},{"movement_id":20,"location":[3,4]},
  // {"movement_id":21,"location":[4,0]},{"movement_id":22,"location":[4,1]},
  // {"movement_id":23,"location":[4,2]},{"movement_id":24,"location":[4,3]},
  // {"movement_id":25,"location":[4,4]}]}}

  handleOnClick(x, y) {
    alert("X" + x + "Y" + y)
    const cx = this.state.playerLocations[this.props.player_id].startX;
    const cy = this.state.playerLocations[this.props.player_id].startY;
    const currentRoom = this.state.grid[cx][cy];
    const requestedRoom = this.state.grid[x][y];

    //console.log("TicTac current x=" + cx + " y=" + cy);
    //console.log("TicTac currentroom" + JSON.stringify(currentRoom));
    //console.log("TicTac requested x=" + x + " y=" + y + " ");
    //console.log("TicTac requestedroom" + JSON.stringify(requestedRoom));

    // Need to store current player, with location to base valid movements on

    if (this.state.movementTurn) {
      //Check against array
      var myArray = this.state.validOptions;
      //console.log("ValidOptions: " + JSON.stringify(this.state.validOptions))

      for (let i = 0; i < myArray.length; i++) {
        //console.log("Array: " + JSON.stringify(myArray[i]))
        //console.log("Location: " + myArray[i].location);
        var requestedLoc = [x, y];
        //console.log("Requested Location: " + requestedLoc);
        //var found = requestedLoc = myArray[i].location
        //var found = JSON.stringify(requestedLoc) == JSON.stringify(myArray[i].location)
        //console.log("Found=" + found)
        var found =
          JSON.stringify(requestedLoc) == JSON.stringify(myArray[i].location);
        if (found) {
          var index = i;
          break;
        }
      }
      if (found) {
        alert("Valid movement");

        //Send movement request with requested room
        //console.log("Found" + JSON.stringify(myArray[index].movement_id))
        makeMovement("true", myArray[index].movement_id);
        this.setState({ movementTurn: false, validOptions: [] });
      } else {
        alert("Not valid movement");
      }
    } else {
      alert("Not your movement turn");
    }

    // const valid = this.validateMove(x, y)
    // if (valid) {
    //   alert("valid movement")
    //   //this.moveCurrentPlayer(x, y);
    // } else {
    //   alert("not valid movement")
    // }
  }

  noMovementClick() {
    makeMovement("false", [-1, -1]);
    this.setState({ movementTurn: false, validOptions: [] });
  }

  static getDerivedStateFromProps(props, state) {
    //console.log("getDerivedStateFromProps");
    //console.log("getDerivedStateFromProps prop:" + JSON.stringify(props))
    //console.log("getDerivedStateFromProps state:" + JSON.stringify(state))
    var newcount = state.count + 1;
    var newplayerLocations = state.playerLocations;
    var newGrid = state.grid;
    var newCurrentX = state.currentX;
    var newCurrentY = state.currentY;
    var newmovementTurn = state.movementTurn;
    var newvalidOptions = state.validOptions;

    var first = props.actions[0];
    console.log("getDerivedStateFromProps " + JSON.stringify(first));
    if (first != undefined) {
      if (first.message_type == 22) {
        console.log("Found movement broadcast");
        console.log(JSON.stringify(first.message.character_moved));
        console.log(JSON.stringify(first.message.weapon_moved));
        if (first.message.character_moved === true) {
          alert("KATHRYN")
        }
        if (JSON.stringify(first.message.character_moved) == "true") {
          //alert("Found char move")
          console.log(
            "Found char move: " +
              JSON.stringify(uniqueIDs[first.message.moved_character])
          );
          var player = uniqueIDs[first.message.moved_character].image;
          const cx = newplayerLocations[player].startX;
          const cy = newplayerLocations[player].startY;
          console.log("Found Char move: " + player + " " + cx + " " + cy);
          const nx = 4;
          const ny = 4;
          console.log("CharDerived: " + JSON.stringify(newGrid[cx][cy]));
          console.log("CharDerived: " + JSON.stringify(newGrid[nx][ny]));

          if ((cx != nx) & (cy != cy)) {
            var index = newGrid[cx][cy].roomPlayers.indexOf(
              JSON.stringify(player)
            );
            console.log(
              "CharDerivedIndex: " +
                index +
                " " +
                newGrid[cx][cy].roomPlayers.indexOf(player)
            );
            newGrid[cx][cy].roomPlayers.splice(index, 1); //Remove current player to old room
            newGrid[nx][ny].roomPlayers.push(player); //Add current player to new room
            //NEW TO UPDATE CURRENTX AND CURRENTY if currentplayer
            newplayerLocations[player].startX = nx;
            newplayerLocations[player].startY = ny;

            if ((player = props.player_id)) {
              newCurrentX = nx;
              newCurrentY = ny;
            }
          }

          //console.log("CharDerived: " + JSON.stringify(newGrid));
          console.log("AfterCharDerived: " + JSON.stringify(newGrid[cx][cy]));
          console.log("AfterCharDerived: " + JSON.stringify(newGrid[nx][ny]));
          console.log(
            "AfterCharDerived: " + JSON.stringify(newplayerLocations)
          );
        }

        if (JSON.stringify(first.message.weapon_moved) == "true") {
          //alert("Found weapon move")
          console.log(
            "Found Weap move: " +
              JSON.stringify(uniqueIDs[first.message.moved_weapon])
          );
          var player = uniqueIDs[first.message.moved_weapon].image;
          const cx = newplayerLocations[player].startX;
          const cy = newplayerLocations[player].startY;
          console.log("Found Weap move: " + player + " " + cx + " " + cy);
          const nx = 4;
          const ny = 4;
          console.log("WeapDerived: " + JSON.stringify(newGrid[cx][cy]));
          console.log("WeapDerived: " + JSON.stringify(newGrid[nx][ny]));

          var index = newGrid[cx][cy].roomWeapons.indexOf(player);
          newGrid[cx][cy].roomWeapons.splice(index, 1); //Remove current player to old room
          newGrid[nx][ny].roomWeapons.push(player); //Add current player to new room
          //NEW TO UPDATE CURRENTX AND CURRENTY if currentplayer
          newplayerLocations[player].startX = nx;
          newplayerLocations[player].startY = ny;

          console.log("WeapDerived: " + JSON.stringify(newplayerLocations));
        }

        // var player = "P" + first.message.moved_character;
        // const cx = newplayerLocations[player].startX;
        // const cy = newplayerLocations[player].startY;
        // const nx = 4;
        // const ny = 4;

        // console.log("Derived: " + JSON.stringify(newGrid[cx][cy]));
        // console.log("Derived: " + JSON.stringify(newGrid[nx][ny]));
        // var index = newGrid[cx][cy].roomPlayers.indexOf(player);
        // newGrid[cx][cy].roomPlayers.splice(index, 1); //Remove current player to old room
        // newGrid[nx][ny].roomPlayers.push(player); //Add current player to new room
        // //NEW TO UPDATE CURRENTX AND CURRENTY if currentplayer
        // newplayerLocations[player].startX = nx;
        // newplayerLocations[player].startX = ny;

        // if ((player = props.player_id)) {
        //   newCurrentX = nx;
        //   newCurrentY = ny;
        // }

        // console.log("Derived: " + player);
        // console.log("Derived: " + props.player_id);
        // console.log("Derived: " + JSON.stringify(newGrid));
        // console.log("Derived: " + JSON.stringify(newplayerLocations));
        // console.log("Player location state:" + JSON.stringify(state.playerLocations))
        // console.log("Player location:" + JSON.stringify(state.playerLocations[player]))
        // newplayerLocations[player].startX = 5
        // newplayerLocations[player].startY = 5
        // console.log("Player new location:" + JSON.stringify(newplayerLocations[player]))
        // console.log("Moving P1 to 11")
        //var newplayerLocations = state.playerLocations
        // newplayerLocations[player].startX = 1
        // newplayerLocations[player].startY = 1
        // console.log("Player new location:" + JSON.stringify(newplayerLocations[player]))
      }
      if (first.message_type == 31) {
        newmovementTurn = true;
        newvalidOptions = first.message.valid_locations;
      }
    }

    return {
      count: newcount,
      grid: newGrid,
      playerLocations: newplayerLocations,
      currentX: newCurrentX,
      currentY: newCurrentY,
      movementTurn: newmovementTurn,
      validOptions: newvalidOptions,
    };

    // if (props.url !== state.prevUrl) {
    //   return {
    //     isLoading: true,
    //     prevUrl: props.url
    //   };
    // }

    return null;
  }

  filter = memoize((list) => list.filter((item) => item.message_type == 31));

  render() {
    const style = {
      margin: "auto",
      width: "auto",
      height: "auto",
      backgroundColor: "white",
      color: "white",
      fontSize: "3em",
      tableLayout: "fixed",
    };
    //var checkPlayer = this.findTurn(this.props.actions);
    //console.log(this.state.grid);
    const rows = this.state.grid.map((r, i) => {
      return (
        <tr key={"row_" + i}>
          {r.map((d, j) => {
            //console.log("building");
            return (
              <Square
                key={i + "_" + j}
                dims={this.dims}
                onClick={() => {
                  this.handleOnClick(i, j);
                }}
                //contents={d=="+"?" ":d}
                contents={d}
                name="Austin"
              />
            );
          })}
        </tr>
      );
    });
    //console.log("Render");
    //console.log("Render:" + JSON.stringify(this.state))
    //console.log("Render:" + this.state.active)
    //console.log("TicTac: props playerid = " + this.props.player_id)
    //var test = this.props.player_id;
    //console.log("TicTac: test playerid = " + test)
    //console.log("TicTac: state playerid = " + this.state.currentPlayerId)

    //console.log("TicTac:" + JSON.stringify(startXY["P1"]))

    //this.findCurrentPlayer()
    //console.log("TicTac" + this.state.currentPlayer);
    // const cx = this.state.playerLocations[this.props.player_id].startX;
    // const cy = this.state.playerLocations[this.props.player_id].startY;
    // console.log(cx + " " + cy)

    //const filteredList = this.filter(this.props.actions);
    // console.log("Filtered" + JSON.stringifyfilteredList);

    return (
      <div style={{ textAlign: "center" }}>
        <p>
          Player = {this.props.player_id} | X ={" "}
          {this.state.playerLocations[this.props.player_id].startX} | Y ={" "}
          {this.state.playerLocations[this.props.player_id].startY}
        </p>

        <div
          style={{
            textAlign: "center",
            width: "100%",
            height: "150px",
            margin: "10px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              width: "300px",
              "Min-Height": "150px",
              "border-width": "5px",
              "border-color": "red",
              "border-style": "outset",
              margin: "0 auto",
              position: "relative",
            }}
          >
            <span>
              <h3>Suggestion / Accusation Box</h3>
              <select
                name="GuessedUser"
                id="GuessedUser"
                style={{ margin: "10px", marginLeft: "0px" }}
              >
                <option value="scarlet" selected="selected">
                  Miss Scarlet
                </option>
                <option value="green">Mr. Green</option>
                <option value="mustard">Colonel Mustard</option>
                <option value="plum">Prof. Plum</option>
                <option value="peacock">Mrs. Peacock</option>
                <option value="white">Mrs. White</option>
              </select>
              <select
                name="GuessedWeapon"
                id="GuessedWeapon"
                style={{ margin: "10px" }}
              >
                <option value="candlestick" selected="selected">
                  candlestick
                </option>
                <option value="revolver">revolver</option>
                <option value="knife">knife</option>
                <option value="pipe">pipe</option>
                <option value="rope">rope</option>
                <option value="wrench">wrench</option>
              </select>
              <br />
              <button
                name="sgbtn"
                id="sgbtn"
                onClick={() => {
                  this.suggestionClicked(
                    document.getElementById("GuessedUser").value,
                    document.getElementById("GuessedWeapon").value
                  );
                }}
              >
                Make Suggestion
              </button>
              &nbsp;&nbsp;&nbsp;
              <button
                name="acbtn"
                id="acbtn"
                onClick={() => {
                  this.accusationClicked(
                    document.getElementById("GuessedUser").value,
                    document.getElementById("GuessedWeapon").value
                  );
                }}
              >
                Make Accusation
              </button>
              <br />
              &nbsp;&nbsp;&nbsp;
            </span>
          </div>
        </div>
        <br />

        <table cellSpacing="0" id="table" style={style}>
          <tbody>{rows}</tbody>
        </table>
        <br />
        <button onClick={this.noMovementClick}>No Movement</button>
        <br />
        {/* <button style={{margin:"auto"}} onClick={this.handleReset}>reset</button>
        <br /><br />
        <button onClick={()=>{this.state.dim==1?1:this.state.dim-=1;this.setState({dim:this.state.dim})}}>-</button>

            &nbsp;&nbsp;&nbsp;<span style={{color:'white'}}>{this.state.dim}</span>&nbsp;&nbsp;&nbsp;

        <button onClick={()=>{this.state.dim+=1;this.setState({dim:this.state.dim})}}>+</button> */}
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default TicTac;
