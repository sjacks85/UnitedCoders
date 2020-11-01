import React from "react";
import ImageMapper from 'react-image-mapper';
import { positional } from "yargs";
import { makeMovement, makeSuggestion, makeAccusation, makeDisprove } from './ClientManager';
import './MapExample.css';

//All rooms and Hallways codes. Sequence is important - Please don't change them.
var roomCode = ['11','12','13','21','22','23','31','32','33',
'1112','1213','1121','1222','1323','2122','2223','2131','2232','2333','3132','3233']

//All rooms and Hallways locations to put objects. Sequence is important - Please don't change them.
var roomArra = {
  "11": [103,241,273,426], 
  "12": [379,300,585,455],
  "13": [691,235,853,394],
  "21": [103,541,337,716],
  "22": [423,544,561,715],
  "23": [674,510,828,660],
  "31": [103,835,305,1011],
  "32": [385,796,569,995],
  "33": [640,892,861,1017],
  "1112": [304,374,304,374],
  "1213": [625,374,625,374],
  "1121": [219,460,219,460],
  "1222": [543,479,543,479],
  "1323": [735,440,735,440],
  "2122": [365,599,365,599],
  "2223": [591,567,591,567],
  "2131": [284,753,284,753],
  "2232": [444,741,444,741],
  "2333": [680,725,680,725],
  "3132": [335,924,335,924],
  "3233": [590,923,590,923]
}

