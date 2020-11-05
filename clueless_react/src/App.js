import React from 'react';
import './App.css';
import Divider from "./Divider";
import Greeting from "./Greeting";
import Gameboard from "./Gameboard";
import TicTac from "./TicTac";
import { startClient, socket } from './ClientManager';
import { subscribeToGame } from './Api';
import MapExample from './MapExample';

class App extends React.Component {

  constructor(props) {
    super(props);
      // subscribeToGame((err, elem) =>
      // this.updateArray(elem));
  }

  state = {
    currentAction: '',
    // Store in the App, and passed into children as props
    actions: [],
    color: 'red', 
    player_id: 0,
    character: "",
    cards: {},
  }

  componentDidMount() {
    startClient(window.location.port);
    socket.on('game', message => {
      console.log('GameMessage' + JSON.stringify(message))
      //console.log('AppBefore' + this.state.actions)
      this.setState({ actions : [message, ...this.state.actions] })
      if (message.message_type == 11)
        if (message.message.username != undefined)
          //console.log("User message" + message.message.username + " " + window.location.port)
          if (message.message.username != undefined)
          if (message.message.username == window.location.port) {
            //console.log("APP: found 11 " + message.message.username + ' ' + message.message.player_id)
           //alert(JSON.stringify(message))
            this.setState(
              {player_id: message.message.player_id, 
               character: message.message.character,
               cards: message.message.cards})
            //console.log("APP: state " + this.state.player_id)
          }
            //console.log('Found user message' + JSON.stringify(message))
            //console.log('Found user message state' + JSON.stringify(this.state))
  });
  }

  // updateArray(elem) {
  //   this.setState({ actions : [elem, ...this.state.actions] })
  //   this.setState({ currentAction: elem })
  //   console.log("UPDATEARRAY: " + elem)
  // }

  // <p></p>
  // <img src="game_board_small.png" />
  //<img src="/gameboard/GBG.png" />

render() {
  const greeting = 'Welcome to React';
  //<Greeting greeting={greeting} />

  return (
    <div className="App">
      <div className="bottom">
        <h1>Gameboard</h1>
        <p>Username = {window.location.port}</p>
        <TicTac actions={this.state.actions} player_id={"P" + this.state.player_id}/>
      </div>
      <div className="bottom">
        <Divider greeting={greeting} actions={this.state.actions} />
      </div>
    </div>
  );
}
}

export default App;
