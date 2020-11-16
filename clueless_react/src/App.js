import React from "react";
import "./App.css";
import "./Divider.css";
import Divider from "./Divider";
import Gameboard from "./Gameboard";
import PlayerHand from "./PlayerHand";
import { startClient, socket } from "./ClientManager";
import NoteBook from "./NoteBook";
import MessageBoard from "./MessageBoard";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    // Store in the App, and passed into children as props
    actions: [],
    player_id: 0,
    character_id: 0,
    cards: [],
    turn: "Other Players Turn",
    currentLocationId: 0,
    currentRoom: "",
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
                character_id: message.message.character_id,
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
            newTurn = "Revoked";
          }
        } else if (message.message_type == 61) {
          newTurn = "End of Game";
        } else if (message.message_type == 21) {
          if (message.message.broadcast_message.indexOf("starting their turn") != 0) {
            console.log("FOUND")
            newTurn = "Other Players Turn";
          }
        } 
        else {
          newTurn = "Other Players Turn";
        }
      }

      this.setState({ turn: newTurn });
    });
  }

  onselectTest = (string) => {
    //console.log("TESTCALLBACK" + string);
    //this.setState({language: langValue});
  };

  render() {
    const imgsrc = "/Clue-Less-Title.png";
    return (
      <div className="App">
        <br></br>
        <img src={imgsrc} height="50" width="300" />
        <Gameboard
                actions={this.state.actions}
                player_id={this.state.player_id}
                character_id={this.state.character_id}
                cards={this.state.cards}
                turn={this.state.turn}
                changeCurrentLocationId={this.changeCurrentLocationId}
                changeCurrentRoom={this.changeCurrentRoom}
                onSelectTest={this.onselectTest}
              />
      </div>
    );
  }
}

export default App;
