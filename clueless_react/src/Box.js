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

var startHand = [
  { type: "character", name: "Miss Scarlet", assigned: false },
  { type: "character", name: "Mr. Green", assigned: false },
  { type: "character", name: "Colonel Mustard", assigned: false },
  { type: "character", name: "Prof. Plum", assigned: false },
  { type: "character", name: "Mrs. Peacock", assigned: false },
  { type: "character", name: "Mrs. White", assigned: false },
  { type: "weapon", name: "Candlestick", assigned: false },
  { type: "weapon", name: "Revolver", assigned: false },
  { type: "weapon", name: "Knife", assigned: false },
  { type: "weapon", name: "Pipe", assigned: false },
  { type: "weapon", name: "Rope", assigned: false },
  { type: "weapon", name: "Wrench", assigned: false },
  { type: "room", name: "Study", assigned: false },
  { type: "room", name: "Hall", assigned: false },
  { type: "room", name: "Lounge", assigned: false },
  { type: "room", name: "Dinning", assigned: false },
  { type: "room", name: "Billiard", assigned: false },
  { type: "room", name: "Library", assigned: false },
  { type: "room", name: "Conservatory", assigned: false },
  { type: "room", name: "Ballroom", assigned: false },
  { type: "room", name: "Kitchen", assigned: false },
];

