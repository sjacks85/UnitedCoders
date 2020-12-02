import React from "react";
import { Room } from "./Room";
import { Box } from "./Box";
import { makeMovement } from "./ClientManager";
import PlayerHand from "./PlayerHand";
import NoteBook from "./NoteBook";
import MessageBoard from "./MessageBoard";
import "./Divider.css";
import './hbeat.css';

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
  { type: "character", name: "Mrs. White", image: "C5" }
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
      roomObjs: [6],
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
      roomObjs: [9],
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
      roomObjs: [7],
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
      roomObjs: [10],
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
      roomObjs: [8],
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
      roomObjs: [11],
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
    this.displayIcons = this.displayIcons.bind(this);

    this.dims = [
      parseFloat(500 / this.state.grid.length),
      parseFloat(500 / this.state.grid[0].length),
    ];
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
        alert("That's a valid location to movement! Moving to the " + this.state.grid[x][y].roomName);

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
    if (cx == -1 & cy == -1) {
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
    if (cx == -1 & cy == -1) {
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

  displayPlayerInfoEx() {
    let string = ""
    if (this.props.player_id != 0 ) {
      let cx = this.state.locations[this.props.character_id].currentX;
      let cy = this.state.locations[this.props.character_id].currentY
      let roomName = this.state.grid[cx][cy].roomName;
      string = "Username = " + window.location.port + " | Character = " + uniqueIDs[this.props.character_id].name + " | Location = " + roomName;
      //string = "Username = " + window.location.port + " | Player = " + this.props.player_id + " | Current Location = [" + this.state.locations[this.props.character_id].currentX + ", " + this.state.locations[this.props.character_id].currentY + "]";
    } else {
      string = "Username = " + window.location.port;
    }
    return string;
  }

  displayPlayerInfo() {
	if (this.props.player_id != 0 ) {
	  let cx = this.state.locations[this.props.character_id].currentX;
      let cy = this.state.locations[this.props.character_id].currentY
      let roomName = this.state.grid[cx][cy].roomName;
	  let upic="/gameboard/"+uniqueIDsZB[this.props.character_id].image.replace('C','')+".png";
	  return (
		  <p>
			<b>You are {uniqueIDs[this.props.character_id].name} ( <img src={upic} id="mytoken" style={{height:"20px",width:"15px",animation: "heartbeat 1s 3"}}/> ) </b> <br/> <b>You are in {roomName}</b>
		  </p>
	  );
	}
	else{
		return (
			<p>"Username = {window.location.port }</p>
		);
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

    if (this.props.player_id != 0) {
      this.props.onSelectTest("KATHRYN FROM GAMEBOARD");
      //this.props.changeCurrentRoom(this.provideCurrentRoom())
      //this.props.changeCurrentLocationId(this.provideCurrentLocationId())
    }

    return (
      <div>
        <div class="float-container">
          <div class="float-child">
            <div class="green">
              <h3>Gameboard</h3>
              <p>
                {this.displayPlayerInfo()}
              </p>
              <table cellSpacing="0" id="table" style={style}>
                <tbody>{rows}</tbody>
              </table>
            </div>
          </div>
          <div class="float-child">
            <div class="blue">
              <Box
                actions={this.props.actions}
                currentLocId={this.provideCurrentLocationId()}
                currentRoom={this.provideCurrentRoom()}
                cards={this.props.cards}
                turn={this.props.turn}
              />
              <h4>Player Notebook</h4>
              <NoteBook></NoteBook>
              <h4>Player Hand</h4>
              <PlayerHand cards={this.state.cards} />
              <h4>Message Board</h4>
              <p>
                <MessageBoard actions={this.props.actions} />
              </p>
            </div>
          </div>
        </div>
      </div>
      // <div class="float-container">
      //   <div class="float-child">
      //     <div class="green">
      //       {this.props.player_id != 0 && this.displayPlayerInfo()}
      //       <br />
      //       <br />
      //       <br />
      //       <table cellSpacing="0" id="table" style={style}>
      //         <tbody>{rows}</tbody>
      //       </table>
      //       <br />
      //       <br />
      //       <br />
      //     </div>
      //     <div class="float-child">
      //       <div class="blue">
      //         <p>Username = {window.location.port}</p>
      //         <Box
      //           actions={this.props.actions}
      //           currentLocId={this.provideCurrentLocationId()}
      //           currentRoom={this.provideCurrentRoom()}
      //           cards={this.props.cards}
      //           turn={this.props.turn}
      //         />
      //         <NoteBook></NoteBook>
      //         <h4>Player Hand</h4>
      //         <PlayerHand cards={this.props.cards} />
      //         <h4>Message Board</h4>
      //         <p>
      //           <MessageBoard actions={this.props.actions} />
      //         </p>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default Gameboard;
