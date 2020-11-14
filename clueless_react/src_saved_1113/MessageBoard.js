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


class MessageBoard extends React.Component {

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
        <ul>
        {this.props.actions.map(elem => (
          <li>{JSON.stringify(elem)}</li>
        ))}
        </ul>
  );
}
}

export default MessageBoard;
