import { conditionalExpression } from "@babel/types";
import { constants } from "buffer";
import React from "react";
//import { grid } from '../data/grid.js';
import { Square } from "./Square";

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

//All rooms and Hallways locations to put objects. Sequence is important - Please don't change them.
var roomArra = {
  11: [103, 241, 273, 426],
  12: [379, 300, 585, 455],
  13: [691, 235, 853, 394],
  21: [103, 541, 337, 716],
  22: [423, 544, 561, 715],
  23: [674, 510, 828, 660],
  31: [103, 835, 305, 1011],
  32: [385, 796, 569, 995],
  33: [640, 892, 861, 1017],
  1112: [304, 374, 304, 374],
  1213: [625, 374, 625, 374],
  1121: [219, 460, 219, 460],
  1222: [543, 479, 543, 479],
  1323: [735, 440, 735, 440],
  2122: [365, 599, 365, 599],
  2223: [591, 567, 591, 567],
  2131: [284, 753, 284, 753],
  2232: [444, 741, 444, 741],
  2333: [680, 725, 680, 725],
  3132: [335, 924, 335, 924],
  3233: [590, 923, 590, 923],
};

var startRooms = [
  {player: "P1",
   startX: 3,
   startY: 4
  },
  {player: "P2",
   startX: 4,
   startY: 3
  },
  {player: "P3",
   startX: 0,
   startY: 3
  },
  {player: "P4",
   startX: 1,
   startY: 0
  },
  {player: "P5",
   startX: 0,
   startY: 1
  },
  {player: "P6",
   startX: 1,
   startY: 4
  },
]

