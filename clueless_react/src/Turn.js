import React, { useEffect, useState } from "react";

class Turn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    var first = props.actions[0];
    var newTurn = state.turn;

    if (first != undefined) {
      if (first.message_type == 31 ) {
        newTurn = 'Movement'
      } else if ( first.message_type == 32 ) {
        newTurn = 'Suggestion'
      } else if ( first.message_type == 33 ) {
        newTurn = 'Disprove'
      } else if ( first.message_type == 34 ) {
        newTurn = 'Accusation'
      } else if ( first.message_type == 61 ) {
        newTurn = 'End of Game'
      } else {
        newTurn = 'Other Players Turn'
      }
    }
    return { turn: newTurn };
  }


  render() {
    return (
      <p>
        {this.state.turn}
      </p>
    );
  }
}

export default Turn;
