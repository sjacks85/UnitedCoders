import React from "react";
import "./App.css";
import Divider from "./Divider";
import Gameboard from "./Gameboard";
import FlavorForm from "./FlavorForm";
import { startClient, socket } from "./ClientManager";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    // Store in the App, and passed into children as props
    actions: [],
    player_id: 0,
    character: 0,
    cards: [],
    turn: "Waiting For Other Players Turn",
  };

  componentDidMount() {
    startClient(window.location.port);
    socket.on("game", (message) => {
      console.log("GameMessage" + JSON.stringify(message));

      this.setState({ actions: [message, ...this.state.actions] });
      var newTurn = this.state.turn;

      if (message.message_type == 11) {
        if (message.message.username != undefined) {
          if (message.message.username != undefined) {
            if (message.message.username == window.location.port) {
              //console.log("APP: " + message.message.player_id)
              //console.log("APP: " + message.message.character)
              //console.log("APP: " + message.message.cards)
              this.setState({
                player_id: message.message.player_id,
                character: message.message.character,
                cards: message.message.cards,
              });
            }
          }
        }
      }

      if (newTurn != "Revoked") {
        if (message.message_type == 31) {
          newTurn = "Movement";
        } else if (message.message_type == 32) {
          newTurn = "Suggestion";
        } else if (message.message_type == 33) {
          newTurn = "Disprove";
        } else if (message.message_type == 34) {
          newTurn = "Accusation";
        } else if (message.message_type == 52) {
          //Does 52 need to be send to everyone? To update their notecard
          if (message.message.accusation_correct === false) {
            newTurn = "Revoked"
          }
        } else if (message.message_type == 61) {
          newTurn = "End of Game";
        } else {
          newTurn = "Other Players Turn";
        }
      }

      this.setState({ turn: newTurn });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="bottom">
          <h1>Gameboard</h1>
          <p>Username = {window.location.port}</p>
          <Gameboard
            actions={this.state.actions}
            player_id={this.state.player_id}
            character={this.state.character}
            cards={this.state.cards}
            turn={this.state.turn}
          />
        </div>
        <div className="bottom">
          <Divider actions={this.state.actions} />
        </div>
      </div>
    );
  }
}

export default App;
