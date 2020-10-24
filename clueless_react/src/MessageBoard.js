import React from "react";
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

// export default MessageBoard;

class MessageBoard extends React.Component {

  constructor(props) {
    super(props);
    subscribeToCards((err, elem) =>
      this.updateArray('Cards info: ' + JSON.stringify(elem)));
    subscribeToTurn((err, elem) =>
      this.updateArray('Turn request:' + elem));
    subscribeToGame((err, elem) =>
      this.updateArray('Game message: ' + JSON.stringify(elem)));
    subscribeToMovement((err, elem) =>
      this.updateArray('Movement request: ' + elem))
    subscribeToSuggestion((err, elem) =>
      this.updateArray('Suggestion request: ' + elem))
    subscribeToDisprove((err, elem) =>
      this.updateArray('Disprove request: ' + JSON.stringify(elem)))
    subscribeToAccusation((err, elem) =>
      this.updateArray('Accustation request: ' + elem))
  }
  state = {
    array: []
  };

  updateArray(elem) {
    this.setState({ array : [elem, ...this.state.array] })
  }

render() {
  return (
        <ul>
        {this.state.array.map(elem => (
          <li>{elem}</li>
        ))}
        </ul>
  );
}
}

export default MessageBoard;
