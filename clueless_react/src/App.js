import React from "react";
import "./App.css";
import Divider from "./Divider";
import Gameboard from "./Gameboard";
import { startClient, socket } from "./ClientManager";
import NoteBook from "./NoteBook";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    // Store in the App, and passed into children as props
    actions: [],
    player_id: 0,
    character: "",
    cards: {},
  };

  componentDidMount() {
    startClient(window.location.port);
    socket.on("game", (message) => {
      console.log("GameMessage" + JSON.stringify(message));

      this.setState({ actions: [message, ...this.state.actions] });
      if (message.message_type == 11)
        if (message.message.username != undefined)
          if (message.message.username != undefined)
            if (message.message.username == window.location.port) {
              this.setState({
                player_id: message.message.player_id,
                character: message.message.character,
                cards: message.message.cards,
              });
            }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="bottom">
          <h1>Gameboard</h1>
          <p>Username = {window.location.port}</p>
          <NoteBook></NoteBook>
          <Gameboard
            actions={this.state.actions}
            player_id={"P" + this.state.player_id}
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
