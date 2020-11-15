import React from "react";
import { Room } from "./Room";
import { Box } from "./Box";
import { makeMovement } from "./ClientManager";

var uniqueIDs = [
  //0
  { type: "character", name: "Miss Scarlet", image: "C1" },
  //1
  { type: "character", name: "Mr. Green", image: "C2" },
  //2
  { type: "character", name: "Colonel Mustard", image: "C3" },
  //3
  { type: "character", name: "Prof. Plum", image: "C4" },
  //4
  { type: "character", name: "Mrs. Peacock", image: "C5" },
  //5
  { type: "character", name: "Mrs. White", image: "C6" },
  //6
  { type: "weapon", name: "Candlestick", image: "W1" },
  //7
  { type: "weapon", name: "Revolver", image: "W4" },
  //8
  { type: "weapon", name: "Knife", image: "W2" },
  //9
  { type: "weapon", name: "Pipe", image: "W3" },
  //10
  { type: "weapon", name: "Rope", image: "W5" },
  //11
  { type: "weapon", name: "Wrench", image: "W6" },
  //12
  { type: "room", name: "Study", roomId: 33, gridX: 4, gridY: 4 },
  //13
  { type: "room", name: "Hall", roomId: 32, gridX: 2, gridY: 4 },
  //14
  { type: "room", name: "Lounge", roomId: 31, gridX: 0, gridY: 4 },
  //15
  { type: "room", name: "Dinning", roomId: 21, gridX: 0, gridY: 2 },
  //16
  { type: "room", name: "Billiard", roomId: 22, gridX: 2, gridY: 2 },
  //17
  { type: "room", name: "Library", roomId: 23, gridX: 4, gridY: 2 },
  //18
  { type: "room", name: "Conservatory", roomId: 13, gridX: 4, gridY: 0 },
  //19
  { type: "room", name: "Ballroom", roomId: 12, gridX: 2, gridY: 0 },
  //20
  { type: "room", name: "Kitchen", roomId: 11, gridX: 0, gridY: 0 },
];

var startLocations = [
  //0 Miss Scarlet
  {
    currentX: 0,
    currentY: 3,
  },
  // 1
  {
    currentX: 4,
    currentY: 1,
  },
  // 2
  {
    currentX: 1,
    currentY: 2,
  },
  //3
  {
    currentX: 1,
    currentY: 0,
  },
  //4
  {
    currentX: 3,
    currentY: 0,
  },
  //5
  {
    currentX: 4,
    currentY: 3,
  },
  //Weapons
  {
    currentX: 0,
    currentY: 0,
  },
  {
    currentX: 4,
    currentY: 0,
  },
  {
    currentX: 0,
    currentY: 4,
  },
  {
    currentX: 4,
    currentY: 0,
  },
  {
    currentX: 2,
    currentY: 4,
  },
  {
    currentX: 4,
    currentY: 4,
  },
];

var startGrid = [
  [
    {
      roomId: "11",
      roomName: "Kitchen",
      roomObjs: ["6"],
    },
    {
      roomId: "1112",
      roomName: "Hallway",
      roomObjs: [],
    },
    {
      roomId: "12",
      roomName: "Ballroom",
      roomObjs: [],
    },
    {
      roomId: "1213",
      roomName: "Hallway",
      roomObjs: ["0"],
    },
    {
      roomId: "13",
      roomName: "Conservatory",
      roomObjs: ["8"],
    },
  ],
  [
    {
      roomId: "1121",
      roomName: "Hallway",
      roomObjs: ["3"],
    },
    {
      roomId: "0",
      roomName: "Empty",
      roomObjs: [],
    },
    {
      roomId: "1222",
      roomName: "Hallway",
      roomObjs: [],
    },
    {
      roomId: "0",
      roomName: "Empty",
      roomObjs: [],
    },
    {
      roomId: "1323",
      roomName: "Hallway",
      roomObjs: ["2"],
    },
  ],
  [
    {
      roomId: "21",
      roomName: "Dinning Room",
      roomObjs: ["9"],
    },
    {
      roomId: "2122",
      roomName: "Hallway",
      roomObjs: [],
    },
    {
      roomId: "22",
      roomName: "Billiard Room",
      roomObjs: [],
    },
    {
      roomId: "2223",
      roomName: "Hallway",
      roomObjs: [],
    },
    {
      roomId: "23",
      roomName: "Library",
      roomObjs: ["10"],
    },
  ],
  [
    {
      roomId: "2131",
      roomName: "Hallway",
      roomObjs: ["4"],
    },
    {
      roomId: "0",
      roomName: "Empty",
      roomObjs: [],
    },
    {
      roomId: "2232",
      roomName: "Hallway",
      roomObjs: [],
    },
    {
      roomId: "0",
      roomName: "Empty",
      roomObjs: [],
    },
    {
      roomId: "2333",
      roomName: "Hallway",
      roomObjs: [],
    },
  ],
  [
    {
      roomId: "31",
      roomName: "Lounge",
      roomObjs: ["7"],
    },
    {
      roomId: "3132",
      roomName: "Hallway",
      roomObjs: ["1"],
    },
    {
      roomId: "32",
      roomName: "Hall",
      roomObjs: [],
    },
    {
      roomId: "3233",
      roomName: "Hallway",
      roomObjs: ["5"],
    },
    {
      roomId: "33",
      roomName: "Study",
      roomObjs: ["11"],
    },
  ],
];

