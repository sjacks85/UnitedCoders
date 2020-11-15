import React from "react";
import {  makeSuggestion, makeAccusation } from './ClientManager';

export class Box extends React.Component {
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

      playerLocations: startXY,

      // Stores weapons current locID
      weapons: ["11", "13", "22", "23", "31", "32"],
      currentPlayerId: this.props.player_id,
      currentX: 0,
      currentY: 0,
      currentPlayer: this.props.player_id,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
	this.suggestionClicked = this.suggestionClicked.bind(this);
	this.accusationClicked = this.accusationClicked.bind(this);
    this.dims = [
      parseFloat(500 / this.state.grid.length),
      parseFloat(500 / this.state.grid[0].length),
    ];
  }

  state = {
    playerLocations: startXY,
  }

  moveCurrentPlayer(x, y) {
    console.log("moveCurrentplayer");
    var g = this.state.grid;
    const cx = this.state.playerLocations[this.props.player_id].startX;
    const cy = this.state.playerLocations[this.props.player_id].startY;

    var index = g[cx][cy].roomPlayers.indexOf(this.props.player_id)
    g[cx][cy].roomPlayers.splice(index, 1) //Remove current player to old room
    g[x][y].roomPlayers.push(this.props.player_id) //Add current player to new room

    this.setState({grid: g, currentX: x, currentY: y})

    var s = this.state.playerLocations;
    s[this.props.player_id].startX = x;
    s[this.props.player_id].startY = y;
    this.setState({playerLocations: s})

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
	
	suggestionClicked(a,b){
		//alert(a);
		//alert(b);
		const cx = this.state.playerLocations[this.props.player_id].startX;
        const cy = this.state.playerLocations[this.props.player_id].startY;
		//alert(JSON.stringify(this.state.grid[cx][cy]));
		//alert(this.state.grid[cx][cy].roomName);

		var roomName="";
		switch (this.state.grid[cx][cy].roomId)
			{
			   case "11":
				roomName="kitchen";
				break;
			   case "12":
				roomName="ballroom";
				break;
			   case "13":
				roomName="conservatory";
				break;
			   case "21":
				roomName="dinning";
				break;
			   case "22":
				roomName="hall";
				break;
			   case "23":
				roomName="billiard";
				break;
			   case "31":
				roomName="library";
				break;
			   case "32":
				roomName="study";
				break;
			   case "33":
				roomName="lounge";
				break;				
			   default: 
				   alert('You need to be in a room!');
				   break;
			}
			if(roomName=="")
				return;
		var playerInput = "You are Suggesting : "+roomName+" "+ a+" "+ b;
		alert (playerInput);			
		//this.setState({ inputs : [playerInput, ...this.state.inputs]})
		makeSuggestion(roomName,a,b);
	}
	
	accusationClicked(a,b){
//alert(a);
		//alert(b);
		const cx = this.state.playerLocations[this.props.player_id].startX;
        const cy = this.state.playerLocations[this.props.player_id].startY;
		//alert(JSON.stringify(this.state.grid[cx][cy]));
		//alert(this.state.grid[cx][cy].roomName);
		var roomName="";
		switch (this.state.grid[cx][cy].roomId)
			{
			   case "11":
				roomName="kitchen";
				break;
			   case "12":
				roomName="ballroom";
				break;
			   case "13":
				roomName="conservatory";
				break;
			   case "21":
				roomName="dinning";
				break;
			   case "22":
				roomName="hall";
				break;
			   case "23":
				roomName="billiard";
				break;
			   case "31":
				roomName="library";
				break;
			   case "32":
				roomName="study";
				break;
			   case "33":
				roomName="lounge";
				break;				
			   default: 
				   alert('You need to be in a room!');
				   break;
			}
			if(roomName=="")
				return;
		var playerInput = "Your Accusation : "+roomName+" "+ a+" "+ b;
		alert (playerInput);
		//this.setState({ inputs : [playerInput, ...this.state.inputs]})
		makeAccusation(roomName,a,b);
	}
 
	// Suggestion Response Functions Starts
	ShowSuggestionWindow(suggestionTxt){
		document.getElementById("MyCardsType").selectedIndex='0';
		document.getElementById("suggestiondetail").innerHTML=suggestionTxt;
		this.updateDisproveUI();
		document.getElementById("suggestionresponsediv").style.display = "";
	}
	
	updateDisproveUI(){
		var mtVal=document.getElementById("MyCardsType").value;
		if(mtVal=='-1'){
		 document.getElementById("ResponseUser").style.display = "none";
		 document.getElementById("ResponseWeapon").style.display = "none";
		 document.getElementById("ResponseRoom").style.display = "none";
		}
		if(mtVal=='0'){
		 document.getElementById("ResponseUser").style.display = "";
		 document.getElementById("ResponseWeapon").style.display = "none";
		 document.getElementById("ResponseRoom").style.display = "none";
		}
		if(mtVal=='1'){
		 document.getElementById("ResponseUser").style.display = "none";
		 document.getElementById("ResponseWeapon").style.display = "";
		 document.getElementById("ResponseRoom").style.display = "none";
		}
		if(mtVal=='2'){
		 document.getElementById("ResponseUser").style.display = "none";
		 document.getElementById("ResponseWeapon").style.display = "none";
		 document.getElementById("ResponseRoom").style.display = "";
		}
		
	}
	
	sendSuggestionResponse(){
		var mtVal=document.getElementById("MyCardsType").value;
		var selectedvalue="";
		if(mtVal=='-1'){
		   // Send Socket Response that this user doesn't have any of the suggested items.
		}
		if(mtVal=='0'){
		    selectedvalue = document.getElementById("ResponseUser").value;
			// Send Socket Response that this user has the suggested user (user id is in selectedvalue).	
		}
		if(mtVal=='1'){
		 selectedvalue = document.getElementById("ResponseWeapon").value;
		// Send Socket Response that this user has the suggested Weapon (Weapon id is in selectedvalue).	
		}
		if(mtVal=='2'){
		 selectedvalue = document.getElementById("ResponseRoom").value;
		// Send Socket Response that this user has the suggested Room (Room id is in selectedvalue).	
		}
		document.getElementById("suggestionresponsediv").style.display = "none";
		//alert(selectedvalue);
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

    const filteredList = this.filter(this.props.actions);
    console.log("Filtered" + JSON.stringifyfilteredList);

    return (
      <div style={{ textAlign: "center" }}>
        <p>Player = {this.props.player_id} | X = {this.state.playerLocations[this.props.player_id].startX} | Y = {this.state.playerLocations[this.props.player_id].startY}</p>
<div style={{ textAlign: "center" ,width:"100%",height:"150px",margin:"10px"}}>
	<div style={{ textAlign: "center" ,"width":"300px","Min-Height":"150px",  "border-width": "5px" ,"border-color": "red","border-style": "outset" , margin: "0 auto",position: "relative"}}>
		<span>
			<h3>Suggestion / Accusation Box</h3>
			<select name="GuessedUser" id="GuessedUser" style={{margin:"10px",marginLeft:"0px"}}>
				<option value="scarlet" selected="selected">Miss Scarlet</option>
				<option value="green">Mr. Green</option>
				<option value="mustard">Colonel Mustard</option>
				<option value="plum">Prof. Plum</option>
				<option value="peacock">Mrs. Peacock</option>
				<option value="white">Mrs. White</option>
			</select>
			<select name="GuessedWeapon" id="GuessedWeapon" style={{margin:"10px"}}>
				<option value="candlestick" selected="selected">candlestick</option>
				<option value="revolver">revolver</option>
				<option value="knife">knife</option>
				<option value="pipe">pipe</option>
				<option value="rope">rope</option>
				<option value="wrench">wrench</option>
			</select>
			<br/>
			<button  name="sgbtn"  id="sgbtn" onClick={()=>{ this.suggestionClicked(document.getElementById("GuessedUser").value,document.getElementById("GuessedWeapon").value)}}>Make Suggestion</button>
			&nbsp;&nbsp;&nbsp;
			<button  name="acbtn"  id="acbtn" onClick={()=>{ this.accusationClicked(document.getElementById("GuessedUser").value,document.getElementById("GuessedWeapon").value)}}>Make Accusation</button>
			<br/>&nbsp;&nbsp;&nbsp;
		</span>
	</div>

</div>
<br/>
<button onClick={()=>{ this.ShowSuggestionWindow("This is the suggestion.")}}>Respond To Suggestion</button> {/*Testing*/}
	{/*Suggestion Response START*/}
		<div id="suggestionresponsediv" style={{position:"absolute",top:"0",left:"0",width:"100%",height:"150%","background-color":"grey",opacity: ".98","z-index": "1000", display : "none"}}>
		<br/><br/>
		<h2  name="suggestiondetail" id="suggestiondetail"></h2>
		    <select name="MyCardsType" id="MyCardsType" style={{margin:"10px",marginLeft:"0px"}} onChange={()=>{this.updateDisproveUI()}}>
			    <option value="-1" selected="selected">I don't have any of the suggested cards</option>
				<option value="0" >I have suggested Player card : </option>
				<option value="1">I have suggested Weapon card : </option>
				<option value="2">I have suggested Room card : </option>
			</select>
			<select name="ResponseUser" id="ResponseUser" style={{margin:"10px",marginLeft:"0px", display : "none"}}>
				<option value="scarlet" selected="selected">Miss Scarlet</option>
				<option value="green">Mr. Green</option>
				<option value="mustard">Colonel Mustard</option>
				<option value="plum">Prof. Plum</option>
				<option value="peacock">Mrs. Peacock</option>
				<option value="white">Mrs. White</option>
			</select>
			<select name="ResponseWeapon" id="ResponseWeapon" style={{margin:"10px", display : "none"}}>
				<option value="candlestick" selected="selected">candlestick</option>
				<option value="revolver">revolver</option>
				<option value="knife">knife</option>
				<option value="pipe">pipe</option>
				<option value="rope">rope</option>
				<option value="wrench">wrench</option>
			</select>
			<select name="ResponseRoom" id="ResponseRoom" style={{margin:"10px", display : "none"}}>
				<option value="Kitchen" selected="selected">Kitchen</option>
				<option value="Ballroom">Ballroom</option>
				<option value="Conservatory">Conservatory</option>
				<option value="Dining">Dining Room</option>
				<option value="Cellar">Cellar</option>
				<option value="Billiards">Billiards Room</option>
				<option value="Library">Library</option>
				<option value="Study">Study</option>
				<option value="Lounge">Lounge</option>
			</select>
			<button onClick={()=>{ this.sendSuggestionResponse()}}>Repond</button> 
			
		</div>
		{/*Suggestion Response START*/}
		
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
