import React, { useState } from "react";
import './Divider.css';
import UserInput from './UserInput';
import Message from './Message';
import Greeting from './Greeting';
import Cards from './Cards';
import Log from './Log';
import { addLog } from './Log';
import NumberList from './NumberList'
import MessageBoard from "./MessageBoard";

//import React from 'react';

class Divider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: this.props.actions
    };
  }
  state = {
    string: this.props.greeting + 'kaath',
    actions: []
  }

  render() {
    //console.log('DividerState:' + this.state.actions)
    //console.log('DividerProps:' + this.props.actions)

    return (
      <div class="float-container">
      <div class="float-child">
        <div class="green">
        <h1>{this.props.greeting}</h1>
        <Greeting greeting={this.state.string} />
         <p>Players <br></br>
         -----------
         <Cards actions={this.props.actions}/>
         <br></br>
          Message Board <br></br>
            ---------------
         <MessageBoard actions={this.props.actions} />
         </p>
        </div>
      </div>
      <div class="float-child">
        <div class="blue">
        <h4>Game Info</h4>
        <p>
        Characters: plum, scarlet, mustard, white, green, peacock<br></br>
        Rooms: study, hall, lounge, dinning, billiard, library, conservatory, ballroom, kitchen<br></br>
        Weapons: candlestick, revolver, knife, pipe, rope, wrench<br></br>
        <br></br>
        Movement: yes/no, [hallway, room, secret]<br></br>
        Suggestion: character, room, weapon<br></br>
        Accusation: yes/no, [character, room, weapon]<br></br>
        Disprove: yes/no, card<br></br>
          </p>
         <h4>User Input</h4>
        <UserInput />
        </div>
      </div>
      </div>
    )
  }
}

export default Divider;

// // function Divider() {
  
//   return (
//     <div class="float-container">

//     <div class="float-child">
//       <div class="green">
//        <p>Cards <br></br>
//        -----------
//        <Cards />
//        <br></br>
//         Message Board <br></br>
//           ---------------
//        <MessageBoard />
//        </p>
//       </div>
//     </div>

    
//     <div class="float-child">
//       <div class="blue">
//       <h4>Game Info</h4>
//       <p>
//       Characters: plum, scarlet, mustard, white, green, peacock<br></br>
//       Rooms: study, hall, lounge, dinning, billiard, library, conservatory, ballroom, kitchen<br></br>
//       Weapons: candlestick, revolver, knife, pipe, rope, wrench<br></br>
//       <br></br>
//       Movement: yes/no, [hallway, room, secret]<br></br>
//       Suggestion: character, room, weapon<br></br>
//       Accusation: yes/no, [character, room, weapon]<br></br>
//       Disprove: yes/no, card<br></br>
//         </p>
//        <h4>User Input</h4>
//       <UserInput />
//       </div>
//     </div>
    
//     </div>

//   );
// }

// export default Divider;