import React from "react";
import './Gameboard.css';
import Gameboard_Players from "./Gameboard_Players";
import MapExample from "./MapExample";
import Search from "./Search";

import { subscribeToTimer, subscribeToMessage, subscribeToArray, subscribeToCards, subscribeToTurn,
  subscribeToMovement, subscribeToSuggestion, subscribeToDisprove, subscribeToAccusation, subscribeToGame } from './Api';


// class MessageBoard extends React.Component {

//   constructor(props) {
//     super(props);
//     subscribeToAllMessages((err, x) =>
//       this.setState({ array : x }));
//   }
//   state = {
//     array: []
//   };

// render() {
//   return (
//         <ul>
//         {this.state.array.map(elem => (
//           <li>{elem}</li>
//         ))}
//         </ul>
//   );
// }
// }

    // subscribeToCards((err, elem) =>
    //   this.updateArray('Cards info: ' + JSON.stringify(elem)));
    // subscribeToTurn((err, elem) =>
    //   this.updateArray('Turn request:' + elem));
    // subscribeToGame((err, elem) =>
    //   this.updateArray('Game message: ' + JSON.stringify(elem)));
    // subscribeToMovement((err, elem) =>
    //   this.updateArray('Movement request: ' + elem))
    // subscribeToSuggestion((err, elem) =>
    //   this.updateArray('Suggestion request: ' + elem))
    // subscribeToDisprove((err, elem) =>
    //   this.updateArray('Disprove request: ' + JSON.stringify(elem)))
    // subscribeToAccusation((err, elem) =>
    //   this.updateArray('Accustation request: ' + elem))


class Gameboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      actions: this.props.actions
    };
  }
  state = {
    actions: []
  };

render() {
  //console.log('MessageState:' + this.state.actions)
  //console.log('MessageProps:' + this.props.actions)

  return (
    <div>
      <MapExample actions={this.props.actions}/>
    <div>
      <Gameboard_Players />
      <Gameboard_Players />
    </div>
    </div>
  );

  // return (
  //   <div>
  //     <MapExample actions={this.props.actions}/>
  //   <div>
  //     <Gameboard_Players />
  //     <Gameboard_Players />
  //   </div>
  //   </div>
  // );
}
}

export default Gameboard;