export class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: this.props.actions,
      player_id: -1,
      character_id: -1,
      cards: {},

      // Gameboard grid
      grid: startGrid,

      // Tracks all player and weapon locations
      locations: startLocations,

      // Tracks current player location
      currentX: -1,
      currentY: -1,

      // Used for movement turn
      validOptions: [],
      movementTurn: false,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.provideCurrentRoom = this.provideCurrentRoom.bind(this);

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

    //console.log("CHARACTER " + props.character_id)
    if (props.player_id != 0 && state.currentX == -1 && state.currentY == -1) {   
      //console.log("BMOVEMENT " + newCurrentX)
      //console.log("BMOVEMENT " + newCurrentY)
      newCurrentX = state.locations[props.character_id].currentX;
      newCurrentY = state.locations[props.character_id].currentY;
      //console.log("AMOVEMENT " + newCurrentX)
      //console.log("AMOVEMENT " + newCurrentY)
    }

    var first = props.actions[0];
    //console.log("getDerivedStateFromProps " + JSON.stringify(first));
    if (first != undefined) {
      if (first.message_type == 22) {
        //console.log("Found movement broadcast");
        if (first.message.character_moved === true) {
          //console.log("Character move")
          var objId = Number(first.message.moved_character);

          const cx = newLocations[objId].currentX;
          const cy = newLocations[objId].currentY;

          const nx = first.message.new_location_x;
          const ny = first.message.new_location_y;

          var index = newGrid[cx][cy].roomObjs.indexOf(objId);
          newGrid[cx][cy].roomObjs.splice(index, 1); //Remove obj from old room
          newGrid[nx][ny].roomObjs.push(objId); //Add obj to new room

          newLocations[objId].currentX = nx;
          newLocations[objId].currentY = ny;

          if ((objId = props.character_id)) {
            newCurrentX = nx;
            newCurrentY = ny;
          }
          // console.log("MOVEMENT " + JSON.stringify(newGrid[cx][cy]))
          // console.log("MOVEMENT " + JSON.stringify(newGrid[nx][ny]))
          // console.log("MOVEMENT " + newLocations[objId].currentX)
          // console.log("MOVEMENT " + newLocations[objId].currentY)
          // console.log("MOVEMENT " + newCurrentX)
          // console.log("MOVEMENT " + newCurrentY)
        }

        if (first.message.weapon_moved === true) {
          //console.log("Weapon move")
          var objId = Number(first.message.moved_weapon);

          const cx = newLocations[objId].currentX;
          const cy = newLocations[objId].currentY;

          const nx = first.message.new_location_x;
          const ny = first.message.new_location_y;

          var index = newGrid[cx][cy].roomObjs.indexOf(objId);
          newGrid[cx][cy].roomObjs.splice(index, 1); //Remove obj from old room
          newGrid[nx][ny].roomObjs.push(objId); //Add obj to new room

          newLocations[objId].currentX = nx;
          newLocations[objId].currentY = ny;

          if ((objId = props.character_id)) {
            newCurrentX = nx;
            newCurrentY = ny;
          }
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
      player_id: props.player_id,
      character_id: props.character_id,
      cards: props.cards,
      count: newcount,
      grid: newGrid,
      locations: newLocations,
      playerX: newCurrentX,
      playerY: newCurrentY,
      movementTurn: newmovementTurn,
      validOptions: newvalidOptions,
    };
  }

  displayPlayerInfo() {
    return (
      <p>
        Player={this.props.player_id} | Character={uniqueIDs[this.props.character_id].name} | X={" "}
        {this.state.locations[this.props.character_id].currentX} | Y={" "}
        {this.state.locations[this.props.character_id].currentY}
      </p>
    );
  }

  provideCurrentRoom() {
    var cx = this.state.locations[this.props.character_id].currentX;
    var cy = this.state.locations[this.props.character_id].currentY;
    //console.log("YYHALLWAY: x" + cx + " y" + cy);
    // console.log(this.state.grid)
    if (cx == -1 & cy == -1) {
      return "";
    } else {
      var name = this.state.grid[cx][cy].roomName;
      //console.log("HALLWAY: " + name);
      return name;
    }
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
                x={i}
                y={j}
              />
            );
          })}
        </tr>
      );
    });

    return (
      <div style={{ textAlign: "center" }}>
        {this.props.player_id != 0 && this.displayPlayerInfo()}
        <Box
          actions={this.props.actions}
          currentRoom={this.provideCurrentRoom()}
          cards={this.props.cards}
          turn={this.props.turn}
        />
        <br />
        <br />
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
