import React from "react";
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

export class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: this.props.actions,
      turn: "",
      // Tracks current player location
      currentLocation: this.props.currentLocation,
    };

    this.noMovementClick = this.noMovementClick.bind(this);
    this.suggestionClicked = this.suggestionClicked.bind(this);
    this.accusationClicked = this.accusationClicked.bind(this);
  }

  createSelectItems(type) {
    let items =
      uniqueIDs.map((item, i) => {
        return (
          item.type == type &&
          <option key={i} value={i}>
            {item.name} {i}
          </option>
        );
      }, this);
    return items
  }

  onDropdownSelected(e) {
    console.log("THE VAL", e.target.value);
    console.log("THE VAL" + JSON.stringify(uniqueIDs[e.target.value]));
    //here you will see the current selected value of the select input
  }

  suggestionClicked(a, b) {
    var aindex = Number(a) + 1;
    var bindex = Number(b) + 1;

    console.log(a + " " + JSON.stringify(uniqueIDs[aindex])+ " " + b + " " + JSON.stringify(uniqueIDs[bindex]));

    //alert(JSON.stringify(this.state.grid[cx][cy]));
    //alert(this.state.grid[cx][cy].roomName);

    var roomName = "";
    switch (this.props.locationId) {
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
    var playerInput = "Your Suggestion: " + roomName + " " + a + " " + b;
    alert(playerInput);
    //this.setState({ inputs : [playerInput, ...this.state.inputs]})
    makeSuggestion(roomName, a, b);
  }

  accusationClicked(a, b) {
    var aindex = Number(a) + 1;
    var bindex = Number(b) + 1;

    console.log(a + " " + JSON.stringify(uniqueIDs[aindex])+ " " + b + " " + JSON.stringify(uniqueIDs[bindex]));
    //alert(a);
    //alert(b);
    //alert(JSON.stringify(this.state.grid[cx][cy]));
    //alert(this.state.grid[cx][cy].roomName);
    var roomName = "";
    switch (this.props.locationId) {
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

  noMovementClick() {
    makeMovement("false", [-1, -1]);
  }

  static getDerivedStateFromProps(props, state) {
    var newTurn = state.turn;
    var first = props.actions[0];

    if (first != undefined) {
      if (first.message_type == 31) {
        newTurn = "Movement";
      } else if (first.message_type == 32) {
        newTurn = "Suggestion";
      } else if (first.message_type == 33) {
        newTurn = "Disprove";
      } else if (first.message_type == 34) {
        newTurn = "Accusation";
      } else if (first.message_type == 61) {
        newTurn = "End of Game";
      } else {
        newTurn = "Other Players Turn";
      }
    }
    return { turn: newTurn };
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <select onChange={this.onDropdownSelected}> {this.createSelectItems("character")}</select>
        <select onChange={this.onDropdownSelected}> {this.createSelectItems("weapon")}</select>
        <select onChange={this.onDropdownSelected}> {this.createSelectItems("room")}</select>
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
                <option value="0" selected="selected">
                  Miss Scarlet
                </option>
                <option value="1">Mr. Green</option>
                <option value="2">Colonel Mustard</option>
                <option value="3">Prof. Plum</option>
                <option value="4">Mrs. Peacock</option>
                <option value="5">Mrs. White</option>
              </select>
              <select
                name="GuessedWeapon"
                id="GuessedWeapon"
                style={{ margin: "10px" }}
              >
                <option value="6" selected="selected">
                  Candlestick
                </option>
                <option value="7">Revolver</option>
                <option value="8">Knife</option>
                <option value="9">Pipe</option>
                <option value="10">Rope</option>
                <option value="11">Wrench</option>
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
          <p>{this.props.location}</p>
        </div>
      </div>
    );
  }
}

export default Box;
