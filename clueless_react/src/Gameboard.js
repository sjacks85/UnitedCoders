import React from "react";
import { Room } from "./Room";
import { Box } from "./Box";
import { makeMovement } from "./ClientManager";

var uniqueIDs = [
  { type: "character", name: "Miss Scarlet", image: "P1" },
  { type: "character", name: "Mr. Green", image: "P2" },
  { type: "character", name: "Colonel Mustard", image: "P3" },
  { type: "character", name: "Prof. Plum", image: "P4" },
  { type: "character", name: "Mrs. Peacock", image: "P5" },
  { type: "character", name: "Mrs. White", image: "P6" },
  { type: "weapon", name: "Candlestick", image: "W1" },
  { type: "weapon", name: "Revolver", image: "W4" },
  { type: "weapon", name: "Knife", image: "W2" },
  { type: "weapon", name: "Pipe", image: "W3" },
  { type: "weapon", name: "Rope", image: "W5" },
  { type: "weapon", name: "Wrench", image: "W6" },
  { type: "room", name: "Study", roomId: 33, gridX: 4, gridY: 4 },
  { type: "room", name: "Hall", roomId: 32, gridX: 2, gridY: 4 },
  { type: "room", name: "Lounge", roomId: 31, gridX: 0, gridY: 4 },
  { type: "room", name: "Dinning", roomId: 21, gridX: 0, gridY: 2 },
  { type: "room", name: "Billiard", roomId: 22, gridX: 2, gridY: 2 },
  { type: "room", name: "Library", roomId: 23, gridX: 4, gridY: 2 },
  { type: "room", name: "Conservatory", roomId: 13, gridX: 4, gridY: 0 },
  { type: "room", name: "Ballroom", roomId: 12, gridX: 2, gridY: 0 },
  { type: "room", name: "Kitchen", roomId: 11, gridX: 0, gridY: 0 },
];
// 7 = Candlestick, X = 0, Y = 0 W1
// 8 = Revolver, X = 2, Y = 0 W4
// 9 = Knife, X = 4, Y = 0 W2
// 10 = Pipe, X = 0, Y = 4 W3
// 11 = Rope, X = 2, Y = 4 W5
// 12 = Wrench, X = 4, Y = 4 W6

var startLocations = {
  P0: {
    currentX: -1,
    currentY: -1,
  },
  P1: {
    currentX: 3,
    currentY: 4,
  },
  P2: {
    currentX: 4,
    currentY: 3,
  },
  P3: {
    currentX: 3,
    currentY: 0,
  },
  P4: {
    currentX: 1,
    currentY: 0,
  },
  P5: {
    currentX: 0,
    currentY: 1,
  },
  P6: {
    currentX: 1,
    currentY: 4,
  },
  W1: {
    currentX: 0,
    currentY: 0,
  },
  W2: {
    currentX: 4,
    currentY: 0,
  },
  W3: {
    currentX: 0,
    currentY: 4,
  },
  W4: {
    currentX: 4,
    currentY: 0,
  },
  W5: {
    currentX: 2,
    currentY: 4,
  },
  W6: {
    currentX: 4,
    currentY: 4,
  },
};

var startGrid = [
  [
    {
      roomId: "11",
      roomName: "Kitchen",
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
      roomName: "Ballroom",
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
      roomName: "Conservatory",
      roomAccess: [
        { id: "1213", x: 0, y: 3 },
        "1323",
        { id: "31", x: 4, y: 0 },
      ],
      roomLimit: -1, // No limit
      roomPlayers: [],
      roomWeapons: ["W3"],
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
      roomName: "Dinning Room",
      roomAccess: [
        { id: "1121", x: 1, y: 0 },
        { id: "2122", x: 2, y: 1 },
        { id: "2131", x: 3, y: 0 },
      ],
      roomLimit: -1, // No limit
      roomPlayers: [],
      roomWeapons: ["W4"],
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
      roomName: "Billiard Room",
      roomAccess: [
        { id: "2122", x: 2, y: 1 },
        { id: "1222", x: 1, y: 2 },
        { id: "2223", x: 2, y: 3 },
        { id: "2232", x: 3, y: 2 },
      ],
      roomLimit: -1, // No limit
      roomPlayers: [],
      roomWeapons: [],
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
      roomName: "Library",
      roomAccess: [
        { id: "2223", x: 2, y: 3 },
        { id: "1323", x: 1, y: 4 },
        { id: "2333", x: 3, y: 4 },
      ],
      roomLimit: -1, // No limit
      roomPlayers: [],
      roomWeapons: ["W5"],
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
      roomName: "Lounge",
      roomAccess: [
        { id: "2131", x: 3, y: 0 },
        { id: "3132", x: 4, y: 1 },
        { id: "13", x: 0, y: 4 },
      ],
      roomLimit: -1, // No limit
      roomPlayers: [],
      roomWeapons: ["W2"],
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
      roomName: "Hall",
      roomAccess: [
        { id: "3132", x: 4, y: 1 },
        { id: "2232", x: 3, y: 2 },
        { id: "3233", x: 4, y: 3 },
      ],
      roomLimit: -1, // No limit
      roomPlayers: [],
      roomWeapons: [],
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
      roomName: "Study",
      roomAccess: [
        { id: "3233", x: 4, y: 3 },
        { id: "2233", x: 3, y: 4 },
        { id: "11", x: 0, y: 0 },
      ],
      roomLimit: -1, // No limit
      roomPlayers: [],
      roomWeapons: ["W6"],
    },
  ],
];

