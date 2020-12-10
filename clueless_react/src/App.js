import React from "react";
import "./App.css";
import "./Divider.css";
import Divider from "./Divider";
import Gameboard from "./Gameboard";
import PlayerHand from "./PlayerHand";
import { startClient, socket } from "./ClientManager";
import NoteBook from "./NoteBook";
import MessageBoard from "./MessageBoard";
import Masthead from "./Masthead";
import LoginPage from "./LoginPage";
import Prompts from "./Prompts";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickShow = this.handleClickShow.bind(this);
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
    loggedIn: false,
    username: "",
    chatmessage: Object,
    setup_messages: [],
  };

  componentDidMount() {
    startClient(window.location.port);
    socket.on("game", (message) => {
      console.log("GameMessage" + JSON.stringify(message));

      this.setState({ actions: [message, ...this.state.actions] });
      var newTurn = this.state.turn;

      if (
        message.message_type == 1 ||
        message.message_type == 2 ||
        message.message_type == 3 ||
        message.message_type == 4 ||
        message.message_type == 5
      ) {
        this.setState({
          setup_messages: [message, ...this.state.setup_messages],
        });
      }

      if (message.message_type == 11) {
        if (message.message.username != undefined) {
          if (message.message.username != undefined) {
            if (message.message.username == this.state.username) {
              //console.log("APP: " + message.message.player_id)
              //console.log("APP: " + message.message.character)
              //console.log("APP: " + message.message.cards)
              this.setState({
                loggedIn: true,
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
          if (
            message.message.broadcast_message.indexOf("starting their turn") !=
            0
          ) {
            //console.log("FOUND");
            newTurn = "Other Players Turn";
          }
        } else {
          newTurn = "Other Players Turn";
        }
      }

      this.setState({ turn: newTurn });
    });

    // Broadcast Player Message/Chat from Server:
    socket.on("chat", (message) => {
      this.setState({ chatmessage: message.message });
      this.setState({ actions: [message, ...this.state.actions] });
    });
  }

  setUsername = (string) => {
    //console.log("LoginPage Callback=" + string);
    this.setState({ username: string });
    //console.log(JSON.stringify(this.state));
  };

  handleClickShow(evt) {
    //console.log("FAKE LOGIN")
    this.setState({ loggedIn: true });
  }

  render() {
    const imgsrc = "/Clue-Less-Title.png";
    let component = this.state.loggedIn ? (
      <div>
        <Masthead username={this.state.username} />
        <Prompts actions={this.state.actions} cards={this.state.cards} />
        <Gameboard
          actions={this.state.actions}
          player_id={this.state.player_id}
          character_id={this.state.character_id}
          username={this.state.username}
          cards={this.state.cards}
          turn={this.state.turn}
          changeCurrentLocationId={this.changeCurrentLocationId}
          changeCurrentRoom={this.changeCurrentRoom}
          chatmessage={this.state.chatmessage}
        />
      </div>
    ) : (
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <button type="submit" onClick={this.handleClickShow}>
          Show Gameboard
        </button>
        <br></br>
        <br></br>
        <LoginPage
          setup_messages={this.state.setup_messages}
          setUsername={this.setUsername}
        />
      </div>
    );

    return (
      <div className="App">
        {/* <img src={imgsrc} height="50" width="300" />
        <p>!{this.state.username}!</p> */}
        {component}
      </div>
    );
  }
}

export default App;
