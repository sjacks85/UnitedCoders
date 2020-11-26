import React from "react";
import {
  makeMovement,
  makeSuggestion,
  makeAccusation,
  makeDisprove,
} from "./ClientManager";
import "./LoginPage.css";

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

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      character: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCharacter = this.handleCharacter.bind(this);
  }

  // handleChange(event) {
  //   this.setState({ value: event.target.value });
  // }

  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value,
    });
    //console.log(JSON.stringify(this.state));
  }

  handleCharacter(evt) {
    //console.log(evt.target.value);
    //console.log(typeof evt.target.value);
    this.setState({ character: Number(evt.target.value) });
    //console.log(JSON.stringify(this.state));
  }

  handleClick(evt) {
    console.log("CLICK=" + JSON.stringify(this.state));
    this.props.setUsername(this.state.username);
  }

  createSelectItems(type) {
    let items = uniqueIDs.map((item, i) => {
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

  render() {
    return (
      <div>
        <h4>Welcome!</h4>
        <label>
          Username
          <input
            className="logininput"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </label>
        <br></br>
        <label>
          Character
          <select
            className="loginselect"
            name="character"
            value={this.state.character}
            onChange={this.handleCharacter}
          >
            {this.createSelectItems("character")}
          </select>
        </label>
        <br></br>
        <button type="submit" onClick={this.handleClick}>
          Login
        </button>
      </div>
    );
  }
}

export default LoginPage;
