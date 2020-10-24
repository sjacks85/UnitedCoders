import React, { useEffect, useState } from "react";
import { socket } from './ClientManager.js'

var array = [];

export default function Cards() {

  const [cards, setCards] = useState();
  const [assigned, assignedCards] = useState(false);

  useEffect(() => {
    socket.on('assignCards', data => {
      if ( assigned ) {
        //alert("UNDEFINED")
      } else {
        setCards(data)
        assignedCards(true)
        console.log("Cards:", cards);
        console.log("Assigned:", assigned);
       //alert("Cards:" + JSON.stringify(cards))
      }
   });
  }, []);

  return (
    <div>
      <p>
        {JSON.stringify(cards)}
      </p>
    </div>
  );
}

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