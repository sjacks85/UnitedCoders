import React from 'react';
import './App.css';
import Divider from "./Divider";
import Greeting from "./Greeting";
import Gameboard from "./Gameboard";
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
    color: 'red'
  }

  componentDidMount() {
    startClient(window.location.port);
    socket.on('game', message => {
      console.log('GameMessage' + JSON.stringify(message))
      //console.log('AppBefore' + this.state.actions)
      this.setState({ actions : [message, ...this.state.actions] })
      //console.log('AppAfter' + this.state.actions)
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
      <div className="top">
      <p>Username = {window.location.port}</p>
        <Gameboard actions={this.state.actions} />
      </div>
      <div className="bottom">
        <Divider greeting={greeting} actions={this.state.actions} />
      </div>
    </div>
  );
}
}

export default App;