//All valid rooms and hallways to move in (based on player's current location). Sequence is important - Please don't change them.
var roomAccess = {
    "11": ['1112','1121','33'],
    "12": ['1112','1222','1213'], 
    "13": ['1213','1323','31'],
    "21": ['1121','2122','2131'],
    "22": ['2122','1222','2223','2232'],
    "23": ['2223','1323','2333'],
    "31": ['2131','3132','13'],
    "32": ['3132','2232','3233'],
    "33": ['3233','2333','11'],
    "1112": ['11','12'],
    "1213": ['12','13'],
    "1121": ['11','21'],
    "1222": ['12','22'],
    "1323": ['13','23'],
    "2122": ['21','22'],
    "2223": ['22','23'],
    "2131": ['21','31'],
    "2232": ['22','32'],
    "2333": ['23','33'],
    "3132": ['31','32'],
    "3233": ['32','33']
}
  class MapExample extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        actions: this.props.actions,
        hoveredArea: null,
        msg: null, 
        moveMsg: null,
        myid: 'P1',
        started: true,

        // Stores players current locID
        players: [
          "2333", //Miss Scarlet
          "3233", //Mr. Green
          "2131", //Colonel Mustard
          "1121", //Prof. Plum
          "1112", //Mrs. Peacock
          "1323" //Mrs. White
        ],
  
        // Stores weapons current locID
        weapons: [
          "11",
          "13",
          "22",
          "23",
          "31",
          "32"
        ]
      };
    };

    // Movement message
    //{"game_id":0,"player_id":0,"message_type":22,"message":
    //{"character_moved":true,"weapon_moved":false,"moved_character":1,"moved_weapon":"","new_weapon_location":[]}}

    // //Process the Move for Person or Weapon to new location
    // MoveObject(PID,TO){
    //     var currentLoc=document.getElementById(PID).getAttribute('data-locId');
    //     document.getElementById(PID).setAttribute('data-locId',TO);
    //     this.RenderRoom(currentLoc);
    //     this.RenderRoom(TO);
    // }

    // //Sets current user Character
    // SetUser(NUSR){
    //     this.state.myid=NUSR;
    // }

    // //Organizes Objects in a room/hallway  (Updates Room on Gui)
    // RenderRoom(RID){
    //     console.log("renderroom" + RID)
    //     var roomidx=-1;
    //     for(roomidx=0;roomidx<21;roomidx++){
    //         if(RID==roomCode[roomidx])
    //             break;
    //     }
    //     //alert(roomidx+','+roomCode[roomidx]);
    //     var fromx=roomArra[roomidx][0];
    //     var fromy=roomArra[roomidx][1];
    //     var tox=roomArra[roomidx][2];
    //     var toy=roomArra[roomidx][3];
    //     var i=0;
    //     var cx=fromx;
    //     var cy=fromy;
    //     for(i=1;i<7;i++){
    //         if(roomCode[roomidx]==document.getElementById('P'+i).getAttribute('data-locId')){
    //             //$('#P'+i).css({ left: cx+ 'px' });
    //             //$('#P'+i).css({ top: cy+'px' });
    //             cy+=45;
    //             if(cy+40>toy) {
    //                 cx+=45;
    //                 cy=fromy;
    //             }
    //         }
    //     }
    //     for(i=1;i<7;i++){
    //         if(roomCode[roomidx]==document.getElementById('W'+i).getAttribute('data-locId')){
    //             //$('#W'+i).css({ left: cx+ 'px' });
    //             //$('#W'+i).css({ top: cy+'px' });
    //             cy+=45;

    //             if(cy+40>toy) {
    //                 cx+=45;
    //                 cy=fromy;
    //             }
    //         }
    //     }
    //     var rcode=roomCode;
    // }

    // //Checks if Hallway is free to move in ?
    // ISFree(HWID){
    //    console.log('Isfree' + HWID)
    //    console.log('Isfree' + document.getElementById('P1').getAttribute('data-locId'))
    //     for(var i=1;i<7;i++) {
    //         if (HWID == document.getElementById('P' + i).getAttribute('data-locId')) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }

    // //Validates the requested move.
    // // We can not move to a Hallway if already someone is there
    // // We only can move to neighbor areas and cross connected rooms
    // ValidateMove(dataId){
    //     var roomidx=-1;

    //     var locid= document.getElementById(this.state.myid).getAttribute('data-locId');
    //     console.log("validatemove" + locid)
    //     for(roomidx=0;roomidx<21;roomidx++){
    //         if(locid==roomCode[roomidx])
    //             break;
    //     }

    //     for (var i=0;i<roomAccess[roomidx].length;i++){
    //         if(roomAccess[roomidx][i]==dataId){
    //             if(roomAccess[roomidx][i].length==2)
    //                 return true;
    //             return this.ISFree(roomAccess[roomidx][i]);
    //         }
    //     }
    //     return false;
    // }

    // //Manages Click event on area (Room or Hallway) . Validate the Move and Move the player to new location.
    // AreaClicked(area){
    //     console.log(area)
    //     console.log(this.state.myid)
    //     var dataId = area.name;
    //     if(!this.state.started)
    //         return ;
    //     if(!this.ValidateMove(dataId))
    //     {
    //         alert('Your requested move is not valid!');
    //         return ;
    //     }
    //     this.MoveObject(this.state.myid, dataId);
    // }
  
    // Provided by example
    load() {
      this.setState({ msg: "Interact with image !" });
    }
    clicked(area) {
      this.setState({
        msg: `You clicked on ${area.shape} at coords ${JSON.stringify(
          area.coords
        )} !`
      });
      console.log(this.state.msg)
      //this.AreaClicked(area)
      console.log(this.state.players)
      
      //Setting players location have clicked, should really parse information
      //out of movement broadcast messages
      var clonePlayers = this.state.players;
      clonePlayers.P1=area.name;
      this.setState({players: clonePlayers})
      console.log(this.state.players)
      makeMovement("true", "hallway");
    }

    clickedOutside(evt) {
      const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
      this.setState({
        msg: `You clicked on the image at coords ${JSON.stringify(coords)} !`
      });
    }

    moveOnImage(evt) {
      const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
      this.setState({
        moveMsg: `You moved on the image at coords ${JSON.stringify(coords)} !`
      });
    }

    enterArea(area) {
      this.setState({
        hoveredArea: area,
        msg: `You entered ${area.shape} ${area.name} at coords ${JSON.stringify(
          area.coords
        )} !`
      });
    }

    leaveArea(area) {
      this.setState({
        hoveredArea: null,
        msg: `You leaved ${area.shape} ${area.name} at coords ${JSON.stringify(
          area.coords
        )} !`
      });
    }

    moveOnArea(area, evt) {
      const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
      this.setState({
        moveMsg: `You moved on ${area.shape} ${
          area.name
        } at coords ${JSON.stringify(coords)} !`
      });
    }
  
    getTipPosition(area) {
      return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
    }

    areaClicked() {
      console.log("areaClicked");
      alert("alertClicked")
    }

    checkFirst(array) {
      const first = array[0];

      //{"game_id":0,"player_id":0,"message_type":22,"message”:
      //{"character_moved":true,"weapon_moved":false,"moved_character":1,"moved_weapon":"","new_weapon_location":[]}} 

      // Look movement broadcast
      if (first != undefined && first.message_type == 22) {

         // Character movement
         if (first.message.character_moved != undefined) {
           if (first.message.character_moved == true) {
            console.log("CheckFirst: Found movement broadcast" + JSON.stringify(first));

            var player = 'P' + first.message.moved_character.toString();
            var id = first.message.moved_character - 1;
            console.log("CheckFirst: Moving " + player + " to 13");
 
            var requestedChange = "13";
            var clonePlayers = this.state.players;
            clonePlayers[id] ='13'; //Should grab location from messages
 
            if (clonePlayers[id] != requestedChange) {
             console.log("CheckFirst: State Before" + JSON.stringify(this.state))
             this.setState({players: clonePlayers})
             console.log("CheckFirst: State After" + JSON.stringify(this.state))
           }
         }

         // Weapon movement
         if (first.message.weapon_moved != undefined) {
           if (first.message.weapon_moved == true) {
            console.log("CheckFirst: Found movement broadcast" + JSON.stringify(first));
            var weapon = 'W' + first.message.moved_weapon.toString();
            var id = first.message.moved_weapon - 1;
            console.log("CheckFirst: Moving " + weapon + " to 13");
  
            var requestedChange = "13";
            var cloneWeapons = this.state.weapons;
            cloneWeapons[id]='13'; //Should grab location from messages
  
            if (cloneWeapons[id] != requestedChange) {
             console.log("CheckFirst: State Before" + JSON.stringify(this.state))
             this.setState({weapons: cloneWeapons})
             console.log("CheckFirst: State After" + JSON.stringify(this.state))
            }
           }
          }
        }
      }
    }

  render() {
    //console.log('MapState:' + JSON.stringify(this.state))
    //console.log('MapProps:' + JSON.stringify(his.props.actions))

    this.checkFirst(this.props.actions)
  
  const URL = "/gameboard/GBG.png"
  const MAP = {
    name: "my-map",
    areas: [
      {name: "11", shape: "rect", coords: [93,213,286,439], preFillColor: "green" },
      {name: "12", shape: "poly", coords: [350,278,416,277,416,243,542,245,543,279,607,279,606,468,349,468], preFillColor: "green"},
      {name: "13", shape: 'rect', coords: [673,216,863,407], preFillColor: "green" },
      {name: "21", shape: 'poly', coords: [92,503,253,505,254,534,349,537,348,727,93,727], preFillColor: "green" },
      {name: "22", shape: 'rect', coords: [418,537,575,724], preFillColor: "green" },
      {name: "23", shape: 'poly', coords: [642,538,670,538,671,506,831,506,832,538,862,539,864,632,831,636,833,664,670,666,669,633,639,632], preFillColor: "green" },
      {name: "31", shape: 'rect', coords: [91,822,316,1020], preFillColor: "green" },
      {name: "32", shape: 'rect', coords: [382,792,571,1001], preFillColor: "green" },
      {name: "33", shape: 'rect', coords: [639,892,862,1017], preFillColor: "green" },
      {name: "1112", shape: 'rect', coords: [288,373,348,403], preFillColor: "green" },
      {name: "1213", shape: 'rect', coords: [610,371,671,404], preFillColor: "green" },
      {name: "2122", shape: 'rect', coords: [352,597,416,629], preFillColor: "green" },
      {name: "2223", shape: 'rect', coords: [578,563,639,598], preFillColor: "green" },
      {name: "3132", shape: 'rect', coords: [318,921,381,953], preFillColor: "green" },
      {name: "3233", shape: 'rect', coords: [576,920,637,953], preFillColor: "green" },
      {name: "1121", shape: 'rect', coords: [218,440,252,501], preFillColor: "green" }, 
      {name: "1222", shape: 'rect', coords: [542,471,576,531], preFillColor: "green" },
      {name: "1323", shape: 'rect', coords: [734,409,771,503], preFillColor: "green" },
      {name: "2131", shape: 'rect', coords: [282,730,318,819], preFillColor: "green" },
      {name: "2232", shape: 'rect', coords: [444,729,479,789], preFillColor: "green" },
      {name: "2333", shape: "rect", coords: [680,668,716,884], preFillColor: "green" },
    ]
  }

  const ROOM = [
    { id: "11", name: "Kitchen"},
    { id: "12", name: "Ballroom"},
    { id: "13", name: "Conservatory"},
    { id: "21", name: "Diningroom"},
    { id: "22", name: "Billiardroom"},
    { id: "23", name: "Library"},
    { id: "31", name: "Lounge"},
    { id: "32", name: "Hall"},
    { id: "33", name: "Study"},
    { id: "1112", name: "1112"},
    { id: "1213", name: "1213"},
    { id: "2122", name: "2122"},
    { id: "2223", name: "2223"},
    { id: "3132", name: "3132"},
    { id: "3233", name: "3233"},
    { id: "1121", name: "1121"},
    { id: "1222", name: "1222"},
    { id: "1323", name: "1323"},
    { id: "2131", name: "2131"},
    { id: "2232", name: "2232"},
    { id: "2333", name: "2333"}
  ]

  const style = {
        zindex: 500,
        position: 'absolute',
        height: '45px',
        width: '28px',
        top: '300px',
        left: '300px',
        //transition: 1s all
  };

    return (

      <div>
      {/* <div id="P1" data-locId="2333" ><img src="/gameboard/P1.png" height="45" width="28" title="Miss Scarlet" /></div>
    <div id="P2"  data-locId="3233" ><img src="/gameboard/P2.png" height="45" width="28" title="Mr. Green"/></div>
    <div id="P3" data-locId="2131"  ><img src="/gameboard/P3.png" height="45" width="28" title="Colonel Mustard"/></div>
    <div id="P4" data-locId="1121"  ><img src="/gameboard/P4.png" height="45" width="28" title="Prof. Plum"/></div>
    <div id="P5" data-locId="1112"  ><img src="/gameboard/P5.png" height="45" width="28" title="Mrs. Peacock"/></div>
    <div id="P6" data-locId="1323"  ><img src="/gameboard/P6.png" height="45" width="28" title="Mrs. White"/></div>

    <div id="W1" data-locId="11" ><img src="/gameboard/W1.png" height="45" width="45" title="Candlestick"/></div>
    <div id="W2"  data-locId="13" ><img src="/gameboard/W2.png" height="45" width="45" title="Dagger"/></div>
    <div id="W3"  data-locId="22" ><img src="/gameboard/W3.png" height="45" width="45" title="Lead Pipe"/></div>
    <div id="W4" data-locId="23" ><img src="/gameboard/W4.png" height="45" width="45" title="Revolver"/></div>
    <div id="W5"  data-locId="31" ><img src="/gameboard/W5.png" height="45" width="45" title="Rope"/></div>
    <div id="W6"  data-locId="32" ><img src="/gameboard/W6.png" height="45" width="45" title="Wrench"/></div> */}

  <div className="container">
    
    <div className="imagemapper">
    <ImageMapper src={URL} map={MAP} width={500}
    	onLoad={() => this.load()}
    	onClick={area => this.clicked(area)}
    	onMouseEnter={area => this.enterArea(area)}
    	onMouseLeave={area => this.leaveArea(area)}
    	onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
    	onImageClick={evt => this.clickedOutside(evt)}
      onImageMouseMove={evt => this.moveOnImage(evt)}
      imgWidth={1230}
    />

    </div>
    {
    	this.state.hoveredArea &&
    	<span className="tooltip"
    	    style={{ ...this.getTipPosition(this.state.hoveredArea)}}>
    		{ this.state.hoveredArea && this.state.hoveredArea.name }
    	</span>
    }
    <p></p>

    <p>Player Locations
      {this.state.players.map((elem, index) => (
      <div>P{index+1}={elem}</div>))}
    </p>

    <img src="/gameboard/P1.png" height="45" width="28" title="Miss Scarlet" style={style} />

    <p>Weapon Locations
      {this.state.weapons.map((elem, index) => (
      <div>W{index+1}={elem}</div>))}
    </p>

    {/* <div id="BPH" data-locId="0">
        <span id="S1" height="200" width="90" ><img src="/gameboard/S1.png" height="183" width="80" title="Miss Scarlet"/><br/>Miss Scarlet</span>
        <span id="S2"  height="200" width="90" ><img src="/gameboard/S2.png" height="183" width="80" title="Mr. Green"/><br/>Mr. Green</span>
        <span id="S3"  height="200" width="90" ><img src="/gameboard/S3.png" height="183" width="80" title="Colonel Mustard"/><br/>Col Mustard</span>
        <span id="S4"  height="200" width="90" ><img src="/gameboard/S4.png" height="183" width="80" title="Professor Plum"/><br/>Prof. Plum</span>
        <span id="S5"  height="200" width="90" ><img src="/gameboard/S5.png" height="183" width="80" title="Mrs. Peacock"/><br/>Mrs. Peacock</span>
        <span id="S6"  height="200" width="90" ><img src="/gameboard/S6.png" height="183" width="80" title="Mrs. White"/><br/>Mrs. White</span>

        <span id="C1"  height="200" width="90" ><img src="/gameboard/W1.png" height="80" width="80" title="Candlestick"/><br/>Candlestick</span>
        <span id="C2"  height="200" width="90" ><img src="/gameboard/W2.png" height="80" width="80" title="Dagger"/><br/>Dagger</span>
        <span id="C3"  height="200" width="90" ><img src="/gameboard/W3.png" height="80" width="80" title="Lead Pipe"/><br/>Lead Pipe</span>
        <span id="C4"  height="200" width="90" ><img src="/gameboard/W4.png" height="80" width="80" title="Revolver"/><br/>Revolver</span>
        <span id="C5"  height="200" width="90" ><img src="/gameboard/W5.png" height="80" width="80" title="Rope"/><br/>Rope</span>
        <span id="C6"  height="200" width="90" ><img src="/gameboard/W6.png" height="80" width="80" title="Wrench"/><br/>Wrench</span>

    </div> */}
    </div>
</div>
    );
  }
  }
  
export default MapExample;