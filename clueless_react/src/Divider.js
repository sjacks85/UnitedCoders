import React from 'react';
import './Divider.css';
import UserInput from './UserInput';
import Message from './Message';

  function Stubbed_Messages() {

    let array = [];

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

function Divider() {
  return (
    <div class="float-container">

    <div class="float-child">
      <div class="green">
        <h4>Message Board (new messages at top)</h4>
        <Message />
        <p>----------</p>
        <Stubbed_Messages />
      </div>
    </div>

    
    <div class="float-child">
      <div class="blue">
      <h4>Game Info</h4>
      <p>
      Characters: plum, scarlet, mustard, white, green, peacock<br></br>
      Rooms: study, hall, lounge, dinning, billiard, library, conservatory, ballroom, kitchen<br></br>
      Weapons: candlestick, revolver, knife, pipe, rope, wrench<br></br>
      Movement: hallway, room, secret<br></br>
      Suggestion: character, room, weapon<br></br>
      Accusation: character, room, weapon<br></br>
        </p>
       <h4>User Input</h4>
      <UserInput />
      </div>
    </div>
    
    </div>

  );
}

export default Divider;