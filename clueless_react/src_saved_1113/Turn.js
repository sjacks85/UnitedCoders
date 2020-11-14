import React, { useEffect, useState } from "react";
import { socket } from './ClientManager.js'

class Turn extends React.Component {

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

  checkNested(obj /*, level1, level2, ... levelN*/ ) {
    let args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < args.length; i++) {
      if (!obj || !obj.hasOwnProperty(args[i])) {
        return false;
      }
      obj = obj[args[i]];
    }
    return true;
  }
  //this.checkNested(element, 'cards')
  // + JSON.stringify(elem.message.username) 
  // + " " + JSON.stringify(elem.message.character) 
  // + " " + JSON.stringify(elem.message.cards) }</li>

  findTurn(array) {
    // if (first.message_type == 31 || first.message_type == 32 || first.message_type == 33 ||
    //   first.message_type == 34) {
    //     return true;
    //   }
    
    const first = array[0];
    //console.log('Turn First' + JSON.stringify(first));
    if (first != undefined) {
      //console.log('Turn return true')
      return first.message_type == 31 || first.message_type == 32 || first.message_type == 33 || first.message_type == 34 || first.message_type == 61;
    }
    //console.log('Turn return false')
    return false;
    // console.log("TurnUN: " + array == undefined)
    // console.log("Turn: " + JSON.stringify(array))
    // console.log("Turn: " + JSON.stringify(array[0]))
    // console.log("Turn: " + JSON.stringify(first))
    // console.log("Turn: " + first.message_type == 31)
    // console.log("Turn: " + array[0].message_type == 31)
  }
  //<p>{turn ? this.displayTurn(this.props.actions) : 'Other Players Turn'}</p>

  displayTurn(array) {
    const first = array[0];
    if (first == undefined) {
      return ''
    } else if ( first.message_type == 31 ) {
      return 'Movement'
    } else if ( first.message_type == 32 ) {
      return 'Suggestion'
    } else if ( first.message_type == 33 ) {
      return 'Disprove'
    } else if ( first.message_type == 34 ) {
      return 'Accusation'
    } else if ( first.message_type == 61 ) {
      return 'End of Game'
    } else {
      return 'Other Players Turn'
    }
  }

render() {
  var temp = []
  var test = [{"game_id":0,"player_id":0,"message_type":11,"message":{"username":"3000","player_id":3,"character":"Mr. Green","cards":["Mr. Green","Candlestick","Conservatory"]}}]
  //var turn = this.findTurn(this.props.actions);

  return (
          <p>{this.displayTurn(this.props.actions)}</p>
  );
}
}

export default Turn;
