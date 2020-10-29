import React, { useEffect, useState } from "react";
import { socket } from './ClientManager.js'

class Cards extends React.Component {

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

export default Cards;

// export default function Cards() {

//   const [cards, setCards] = useState();
//   const [assigned, assignedCards] = useState(false);

//   useEffect(() => {
//     socket.on('assignCards', data => {
//       if ( assigned ) {
//         //alert("UNDEFINED")
//       } else {
//         setCards(data)
//         assignedCards(true)
//         console.log("Cards:", cards);
//         console.log("Assigned:", assigned);
//        //alert("Cards:" + JSON.stringify(cards))
//       }
//    });
//   }, []);

//   return (
//     <div>
//       <p>
//         {JSON.stringify(cards)}
//       </p>
//     </div>
    
//   );
// }

// class Message extends Component {
//   constructor(){
//     super();
//     window.alertMessage = this.alertMessage.bind(this);
// }
//   state = {
//     getBody: ''
//   };
  
//   componentWillUnmount() {
//     clearInterval(this.timer)
//     this.timer = null;
//   }
//   alertMessage() {
//       console.log("From the outside")
//   }

//   getItems() {
//     //http://node-express-env.eba-m3dz2nxw.us-east-2.elasticbeanstalk.com/test
//     //Get request and then assign it to state.getBoby
//     //return state.getBody in render
//     //Could also unshift into array, and return the array like Divider:Stubbed_Messages
//   }

//   componentDidMount() {
//     this.getItems();
//     //Starting timer to fetch every 5 seconds
//     this.timer = setInterval(()=> this.getItems(), 5000);
//   }
  
// render() {
//     return (
//         <p>!{this.state.getBody}!</p>
//     );
//   }
// }

// export default Message;