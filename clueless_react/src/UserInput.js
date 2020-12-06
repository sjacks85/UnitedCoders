import React from "react";
import {
  makeMovement,
  makeSuggestion,
  makeAccusation,
  makeDisprove,
} from "./ClientManager";

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      response: "",
      inputs: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    if (this.state.value === "") {
      alert("Don't forget to type an action!");
      return;
    }

    // Notify User that their action was registered.
    let userInput = this.state.value;
    this.setState({ response: userInput });

    alert("User Input: " + this.state.value);
    //console.log("User Input: " + this.state.value);
    this.parseMessage(this.state.value);
    this.setState({
      value: "",
    });
    event.preventDefault();
  }

  parseMessage(playerInput) {
    let parsedPlayerInput = playerInput.split(/\s+/);

    // Can use to differentiate player actions for the back end.
    // Can place fetch in each block specific to the player action.
    if (parsedPlayerInput[0] === "Movement:") {
      this.setState({ inputs: [playerInput, ...this.state.inputs] });
      makeMovement(parsedPlayerInput[1], parsedPlayerInput[2]);
    } else if (parsedPlayerInput[0] === "Suggestion:") {
      this.setState({ inputs: [playerInput, ...this.state.inputs] });
      makeSuggestion(
        parsedPlayerInput[1],
        parsedPlayerInput[2],
        parsedPlayerInput[3]
      );
    } else if (parsedPlayerInput[0] === "Accusation:") {
      this.setState({ inputs: [playerInput, ...this.state.inputs] });
      makeAccusation(
        parsedPlayerInput[1],
        parsedPlayerInput[2],
        parsedPlayerInput[3],
        parsedPlayerInput[4]
      );
    } else if (parsedPlayerInput[0] === "Disprove:") {
      this.setState({ inputs: [playerInput, ...this.state.inputs] });
      makeDisprove(parsedPlayerInput[1], parsedPlayerInput[2]);
    } else {
      alert("This move isn't recognized.");
    }
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            size="50"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
        <p> </p>
        <div>
          <h4>Previous Inputs</h4>
          <ul>
            {this.state.inputs.map((elem) => (
              <li>{elem}</li>
            ))}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
export default UserInput;
