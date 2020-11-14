import React from "react";
import './Gameboard.css';
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


class Gameboard_Players extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      actions: this.props.actions
    };
  }
  state = {
    actions: []
  };

  // updateArray(elem) {
  //   this.setState({ actions : [elem, ...this.state.actions] })
  // }

render() {
  //console.log('MessageState:' + this.state.actions)
  //console.log('MessageProps:' + this.props.actions)

  return (

<div class="mystyle">
    <select name="CurrentUsersn" id="CurrentUsers">
        <option value="P1">Miss Scarlet</option>
        <option value="P2">Mr. Green</option>
        <option value="P3">Colonel Mustard</option>
        <option value="P4">Prof. Plum</option>
        <option value="P5">Mrs. Peacock</option>
        <option value="P6">Mrs. White</option>
        <option value="P7">Test</option>
    </select>
    <button onclick="SetUser(document.getElementById('CurrentUsers').value);">SET</button>
</div>

  );
}
}

export default Gameboard_Players;
