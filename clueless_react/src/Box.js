import React from "react";
import {
  makeMovement,
  makeSuggestion,
  makeDisprove,
  makeAccusation,
} from "./ClientManager";
import "./Box.css";

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
      suggestion_cards: [],
      colorPalette: this.props.colorPalette,
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
    //console.log("THE VAL", e.target.value);
    //console.log("THE VAL" + JSON.stringify(uniqueIDs[e.target.value]));
    //here you will see the current selected value of the select input
  }

  static getDerivedStateFromProps(props, state) {
    //console.log("CARDS " + JSON.stringify(state.playerCards));
    var newColorPalette = props.colorPalette;
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
    var newsuggestioncards = state.suggestion_cards;
    if (first != undefined) {
      if (first.message_type == 33) {
        newsuggestioncards = [
          Number(first.message.suggested_character),
          Number(first.message.suggested_room),
          Number(first.message.suggested_weapon),
        ];
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
      suggestion_cards: newsuggestioncards,
      colorPalette: newColorPalette,
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

    if (this.props.currentRoom == "Hallway" || this.props.currentRoom == "") {
      alert("You need to be in a room to make an suggestion!");
      return;
    }
    var playerInput =
      "You made the following suggestion: " +
      this.props.currentRoom +
      ", " +
      uniqueIDs[a].name +
      ", " +
      uniqueIDs[b].name;
    alert(playerInput);
    makeSuggestion(this.props.currentLocId, a, b);
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

    var playerInput =
      "You made the following accusation: " +
      uniqueIDs[a].name +
      ", " +
      uniqueIDs[b].name +
      ", " +
      uniqueIDs[c].name;

    alert(playerInput);

    makeAccusation("true", Number(c), Number(a), Number(b));
  }

  noMovementClick() {
    makeMovement("false", -1);
  }

  noSuggestionClick() {
    makeSuggestion(0, 7, 15);
  }

  noAccusationClick() {
    this.setState({ turn: "Other Player's Turn" });
    makeAccusation("false", -1, -1, -1);
  }

  sayHello() {
    //console.log("Sayhello");
    alert("Hello!");
  }

  // Suggestion Response Functions Starts
  ShowSuggestionWindow(suggestionTxt) {
    document.getElementById("MyCardsType").selectedIndex = "0";
    document.getElementById(
      "suggestiondetail"
    ).innerHTML = this.state.suggestion;
    document.getElementById("showsuggestion").style.display = "none";
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
      makeDisprove("false", -1);
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
      var selected = Number(selectedvalue);
      if (this.state.suggestion_cards.includes(selected)) {
        console.log("VALID DISPROVE");
        makeDisprove(true, selectedvalue);
      } else {
        alert(
          "Whoops the " +
            uniqueIDs[selected].name +
            " is not a valid card to disprove. Try again!"
        );
      }
    }
    document.getElementById("suggestionresponsediv").style.display = "none";
  }

  displayMovement() {
    return (
      <div>
        <p>Click gameboard to move!</p>
        {this.props.show_nomove ? (
          <div>
            No movement needed:{" "}
            <button
              style={{ backgroundColor: this.state.colorPalette[0] }}
              onClick={this.noMovementClick}
            >
              No Movement
            </button>{" "}
          </div>
        ) : null}
      </div>
    );
  }
  displaySuggestion() {
    return (
      <div class="inlineTurnActions">
        <select name="GuessedUser" id="GuessedUser">
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
          style={{ backgroundColor: this.state.colorPalette[0] }}
          onClick={() => {
            this.suggestionClicked(
              document.getElementById("GuessedUser").value,
              document.getElementById("GuessedWeapon").value
            );
          }}
        >
          Make Suggestion
        </button>
        {/* <button onClick={this.noSuggestionClick}>(DELETE FOR DEMO) No Suggestion</button> */}
      </div>
    );
  }
  displayDisprove() {
    return (
      <div class="inlineTurnActions">
        <span
          id="showsuggestion"
          style={{ fontSize: "12px" }}
          onClick={() => {
            this.ShowSuggestionWindow("This is the suggestion.");
          }}
        >
          &nbsp; (Show Suggestion)
        </span>
        <div id="suggestionresponsediv" class="box">
          <span
            name="suggestiondetail"
            id="suggestiondetail"
            class="suggestiondetail"
          ></span>
          <select
            name="MyCardsType"
            id="MyCardsType"
            style={{ margin: "10px", marginLeft: "0px" }}
            onChange={() => {
              this.updateDisproveUI();
            }}
          >
            <option value="-1" selected="selected">
              No cards to disprove
            </option>
            <option value="0">Character Cards</option>
            <option value="1">Weapon Cards</option>
            <option value="2">Room Cards</option>
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
            style={{ backgroundColor: this.state.colorPalette[0] }}
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
      <div class="inlineTurnActions">
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
        <select name="GuessedRoom" id="GuessedRoom" style={{ margin: "10px" }}>
          {this.createSelectItems("room")}
        </select>
        <br />
        &nbsp;&nbsp;&nbsp;
        <button
          name="acbtn"
          id="acbtn"
          style={{ backgroundColor: this.state.colorPalette[0] }}
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
        <button
          style={{ backgroundColor: this.state.colorPalette[0] }}
          onClick={this.noAccusationClick}
        >
          No Accusation
        </button>
      </div>
    );
  }

  render() {
    return (
      <div class="boxWrapper">
        <span
          class="boxHeader"
          style={{ backgroundColor: this.state.colorPalette[0] }}
        >
          <span class="title">Game Turn Actions</span>
        </span>
        <div
          class="boxBody"
          style={{
            backgroundColor: this.state.colorPalette[0] + "cb",
            borderColor: this.state.colorPalette[0],
          }}
        >
          <div class="boxInnerBody">
            <b>Turn: </b>
            {this.props.turn}
            {this.props.turn == "Movement" && this.displayMovement()}
            {this.props.turn == "Suggestion" && this.displaySuggestion()}
            {this.props.turn == "Disprove" && this.displayDisprove()}
            {this.props.turn == "Accusation" && this.displayAccusation()}
          </div>
        </div>
        <span
          class="boxFooter"
          style={{ backgroundColor: this.state.colorPalette[0] }}
        ></span>
      </div>
    );
  }
}

export default Box;
