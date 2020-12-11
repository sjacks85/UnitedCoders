import React from "react";
import { Room } from "./Room";
import { Box } from "./Box";
import { makeMovement } from "./ClientManager";
import PlayerHand from "./PlayerHand";
import NoteBook from "./NoteBook";
import MessageBoard from "./MessageBoard";
import "./Divider.css";
import "./GameBoard.css";
import "./NoteBook.css";
import Iframe from "react-iframe";
import "./hbeat.css";

var uniqueIDsZB = [
  //0
  { type: "character", name: "Miss Scarlet", image: "C0" },
  //1
  { type: "character", name: "Mr. Green", image: "C1" },
  //2
  { type: "character", name: "Colonel Mustard", image: "C2" },
  //3
  { type: "character", name: "Prof. Plum", image: "C3" },
  //4
  { type: "character", name: "Mrs. Peacock", image: "C4" },
  //5
  { type: "character", name: "Mrs. White", image: "C5" },
];

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
  { type: "room", name: "Study", roomId: 11 },
  //13
  { type: "room", name: "Hall", roomId: 12 },
  //14
  { type: "room", name: "Lounge", roomId: 13 },
  //15
  { type: "room", name: "Dinning Room", roomId: 23 },
  //16
  { type: "room", name: "Billiard Room", roomId: 22 },
  //17
  { type: "room", name: "Library", roomId: 21 },
  //18
  { type: "room", name: "Conservatory", roomId: 31 },
  //19
  { type: "room", name: "Ballroom", roomId: 32 },
  //20
  { type: "room", name: "Kitchen", roomId: 33 },
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
    currentY: 4,
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
  //Weapons 6
  {
    currentX: 0,
    currentY: 0,
  },
  //Weapons 7
  {
    currentX: 2,
    currentY: 0,
  },
  //Weapons 8
  {
    currentX: 4,
    currentY: 0,
  },
  //Weapons 9
  {
    currentX: 0,
    currentY: 4,
  },
  //Weapons 10
  {
    currentX: 2,
    currentY: 4,
  },
  //Weapons 11
  {
    currentX: 4,
    currentY: 4,
  },
];

var startGrid = [
  [
    {
      uniqueid: 12,
      roomId: "11",
      roomName: "Study",
      roomObjs: [],
    },
    {
      uniqueid: 0,
      roomId: "1112",
      roomName: "Hallway",
      roomObjs: [],
    },
    {
      uniqueid: 13,
      roomId: "12",
      roomName: "Hall",
      roomObjs: [],
    },
    {
      uniqueid: 0,
      roomId: "1213",
      roomName: "Hallway",
      roomObjs: [0],
    },
    {
      uniqueid: 14,
      roomId: "13",
      roomName: "Lounge",
      roomObjs: [],
    },
  ],
  [
    {
      uniqueid: 0,
      roomId: "1121",
      roomName: "Hallway",
      roomObjs: [3],
    },
    {
      uniqueid: 0,
      roomId: "0",
      roomName: "Empty",
      roomObjs: [],
    },
    {
      uniqueid: 0,
      roomId: "1222",
      roomName: "Hallway",
      roomObjs: [],
    },
    {
      uniqueid: 0,
      roomId: "0",
      roomName: "Empty",
      roomObjs: [],
    },
    {
      uniqueid: 0,
      roomId: "1323",
      roomName: "Hallway",
      roomObjs: [2],
    },
  ],
  [
    {
      uniqueid: 17,
      roomId: "21",
      roomName: "Library",
      roomObjs: [],
    },
    {
      uniqueid: 0,
      roomId: "2122",
      roomName: "Hallway",
      roomObjs: [],
    },
    {
      uniqueid: 16,
      roomId: "22",
      roomName: "Billiard Room",
      roomObjs: [],
    },
    {
      uniqueid: 0,
      roomId: "2223",
      roomName: "Hallway",
      roomObjs: [],
    },
    {
      uniqueid: 15,
      roomId: "23",
      roomName: "Dinning Room",
      roomObjs: [],
    },
  ],
  [
    {
      uniqueid: 0,
      roomId: "2131",
      roomName: "Hallway",
      roomObjs: [4],
    },
    {
      uniqueid: 0,
      roomId: "0",
      roomName: "Empty",
      roomObjs: [],
    },
    {
      uniqueid: 0,
      roomId: "2232",
      roomName: "Hallway",
      roomObjs: [],
    },
    {
      uniqueid: 0,
      roomId: "0",
      roomName: "Empty",
      roomObjs: [],
    },
    {
      uniqueid: 0,
      roomId: "2333",
      roomName: "Hallway",
      roomObjs: [],
    },
  ],
  [
    {
      uniqueid: 18,
      roomId: "31",
      roomName: "Conservatory",
      roomObjs: [],
    },
    {
      uniqueid: 0,
      roomId: "3132",
      roomName: "Hallway",
      roomObjs: [1],
    },
    {
      uniqueid: 19,
      roomId: "32",
      roomName: "Ballroom",
      roomObjs: [],
    },
    {
      uniqueid: 0,
      roomId: "3233",
      roomName: "Hallway",
      roomObjs: [5],
    },
    {
      uniqueid: 20,
      roomId: "33",
      roomName: "Kitchen",
      roomObjs: [],
    },
  ],
];

