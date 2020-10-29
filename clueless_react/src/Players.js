import React, { useEffect, useState } from "react";
import { socket } from './ClientManager.js'

class Players extends React.Component {

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

render() {
  const temp = this.props.actions.filter(element => element.message_type == 11 && element.player_id == 0 )
  return (
            <ul>
            {temp.map(elem => (
              <li>player_id={JSON.stringify(elem.message.player_id)} username={JSON.stringify(elem.message.username)} character={JSON.stringify(elem.message.character)} cards={JSON.stringify(elem.message.cards)}</li>
            ))}
            </ul>
  );
}
}

export default Players;