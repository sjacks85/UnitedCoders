import React from 'react';
import './App.css';
import Divider from "./Divider";
import Greeting from "./Greeting";
import { startClient, socket } from './ClientManager';
import { subscribeToGame } from './Api';

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

render() {
  const greeting = 'Welcome to React';

  return (
    <div className="App">
      <header className="App-header">
        <p>PORT={window.location.port}</p>
        <img src="game_board_small.png" />
        <p></p>
      </header>
      <Greeting greeting={greeting} />
       <Divider greeting={greeting} actions={this.state.actions} />
    </div>
  );
}
}

export default App;