var startLocationsIframe = convertLocations(startLocations);
var iframeUrl =
  "./Board.html?startLocations=" + JSON.stringify(startLocationsIframe);

export class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: this.props.actions,
      player_id: -1,
      character_id: -1,
      username: this.props.username,
      cards: {},
      chatmessage: this.props.chatmessage, // NEW...

      final_message: {},
      show: true,

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
      show_nomove: false,

      // Color Settings / Theme:
      colorPalette: this.props.colorPalette,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.displayIcons = this.displayIcons.bind(this);

    this.dims = [
      parseFloat(500 / this.state.grid.length),
      parseFloat(500 / this.state.grid[0].length),
    ];
  }

  componentDidMount() {
    window.addEventListener("message", (event) => {
      this.requestMovement(event.data);
    });
  }

  requestMovement(roomId) {
    var requestedCoords = convertIdToCoords(roomId);
    this.handleOnClick(requestedCoords[0], requestedCoords[1]);
  }

  displayIcons() {
    const objects = uniqueIDs.map((object, index) => {
      const imgsrc = "/gameboard/" + index.toString() + ".png";
      return (
        <p>
          {" "}
          {index.toString()}
          <img src={imgsrc} height="45" width="30" />
        </p>
      );
    });

    return <div>{objects}</div>;
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
        alert(
          "That's a valid location to movement! Moving to the " +
            this.state.grid[x][y].roomName
        );

        //Send movement request with requested room
        makeMovement("true", myArray[index].movement_id);
        this.setState({ movementTurn: false, validOptions: [] });
      } else {
        alert("That's an invalid location to movement. Try again!");
      }
    } else {
      alert("It's not your turn to move!");
    }
  }

  provideCurrentRoom() {
    var cx = this.state.locations[this.props.character_id].currentX;
    var cy = this.state.locations[this.props.character_id].currentY;
    //console.log("YYHALLWAY: x" + cx + " y" + cy);
    // console.log(this.state.grid)
    if ((cx == -1) & (cy == -1)) {
      return "";
    } else {
      var name = this.state.grid[cx][cy].roomName;
      //console.log("HALLWAY: " + name);
      return name;
    }
  }

  provideCurrentLocationId() {
    var cx = this.state.locations[this.props.character_id].currentX;
    var cy = this.state.locations[this.props.character_id].currentY;
    //console.log("YYHALLWAY: x" + cx + " y" + cy);
    // console.log(this.state.grid)
    if ((cx == -1) & (cy == -1)) {
      return "";
    } else {
      var locid = this.state.grid[cx][cy].uniqueid;
      //console.log("HALLWAY: " + locid);
      return locid;
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
    var newshow_nomove = state.show_nomove;
    var newfinal_message = state.final_message;
    var newshow = state.show;
    var newColorPalette = props.colorPalette;

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
      if (first.message_type == 11) {
        //Assign weapons
        //   "weapon_locations":
        //  "id":
        //  "location": [x,y]
        var weapons = first.message.weapon_locations;
        console.log(JSON.stringify(weapons));

        weapons.forEach((element) => {
          console.log(element);
          var x = element.location[0];
          var y = element.location[1];

          //console.log("X=" + x + " Y="+ y)
          var index = newGrid[x][y].roomObjs.indexOf(Number(element.id));
          //console.log(index)
          if (index === -1) {
            //console.log("KATHRYNIF")
            newGrid[x][y].roomObjs.push(Number(element.id));
            newLocations[Number(element.id)].currentX = x;
            newLocations[Number(element.id)].currentY = y;
          }
        });
        console.log("GRID=" + JSON.stringify(newGrid));
        console.log("LOC=" + JSON.stringify(newLocations));

        //Update Iframe with new location
        // var iframeWin = document.getElementById("board-iframe").contentWindow;
        // var boardLocations = convertLocations(newLocations);
        // iframeWin.postMessage(boardLocations);

        //Update Iframe with new location
        var boardLocations = convertLocations(newLocations);

        iframeUrl =
          "./Board.html?startLocations=" + JSON.stringify(boardLocations);
      } else if (first.message_type == 22) {
        //console.log("Found movement broadcast");
        if (first.message.character_moved === true) {
          //console.log("Character move")
          var objId = Number(first.message.moved_character);
          console.log("Character move: " + objId);

          const cx = newLocations[objId].currentX;
          const cy = newLocations[objId].currentY;
          //console.log("MOVEMENT current" + cx + " " + cy)

          const nx = first.message.new_location_x;
          const ny = first.message.new_location_y;
          //console.log("MOVEMENT new" + nx + " " + ny)

          var index = newGrid[cx][cy].roomObjs.indexOf(objId);
          newGrid[cx][cy].roomObjs.splice(index, 1); //Remove obj from old room
          newGrid[nx][ny].roomObjs.push(objId); //Add obj to new room

          newLocations[objId].currentX = nx;
          newLocations[objId].currentY = ny;

          if ((objId = props.character_id)) {
            newCurrentX = nx;
            newCurrentY = ny;
          }

          //Update Iframe with new location
          var iframeWin = document.getElementById("board-iframe").contentWindow;
          var boardLocations = convertLocations(newLocations);
          iframeWin.postMessage(boardLocations);

          // console.log("MOVEMENT " + JSON.stringify(newGrid[cx][cy]))
          // console.log("MOVEMENT " + JSON.stringify(newGrid[nx][ny]))
          //console.log("MOVEMENT " + newLocations[objId].currentX)
          // console.log("MOVEMENT " + newLocations[objId].currentY)
          //console.log("MOVEMENT " + newCurrentX)
          //console.log("MOVEMENT " + newCurrentY)
        }

        if (first.message.weapon_moved === true) {
          //console.log("Weapon move")
          var objId = Number(first.message.moved_weapon);
          console.log("Weapon move: " + objId);

          const cx = newLocations[objId].currentX;
          const cy = newLocations[objId].currentY;

          const nx = first.message.new_location_x;
          const ny = first.message.new_location_y;

          var index = newGrid[cx][cy].roomObjs.indexOf(objId);
          newGrid[cx][cy].roomObjs.splice(index, 1); //Remove obj from old room
          newGrid[nx][ny].roomObjs.push(objId); //Add obj to new room

          newLocations[objId].currentX = nx;
          newLocations[objId].currentY = ny;

          var iframeWin = document.getElementById("board-iframe").contentWindow;
          var boardLocations = convertLocations(newLocations);
          iframeWin.postMessage(boardLocations);
        }
      } else if (first.message_type == 31) {
        newmovementTurn = true;
        newvalidOptions = first.message.valid_locations;
        if (
          first.message.movement_required === false ||
          first.message.message_possible === false
        ) {
          newshow_nomove = true;
        }
      } else if (first.message_type == 61) {
        // {
        // “game_over”:
        // “winning_player”:
        // “correct_room”:
        // “correct_character”:
        // “correct_weapon”:
        // }
        newfinal_message = first;
        newshow = true;
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
      show_nomove: newshow_nomove,
      final_message: newfinal_message,
      show: newshow,
      colorPalette: newColorPalette,
    };
  }

  displayPlayerInfo() {
    let string = "";
    if (this.props.player_id != 0) {
      let cx = this.state.locations[this.props.character_id].currentX;
      let cy = this.state.locations[this.props.character_id].currentY;
      let roomName = this.state.grid[cx][cy].roomName;
      string =
        "Username: " +
        this.props.username +
        " | Character: " +
        uniqueIDs[this.props.character_id].name +
        " | Current Location: " +
        roomName;
      //string = "Username = " + window.location.port + " | Player = " + this.props.player_id + " | Current Location = [" + this.state.locations[this.props.character_id].currentX + ", " + this.state.locations[this.props.character_id].currentY + "]";
    } else {
      string = "";
      //"Username = " + window.location.port;
    }
    return string;
  }

  /*colorPaletteUpdate() {
    var gameBoardHeader = document.getElementById("gameBoardHeader");
    gameBoardHeader.style.backgroundColor = this.state.colorPalette[0];
    var gameBoardFooter = document.getElementById("gameBoardFooter");
    gameBoardFooter.style.backgroundColor = this.state.colorPalette[1];
    console.log("Color Palette Update:" + this.state.colorPalette[0]);
  }*/

  render() {
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

    //this.colorPaletteUpdate();

    if (this.props.player_id != 0) {
      //this.props.onSelectTest("KATHRYN FROM GAMEBOARD");
      //this.props.changeCurrentRoom(this.provideCurrentRoom())
      //this.props.changeCurrentLocationId(this.provideCurrentLocationId())
    }

    return (
      <div>
        <div class="float-container">
          <div class="float-child-left">
            <div class="green">
              <span
                id="gameBoardHeader"
                class="gameBoardHeader"
                style={{ backgroundColor: this.state.colorPalette[0] }}
              >
                <span class="gameTitle">Clue-Less Gameboard</span>
              </span>

              <Iframe
                id="board-iframe"
                url={iframeUrl}
                marginwidth="0"
                marginheight="0"
                hspace="0"
                vspace="0"
                frameborder="0"
                scrolling="no"
              />

              <span
                id="gameBoardFooter"
                class="gameBoardFooter"
                style={{ backgroundColor: this.state.colorPalette[1] }}
              >
                {this.displayPlayerInfo()}
              </span>

              <table hidden cellSpacing="0" id="gameboard_table">
                <tbody>{rows}</tbody>
              </table>
            </div>
          </div>
          <div class="float-child-right">
            <div>
              <Box
                actions={this.props.actions}
                currentLocId={this.provideCurrentLocationId()}
                currentRoom={this.provideCurrentRoom()}
                cards={this.props.cards}
                turn={this.props.turn}
                show_nomove={this.state.show_nomove}
                colorPalette={this.state.colorPalette}
              />
              <NoteBook colorPalette={this.state.colorPalette}></NoteBook>
              <PlayerHand cards={this.state.cards} />

              <p>
                <MessageBoard
                  actions={this.props.actions}
                  username={this.state.username}
                  chatmessage={this.state.chatmessage}
                  colorPalette={this.state.colorPalette}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//Iframe Helper Methods

function convertLocations(locations) {
  // var locations = this.state.locations;

  var convertedLocations = [];
  var playerId = "";

  for (var i = 0; i < 6; i++) {
    var locationObject = {
      playerId: "P" + (i + 1),
      roomId: convertCoordsToId(locations[i].currentX, locations[i].currentY),
    };
    convertedLocations.push(locationObject);
  }

  for (var i = 6; i < locations.length; i++) {
    if (i === 7) {
      playerId = 4;
    } else if (i === 8) {
      playerId = 2;
    } else if (i === 9) {
      playerId = 3;
    } else {
      playerId = i - 5;
    }
    var locationObject = {
      playerId: "W" + playerId,
      roomId: convertCoordsToId(locations[i].currentX, locations[i].currentY),
    };

    convertedLocations.push(locationObject);
  }

  return convertedLocations;
}

//convert locations to room ID
function convertCoordsToId(x, y) {
  return startGrid[x][y].roomId;
}

//convert locations to room ID
function convertIdToCoords(id) {
  // startGrid is an array of json objects...iterate through array until you fin matching ID, return coords
  var coords = [];

  for (var i = 0; i < startGrid.length; i++) {
    var row = startGrid[i];
    for (var j = 0; j < row.length; j++) {
      if (row[j].roomId === id) {
        coords = [i, j];
      }
    }
  }

  return coords;
}

export default Gameboard;