var startXY = {
  "P1": {
    startX: 3,
    startY: 4
  },
  "P2": {
   startX: 4,
   startY: 3
  },
  "P3": {
   startX: 0,
   startY: 3
  },
  "P4": {
   startX: 1,
   startY: 0
  },
  "P5": {
   startX: 0,
   startY: 1
  },
  "P6": {
   startX: 1,
   startY: 4
  },
}

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
      roomPlayers: ["P1"], //NOT RIGHT NEED TO PUT IN 2333
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
        { id: "2122", x: 1, y: 1 },
        { id: "1222", x: 1, y: 1 },
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
      roomName: "Room",
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
      roomName: "Room",
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
      roomName: "Room",
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
      //grid:Array(5).fill(0).map(x=>Array(5).fill({})),
      grid: roomAccess,
      player: "X",
      winner: null,
      active: true,

      // Stores players current locID
      players: [
        "2333", //Miss Scarlet
        "3233", //Mr. Green
        "2131", //Colonel Mustard
        "1121", //Prof. Plum
        "1112", //Mrs. Peacock
        "1323", //Mrs. White
      ],

      // Stores weapons current locID
      weapons: ["11", "13", "22", "23", "31", "32"],
      currentPlayerId: this.props.player_id,
      currentX: 0,
      currentY: 0,
      currentPlayer: "P" + this.props.player_id,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.dims = [
      parseFloat(500 / this.state.grid.length),
      parseFloat(500 / this.state.grid[0].length),
    ];
  }

  state = {
    currentPlayerId: this.props.player_id,
    currentX: 0,
    currentY: 0,
    currentPlayer: "P" + this.props.player_id,
  };

  // checkWins(x, y){
  //   const g = this.state.grid

  //   function checkDiagonal1(){
  //     if (x == y){
  //       const result = new Set(g.map((_, i)=>g[i][i]));
  //       announceWin(result);
  //     }
  //   }

  //   function checkDiagonal2(){
  //     if (x+y+1 == g.length){
  //       const result = new Set(g.map((_, i)=>g[i][g.length-1-i]))
  //       announceWin(result);
  //     }
  //   }

  //   function checkHorizontal(x){
  //     const result = new Set(g[x]);
  //     announceWin(result);
  //   }

  //   function checkVertical(y){
  //     const result = new Set(g.map((x)=>x[y]));
  //     announceWin(result);
  //   }

  //   function announceWin(l){
  //     if (l.size == 1){
  //       if (l.has("X")){
  //         setTimeout(()=>{alert("X wins")}, 10);
  //         return;
  //       } else {
  //         setTimeout(()=>{alert("O wins")}, 10);
  //         return;
  //       }
  //     }
  //   }

  //   checkDiagonal1();
  //   checkDiagonal2();
  //   checkHorizontal(x);
  //   checkVertical(y);
  // }

  // Movement message
  //{"game_id":0,"player_id":0,"message_type":22,"message":
  //{"character_moved":true,"weapon_moved":false,"moved_character":1,"moved_weapon":"","new_weapon_location":[]}}

  //Process the Move for Person or Weapon to new location
  moveObject(PID, TO) {
    var currentLoc = document.getElementById(PID).getAttribute("data-locId");
    document.getElementById(PID).setAttribute("data-locId", TO);
    this.RenderRoom(currentLoc);
    this.RenderRoom(TO);
  }

  //Organizes Objects in a room/hallway  (Updates Room on Gui)
  RenderRoom(RID) {
    console.log("renderroom" + RID);
    var roomidx = -1;
    for (roomidx = 0; roomidx < 21; roomidx++) {
      if (RID == roomCode[roomidx]) break;
    }
    //alert(roomidx+','+roomCode[roomidx]);
    var fromx = roomArra[roomidx][0];
    var fromy = roomArra[roomidx][1];
    var tox = roomArra[roomidx][2];
    var toy = roomArra[roomidx][3];
    var i = 0;
    var cx = fromx;
    var cy = fromy;
    for (i = 1; i < 7; i++) {
      if (
        roomCode[roomidx] ==
        document.getElementById("P" + i).getAttribute("data-locId")
      ) {
        //$('#P'+i).css({ left: cx+ 'px' });
        //$('#P'+i).css({ top: cy+'px' });
        cy += 45;
        if (cy + 40 > toy) {
          cx += 45;
          cy = fromy;
        }
      }
    }
    for (i = 1; i < 7; i++) {
      if (
        roomCode[roomidx] ==
        document.getElementById("W" + i).getAttribute("data-locId")
      ) {
        //$('#W'+i).css({ left: cx+ 'px' });
        //$('#W'+i).css({ top: cy+'px' });
        cy += 45;

        if (cy + 40 > toy) {
          cx += 45;
          cy = fromy;
        }
      }
    }
    var rcode = roomCode;
  }

  //Checks if Hallway is free to move in ?
  ISFree(HWID) {
    console.log("Isfree" + HWID);
    console.log(
      "Isfree" + document.getElementById("P1").getAttribute("data-locId")
    );
    for (var i = 1; i < 7; i++) {
      if (HWID == document.getElementById("P" + i).getAttribute("data-locId")) {
        return false;
      }
    }
    return true;
  }

  //Validates the requested move.
  // We can not move to a Hallway if already someone is there
  // We only can move to neighbor areas and cross connected rooms
  validateMove(dataId) {
    var roomidx = -1;

    var locid = document
      .getElementById(this.state.myid)
      .getAttribute("data-locId");
    console.log("validatemove" + locid);
    for (roomidx = 0; roomidx < 21; roomidx++) {
      if (locid == roomCode[roomidx]) break;
    }

    for (var i = 0; i < roomAccess[roomidx].length; i++) {
      if (roomAccess[roomidx][i] == dataId) {
        if (roomAccess[roomidx][i].length == 2) return true;
        return this.ISFree(roomAccess[roomidx][i]);
      }
    }
    return false;
  }

  //Manages Click event on area (Room or Hallway) . Validate the Move and Move the player to new location.
  AreaClicked(area) {
    console.log(area);
    console.log(this.state.myid);
    var dataId = area.name;
    if (!this.state.started) return;
    if (!this.ValidateMove(dataId)) {
      alert("Your requested move is not valid!");
      return;
    }
    this.MoveObject(this.state.myid, dataId);
  }

  moveCurrentPlayer(x, y) {
    console.log("moveCurrentplayer");
    var g = this.state.grid;
    var index = g[this.state.currentX][this.state.currentY].roomPlayers.indexOf(this.state.currentPlayer)
    g[this.state.currentX][this.state.currentY].roomPlayers.splice(index, 1) //Remove current player to old room
    g[x][y].roomPlayers.push(this.state.currentPlayer) //Add current player to new room
    this.setState({grid: g, currentX: x, currentY: y})

    //console.log("After:" + this.state.grid[x][y].roomPlayers);
  }

  validateMove(x, y) {
    const currentRoom = this.state.grid[this.state.currentX][this.state.currentY];
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

  handleOnClick(x, y) {
    const g = this.state.grid;
    console.log("TicTac x=" + x + " y=" + y + " ");
    const currentRoom = this.state.grid[this.state.currentX][this.state.currentY];
    const requestedRoom = this.state.grid[x][y];
    console.log("TicTac " + JSON.stringify(currentRoom));
    console.log("TicTac " + JSON.stringify(requestedRoom));
    //console.log("TicTac " + JSON.stringify(this.state.grid))

    // Need to store current player, with location to base valid movements on

    const valid = this.validateMove(x, y)
    if (valid) {
      this.moveCurrentPlayer(x, y);
    } else {
      alert("not valid movement")
    }

  }

  // {
  //   roomId: "3233",
  //   roomName: "Hallway",
  //   roomAccess: ['32','33'],
  //   roomLimit: 1, // Because it is the hallway
  //   roomPlayers: [],
  //   roomWeapons: [],
  // },

  //this.validateMove(x, y)
  // if (this.state.active){
  //   if (g[x][y] == []){
  //     g[x][y] = this.state.player;
  //     this.setState({'grid':g});
  //     this.state.player = this.state.player == 'X' ? 'O':'X';
  //     this.checkWins(x, y);
  // } else {
  //   alert('Please select an empty square!');
  //   }
  // }


  // findCurrentPlayer() {
  //   const message = this.props.actions[0];
  //   console.log(JSON.stringify(message))
  //   if (message != undefined)
  //   if (this.state.currentPlayerId == 0)
  //   if (message.message_type == 11)
  //   if (message.message != undefined)
  //   if (message.message.username != undefined)
  //   if (message.message.username == window.location.port)
  //     alert("found 11 " + message.message.username + ' ' + message.message.player_id)
  //     //var player_id = message.message.player_id
  //     if (this.state.currentPlayerId == 0)
  //       console.log("found 11 set state")
  //       //this.setState({currentPlayerId: 1})
  //       //alert("found 11 set state")
  //       //this.setState({currentPlayerId: player_id})
  //       // if (message.message.username != undefined)
  //       //   console.log("User message" + message.message.username + " " + window.location.port)
  //       //   if (message.message.username == window.location.port)
  //       //     alert(JSON.stringify(message))
  //       //     this.setState(
  //       //       {currentPlayerId: message.message.player_id})
  //       //     console.log(message.message.player_id);
  // }

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

    console.log("TicTac:" + this.props.player_id)
    console.log("TicTac:" + this.state.currentPlayerId)
    console.log("TicTac:" + this.state.currentPlayer)
    //console.log("TicTac:" + startXY["P1"])

    //this.findCurrentPlayer()
    //console.log("TicTac" + this.state.currentPlayer);
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Tic-Tac-React!</h1>
        <small>
          tic-tac-toe, written with <b>ReactJS</b>. Enjoy!
        </small>
        <p>Current Player: {this.state.currentPlayer}</p>
        <p>Current X: {this.state.currentX}</p>
        <p>Current Y: {this.state.currentY}</p>
        <table cellSpacing="0" id="table" style={style}>
          <tbody>{rows}</tbody>
        </table>
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
