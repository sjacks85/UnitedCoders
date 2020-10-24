import React, { useState } from "react";
import './Divider.css';
import UserInput from './UserInput';
import Message from './Message';
import Cards from './Cards';
import Log from './Log';
import { addLog } from './Log';
import NumberList from './NumberList'
import MessageBoard from "./MessageBoard";

  let array = [];
  function Stubbed_Messages() {

    array.unshift({ type: 'broadcast', message: 'Plum turn'})
    array.unshift({ type: 'broadcast', message: 'Plum move = hallway'})
    array.unshift({ type: 'broadcast', message: 'Plum suggestion = white, study, candlestick'})
    array.unshift({ type: 'broadcast', message: 'Scarlet turn'})
    array.unshift({ type: 'target', message: 'Your turn'})
    array.unshift({ type: 'respond', message: 'Move?'})
    array.unshift({ type: 'broadcast', message: 'Scarlet move = Library'})
    array.unshift({ type: 'respond', message: 'Suggestion?'})

    return (
      <div>
        {array.map(elem => (
          <p>{elem.type}: {elem.message}</p>
        ))}
      </div>
    );
  }

//   <div class="float-child">
//   <div class="green">
//     <h4>Message Board (new messages at top)</h4>
//     {/* LOAD OR UNLOAD THE CLIENT */}
//   <button onClick={() => setLoadClient(prevState => !prevState)}>
//     STOP CLIENT
//   </button>
//   {/* SOCKET IO CLIENT*/}
//   {loadClient ? <Message /> : null}
//     <p>----------</p>
//     <Log />
//   </div>
// </div>

// Last Message <br></br>
// ---------------
// <Message />

// <NumberList numbers={numbers} />
const numbers = [1, 2, 3, 4, 5];

function Divider() {

  return (
    <div class="float-container">

    <div class="float-child">
      <div class="green">
       <p>Cards <br></br>
       -----------
       <Cards />
       <br></br>
        Message Board <br></br>
          ---------------
       <MessageBoard />
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

  );
}

export default Divider;