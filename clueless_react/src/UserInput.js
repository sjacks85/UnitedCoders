import React from "react";

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      response: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.makeSuggestion = this.makeSuggestion.bind(this); // Use when we have endpoints, and back end logic to work with.
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
    alert("Player action registered | " + this.state.value);

    // Added for demonstration purposes:
    console.log("User Input | " + this.state.value);
    this.parseMessage(this.state.value);
    event.preventDefault();
  }

  makeSuggestion() {
    const _this = this;
    let jsonBody = '{"Test":"Test"}';
    //console.log(jsonBody);
    fetch(
      "http://node-express-env.eba-m3dz2nxw.us-east-2.elasticbeanstalk.com/test",
      {
        method: "GET",
        withCredentials: true,
        //credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        //body: jsonBody,
      }
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log("Response: " + JSON.stringify(jsonResponse));
        _this.setState({
          response: JSON.stringify(jsonResponse),
        });
      });
    console.log("Response: " + this.state.response);
  }

  parseMessage(playerInput) {
    let parsedPlayerInput = playerInput.split(/\s+/);
    console.log("Last Action: " + parsedPlayerInput);

    // Can use to differentiate player actions for the back end.
    // Can place fetch in each block specific to the player action.
    if (parsedPlayerInput[0] === "Movement:") {
      alert("Player Moved to the " + parsedPlayerInput[1]);
    } else if (parsedPlayerInput[0] === "Suggestion:") {
      alert(
        "Player suggested that " +
          parsedPlayerInput[1] +
          " commited the murder in the " +
          parsedPlayerInput[2] +
          " using a " +
          parsedPlayerInput[3] +
          "!"
      );
    } else if (parsedPlayerInput[0] === "Accusation:") {
      alert(
        "Player accused " +
          parsedPlayerInput[1] +
          " of committing the murder in the " +
          parsedPlayerInput[2] +
          " using a " +
          parsedPlayerInput[3] +
          "!"
      );
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
        <div>Last Action Taken | {this.state.response}</div>
      </React.Fragment>
    );
  }
}
export default UserInput;