export class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: this.props.actions,
      assignedCards: false,
      playerHand: startHand,
      turn: this.props.turn,
      // Tracks current player location
      currentLocation: this.props.currentLocation,
      suggestion: "",
    };

    this.suggestionClicked = this.suggestionClicked.bind(this);
    this.accusationClicked = this.accusationClicked.bind(this);
    this.noMovementClick = this.noMovementClick.bind(this);
    this.noSuggestionClick = this.noSuggestionClick.bind(this);
    this.noAccusationClick = this.noAccusationClick.bind(this);
    this.sayHello = this.sayHello.bind(this);
    this.displayMovement = this.displayMovement.bind(this);
  }

  createSelectItems(type) {
    let items = this.state.playerHand.map((item, i) => {
      return (
        item.type == type && (
          <option key={i} value={i}>
            {item.name}
          </option>
        )
      );
    }, this);
    return items;
  }

  createSelectAssignItems(type) {
    let items = this.state.playerHand.map((item, i) => {
      return (
        item.type == type &&
        item.assigned == true && (
          <option key={i} value={i}>
            {item.name}
          </option>
        )
      );
    }, this);
    return items;
  }

  onDropdownSelected(e) {
    console.log("THE VAL", e.target.value);
    console.log("THE VAL" + JSON.stringify(uniqueIDs[e.target.value]));
    //here you will see the current selected value of the select input
  }

  static getDerivedStateFromProps(props, state) {
    //console.log("CARDS " + JSON.stringify(state.playerCards));
    var newassignedCards = state.assignedCards;
    var newplayerHand = state.playerHand;

    //console.log("CARDS " + state.assignedCards);
    //console.log("CARDS " + props.cards + " " + props.cards.length);
    if (state.assignedCards == false && props.cards.length != 0) {
      // console.log("ASSIGNMENT");
      var i;
      for (i = 0; i < props.cards.length; i++) {
        var index = Number(props.cards[i]);
        newplayerHand[index].assigned = true;
        //console.log("CARD " + props.cards[i])
      }

      newassignedCards = true;
    }

    var first = props.actions[0];
    var newSuggestion = state.suggestion;
    if (first != undefined) {
      if (first.message_type == 33) {
        newSuggestion =
          "Suggestion: " +
          uniqueIDs[first.message.suggested_character].name +
          ", " +
          uniqueIDs[first.message.suggested_room].name +
          ", " +
          uniqueIDs[first.message.suggested_weapon].name;
        console.log("DISPROVE " + newSuggestion);
      }
    }

    return {
      assignedCards: newassignedCards,
      playerHand: newplayerHand,
      suggestion: newSuggestion,
    };
  }

  suggestionClicked(a, b) {
    var aindex = Number(a);
    var bindex = Number(b);

    console.log(
      a +
        " " +
        JSON.stringify(uniqueIDs[aindex]) +
        " " +
        b +
        " " +
        JSON.stringify(uniqueIDs[bindex])
    );

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
        roomName = "lounge";
        break;
      case "33":
        roomName = "study";
        break;
      default:
        alert("You need to be in a room!");
        break;
    }
    if (roomName == "") return;
    var playerInput = "Your Suggestion: " + roomName + " " + a + " " + b;
    alert(playerInput);
    makeSuggestion("true", roomName, a, b);
  }

  accusationClicked(a, b, c) {
    var aindex = Number(a);
    var bindex = Number(b);
    var cindex = Number(c);

    console.log(
      a +
        " " +
        JSON.stringify(uniqueIDs[aindex]) +
        " " +
        b +
        " " +
        JSON.stringify(uniqueIDs[bindex]) +
        c +
        " " +
        JSON.stringify(uniqueIDs[cindex])
    );
    //alert(a);
    //alert(b);
    //alert(JSON.stringify(this.state.grid[cx][cy]));
    //alert(this.state.grid[cx][cy].roomName);
    var playerInput = "Your Accusation : " + a + " " + b + " " + c;
    alert(playerInput);
    //this.setState({ inputs : [playerInput, ...this.state.inputs]})
    makeAccusation("true", c, a, b);
  }

  noMovementClick() {
    console.log("noMovmentClick");
    makeMovement("false", -1);
  }

  noSuggestionClick() {
    console.log("noSuggestionClick");
    //Random suggestion to keep game going
    makeSuggestion(0, 7, 15);
  }

  noAccusationClick() {
    console.log("noAccusationClick");
    makeAccusation("false", -1, -1, -1);
  }

  sayHello() {
    console.log("Sayhello");
    alert("Hello!");
  }

  // Suggestion Response Functions Starts
  ShowSuggestionWindow(suggestionTxt) {
    document.getElementById("MyCardsType").selectedIndex = "0";
    //document.getElementById("suggestiondetail").innerHTML = suggestionTxt;
    document.getElementById(
      "suggestiondetail"
    ).innerHTML = this.state.suggestion;
    this.updateDisproveUI();
    document.getElementById("suggestionresponsediv").style.display = "";
  }

  updateDisproveUI() {
    var mtVal = document.getElementById("MyCardsType").value;
    if (mtVal == "-1") {
      document.getElementById("ResponseUser").style.display = "none";
      document.getElementById("ResponseWeapon").style.display = "none";
      document.getElementById("ResponseRoom").style.display = "none";
    }
    if (mtVal == "0") {
      document.getElementById("ResponseUser").style.display = "";
      document.getElementById("ResponseWeapon").style.display = "none";
      document.getElementById("ResponseRoom").style.display = "none";
    }
    if (mtVal == "1") {
      document.getElementById("ResponseUser").style.display = "none";
      document.getElementById("ResponseWeapon").style.display = "";
      document.getElementById("ResponseRoom").style.display = "none";
    }
    if (mtVal == "2") {
      document.getElementById("ResponseUser").style.display = "none";
      document.getElementById("ResponseWeapon").style.display = "none";
      document.getElementById("ResponseRoom").style.display = "";
    }
  }

  sendSuggestionResponse() {
    var mtVal = document.getElementById("MyCardsType").value;
    var selectedvalue = -1;
    if (mtVal == "-1") {
      // Send Socket Response that this user doesn't have any of the suggested items.
      makeDisprove(false, -1);
    } else {
      if (mtVal == "0") {
        selectedvalue = document.getElementById("ResponseUser").value;
        // Send Socket Response that this user has the suggested user (user id is in selectedvalue).
      }
      if (mtVal == "1") {
        selectedvalue = document.getElementById("ResponseWeapon").value;
        // Send Socket Response that this user has the suggested Weapon (Weapon id is in selectedvalue).
      }
      if (mtVal == "2") {
        selectedvalue = document.getElementById("ResponseRoom").value;
        // Send Socket Response that this user has the suggested Room (Room id is in selectedvalue).
      }
      makeDisprove(true, selectedvalue);
    }
    document.getElementById("suggestionresponsediv").style.display = "none";
    //alert(selectedvalue);
  }

  displayMovement() {
    return (
      <div>
        <p>Click gameboard to move!</p>
        <button onClick={this.noMovementClick}>No Movement</button>
      </div>
    )
  }
  displaySuggestion() {
    return (
      <div>
        <select
          name="GuessedUser"
          id="GuessedUser"
          style={{ margin: "10px", marginLeft: "0px" }}
        >
          {this.createSelectItems("character")}
        </select>
        <select
          name="GuessedWeapon"
          id="GuessedWeapon"
          style={{ margin: "10px" }}
        >
          {this.createSelectItems("weapon")}
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
        <button onClick={this.noSuggestionClick}>(DELETE FOR DEMO) No Suggestion</button>
      </div>
    );
  }
  displayDisprove() {
    return (
      <div>
        <button
          onClick={() => {
            this.ShowSuggestionWindow("This is the suggestion.");
          }}
        >
          Disprove
        </button>{" "}
        <div
          id="suggestionresponsediv"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            "background-color": "grey",
            opacity: ".98",
            "z-index": "1000",
            display: "none",
          }}
        >
          <h2 name="suggestiondetail" id="suggestiondetail"></h2>
          <select
            name="MyCardsType"
            id="MyCardsType"
            style={{ margin: "10px", marginLeft: "0px" }}
            onChange={() => {
              this.updateDisproveUI();
            }}
          >
            <option value="-1" selected="selected">
              I don't have any of the suggested cards
            </option>
            <option value="0">I have suggested Player card : </option>
            <option value="1">I have suggested Weapon card : </option>
            <option value="2">I have suggested Room card : </option>
          </select>
          <select
            name="ResponseUser"
            id="ResponseUser"
            style={{ margin: "10px", marginLeft: "0px", display: "none" }}
          >
            {this.createSelectAssignItems("character")}
          </select>
          <select
            name="ResponseWeapon"
            id="ResponseWeapon"
            style={{ margin: "10px", display: "none" }}
          >
            {this.createSelectAssignItems("weapon")}
          </select>
          <select
            name="ResponseRoom"
            id="ResponseRoom"
            style={{ margin: "10px", display: "none" }}
          >
            {this.createSelectAssignItems("room")}
          </select>
          <button
            onClick={() => {
              this.sendSuggestionResponse();
            }}
          >
            Disprove
          </button>
        </div>
      </div>
    );
  }
  displayAccusation() {
    return (
      <div>
        <select
          name="GuessedUser"
          id="GuessedUser"
          style={{ margin: "10px", marginLeft: "0px" }}
        >
          {this.createSelectItems("character")}
        </select>
        <select
          name="GuessedWeapon"
          id="GuessedWeapon"
          style={{ margin: "10px" }}
        >
          {this.createSelectItems("weapon")}
        </select>
        <select
          name="GuessedRoom"
          id="GuessedRoom"
          style={{ margin: "10px" }}
        >
          {this.createSelectItems("room")}
        </select>
        <br />
        &nbsp;&nbsp;&nbsp;
        <button
          name="acbtn"
          id="acbtn"
          onClick={() => {
            this.accusationClicked(
              document.getElementById("GuessedUser").value,
              document.getElementById("GuessedWeapon").value,
              document.getElementById("GuessedRoom").value
            );
          }}
        >
          Make Accusation
        </button>
        <button onClick={this.noAccusationClick}>No Accusation</button>
      </div>
    );
  }

  render() {
    return (
      <div
      style={{
        textAlign: "center",
        width: "500px",
        height: "150px",
        "border-width": "5px",
        "border-color": "red",
        "border-style": "outset",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <span>
        <h3>Turn: {this.props.turn}</h3>
        {this.props.turn == "Movement" && this.displayMovement()}
        {this.props.turn == "Suggestion" && this.displaySuggestion()}
        {this.props.turn == "Disprove" && this.displayDisprove()}
        {this.props.turn == "Accusation" && this.displayAccusation()}
      </span>
    </div>
    );
  }
}

export default Box;
