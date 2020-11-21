import React from "react";
import './Gameboard.css';
import Gameboard_Players from "./Gameboard_Players";

import { subscribeToTimer, subscribeToMessage, subscribeToArray, subscribeToCards, subscribeToTurn,
  subscribeToMovement, subscribeToSuggestion, subscribeToDisprove, subscribeToAccusation, subscribeToGame } from './Api';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      actions: this.props.actions,
      isToggleOn: true
    };
  }
  state = {
    actions: []
  };

  onClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

 // { showResults ? <StartDiv /> : <JoinDiv /> }

render() {
  return (
    <div id="joindiv" class="overlay"><button class="ajax-loader" onclick={this.onClick}>Join</button></div>
  );
}
}

export default Search;
