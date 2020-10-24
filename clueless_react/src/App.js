import React from 'react';
import './App.css';
import Divider from "./Divider";
import { startClient } from './ClientManager';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    startClient(window.location.port)
  }

render() {
  return (
    <div className="App">
      <header className="App-header">
        <p>PORT={window.location.port}</p>
        <img src="game_board_small.png" />
        <p></p>
      </header>
       <Divider />
    </div>
  );
}
}

export default App;