export class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: this.props.actions,

      // Gameboard grid
      grid: startGrid,

      // Tracks all player and weapon locations
      locations: startLocations,

      // Tracks current player location
      currentX: 0,
      currentY: 0,

      // Used for movement turn
      validOptions: [],
      movementTurn: false,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.dims = [
      parseFloat(500 / this.state.grid.length),
      parseFloat(500 / this.state.grid[0].length),
    ];
  }

  handleOnClick(x, y) {
    if (this.state.movementTurn) {
      //Check request against valid options from movement request
      var myArray = this.state.validOptions;

      for (let i = 0; i < myArray.length; i++) {
        var requestedLoc = [x, y];
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
        makeMovement("true", myArray[index].movement_id);
        this.setState({ movementTurn: false, validOptions: [] });
      } else {
        alert("Not valid movement");
      }
    } else {
      alert("Not your movement turn");
    }
  }

  static getDerivedStateFromProps(props, state) {
    //console.log("getDerivedStateFromProps");
    //console.log("getDerivedStateFromProps prop:" + JSON.stringify(props))
    //console.log("getDerivedStateFromProps state:" + JSON.stringify(state))

    var newcount = state.count + 1;
    var newLocations = state.locations;
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
        if (first.message.character_moved === true) {
          //alert("Found char move")
          var index = Number(first.message.moved_character) - 1;
          console.log(
            "Found char move: " +
              " " +
              index +
              " " +
              JSON.stringify(uniqueIDs[index])
          );
          var player = uniqueIDs[index].image;
          const cx = newLocations[player].currentX;
          const cy = newLocations[player].currentY;
          console.log("Found Char move: " + player + " " + cx + " " + cy);
          const nx = 4;
          const ny = 4;
          console.log("CharDerived: " + JSON.stringify(newGrid[cx][cy]));
          console.log("CharDerived: " + JSON.stringify(newGrid[nx][ny]));

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
          newLocations[player].currentX = nx;
          newLocations[player].currentY = ny;

          if ((player = props.player_id)) {
            newCurrentX = nx;
            newCurrentY = ny;
          }

          //console.log("CharDerived: " + JSON.stringify(newGrid));
          console.log("AfterCharDerived: " + JSON.stringify(newGrid[cx][cy]));
          console.log("AfterCharDerived: " + JSON.stringify(newGrid[nx][ny]));
          console.log("AfterCharDerived: " + JSON.stringify(newLocations));
        }

        if (first.message.weapon_moved === true) {
          //alert("Found weapon move")
          var index = Number(first.message.moved_weapon) - 1;
          console.log("Found Weap move: " + JSON.stringify(uniqueIDs[index]));
          var player = uniqueIDs[index].image;
          const cx = newLocations[player].currentX;
          const cy = newLocations[player].currentY;
          console.log("Found Weap move: " + player + " " + cx + " " + cy);
          const nx = 4;
          const ny = 4;
          console.log("WeapDerived: " + JSON.stringify(newGrid[cx][cy]));
          console.log("WeapDerived: " + JSON.stringify(newGrid[nx][ny]));

          var index = newGrid[cx][cy].roomWeapons.indexOf(player);
          newGrid[cx][cy].roomWeapons.splice(index, 1); //Remove current player to old room
          newGrid[nx][ny].roomWeapons.push(player); //Add current player to new room
          //NEW TO UPDATE CURRENTX AND CURRENTY if currentplayer
          newLocations[player].currentX = nx;
          newLocations[player].currentY = ny;

          console.log("WeapDerived: " + JSON.stringify(newLocations));
        }
      } else if (first.message_type == 31) {
        newmovementTurn = true;
        newvalidOptions = first.message.valid_locations;
      } else {
        newmovementTurn = false;
        newvalidOptions = [];
      }
    }

    return {
      count: newcount,
      grid: newGrid,
      locations: newLocations,
      playerX: newCurrentX,
      playerY: newCurrentY,
      movementTurn: newmovementTurn,
      validOptions: newvalidOptions,
    };
  }

  provideLocationId() {
    var cx = this.state.locations[this.props.player_id].currentX;
    var cy = this.state.locations[this.props.player_id].currentY;
    var result = "0";

    console.log("PLAYER: " + this.props.player_id);
    console.log("PLAYER: x" + cx + " y" + cy);

    if (cx != -1 && cy != -1) {
      result = this.state.grid[cx][cy].roomId;
    }
    console.log("RESULTS" + result);
    return result;
  }

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

    const rows = this.state.grid.map((r, i) => {
      return (
        <tr key={"row_" + i}>
          {r.map((d, j) => {
            return (
              <Room
                key={i + "_" + j}
                dims={this.dims}
                onClick={() => {
                  this.handleOnClick(i, j);
                }}
                contents={d}
              />
            );
          })}
        </tr>
      );
    });

    return (
      <div style={{ textAlign: "center" }}>
        <p>
          Player = {this.props.player_id} | X ={" "}
          {this.state.locations[this.props.player_id].currentX} | Y ={" "}
          {this.state.locations[this.props.player_id].currentY}
        </p>
        <Box actions={this.state.actions} locationId={this.provideLocationId()} />
        <br />
        <table cellSpacing="0" id="table" style={style}>
          <tbody>{rows}</tbody>
        </table>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default Gameboard;
