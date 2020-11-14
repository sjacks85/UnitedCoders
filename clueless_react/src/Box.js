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

export class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: this.props.actions,
      turn: '',
      // Tracks current player location
      currentLocation: this.props.currentLocation,
    };

    this.noMovementClick = this.noMovementClick.bind(this);
    this.suggestionClicked = this.suggestionClicked.bind(this);
    this.accusationClicked = this.accusationClicked.bind(this);

  }

  suggestionClicked(a, b) {
    //alert(a);
    //alert(b);
    const cx = this.state.locations[this.props.player_id].currentX;
    const cy = this.state.locations[this.props.player_id].currentY;
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
    const cx = this.state.locations[this.props.player_id].currentX;
    const cy = this.state.locations[this.props.player_id].currentY;
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
      </div>
    );
  }
}

export default Box;
