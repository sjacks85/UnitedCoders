import React from "react";

var uniqueIDs = [
  //0
  { type: "character", name: "Miss Scarlet", image: "C1" },
  //1
  { type: "character", name: "Mr. Green", image: "C2" },
  //2
  { type: "character", name: "Colonel Mustard", image: "C3" },
  //3
  { type: "character", name: "Prof. Plum", image: "C4" },
  //4
  { type: "character", name: "Mrs. Peacock", image: "C5" },
  //5
  { type: "character", name: "Mrs. White", image: "C6" },
  //6
  { type: "weapon", name: "Candlestick", image: "W1" },
  //7
  { type: "weapon", name: "Revolver", image: "W4" },
  //8
  { type: "weapon", name: "Knife", image: "W2" },
  //9
  { type: "weapon", name: "Pipe", image: "W3" },
  //10
  { type: "weapon", name: "Rope", image: "W5" },
  //11
  { type: "weapon", name: "Wrench", image: "W6" },
  //12
  { type: "room", name: "Study", roomId: 11 },
  //13
  { type: "room", name: "Hall", roomId: 12 },
  //14
  { type: "room", name: "Lounge", roomId: 13 },
  //15
  { type: "room", name: "Dinning Room", roomId: 23 },
  //16
  { type: "room", name: "Billiard Room", roomId: 22 },
  //17
  { type: "room", name: "Library", roomId: 21 },
  //18
  { type: "room", name: "Conservatory", roomId: 31 },
  //19
  { type: "room", name: "Ballroom", roomId: 32 },
  //20
  { type: "room", name: "Kitchen", roomId: 33 },
];

class MessageBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: this.props.actions,
      broadcast: ["Kathryn", "Austin"],
      messages: ["Kathryn", "Austin"],
    };
  }
  state = {
    actions: [],
   // broadcast: ["Kathryn", "Austin"]
  };

  static getDerivedStateFromProps(props, state) {
    var newmessages = [];
    //Filter messages
    if (props.actions != undefined) {

      var i
      for (i = 0; i < props.actions.length; i++) {
        var item = props.actions[i]
        let string = "";
        let anotherstring = "";
        if (item.message_type == 11) {
          // 11	Player Start
          //string = "11 Player Start"
          string = "Player " + item.message.username + " joined as character " + uniqueIDs[item.message.character_id].name;

        } else if (item.message_type == 21) {
          // 21	Broadcast Information
          //string = "21	Broadcast Information"
          string = item.message.broadcast_message;

        } else if (item.message_type == 22) {
          string ="22	Broadcast Movement"
          if (item.message.character_moved === true) {
            string = "Character " + uniqueIDs[item.message.moved_character].name + " moved"
          }
          if (item.message.weapon_moved === true) {
            anotherstring = "Weapon " + uniqueIDs[item.message.moved_weapon].name + " moved"
          }
        } else if (item.message_type == 31) {
          string = "Movement request. Movement required: " + item.message.movement_required + ". Movement possible: " + item.message.movement_possible;
          //string ="31	Movement Request"
        } else if (item.message_type == 32) {
          string = "Suggestion request"
          // 32	Suggestion Request
        } else if (item.message_type == 33) {
          string = "Disprove request. Suggested room: " + uniqueIDs[item.message.suggested_room].name + " Suggested character: " + uniqueIDs[item.message.suggested_character].name + " Suggested weapon: " + uniqueIDs[item.message.suggested_weapon].name;
          // 33	Disprove Request
        } else if (item.message_type == 34) {
          string ="Accusation Request"
          // 34	Accusation Request
        } else if (item.message_type == 41) {
          alert("ERROR IN MESSAGEBOARD")
          //41	Movement Response
        } else if (item.message_type == 42) {
          alert("ERROR IN MESSAGEBOARD")
          // 42	Suggestion Response
        } else if (item.message_type == 43) {
          alert("ERROR IN MESSAGEBOARD")
          // 43	Disprove Response
        } else if (item.message_type == 44) {
          alert("ERROR IN MESSAGEBOARD")
          // 44	Accusation Response
        } else if (item.message_type == 51) {
          if (item.message.is_disproven === true) {
            string = "Player disproved suggestion with" + uniqueIDs[item.message.disprove_card].name;
          }
          // 51	Suggestion Result
        } else if (item.message_type == 52) {
          if (item.message.accusation_correct === true) {
            string = "Your accusation was correct!"
          } else {
            string = "Your accusation was wrong! You're now a REVOKED player. Correct room: " + uniqueIDs[item.message.correct_room].name +
            " Correct character: " + uniqueIDs[item.message.correct_character].name + " Correct weapon: " + uniqueIDs[item.message.correct_weapon].name;
          }
          //string ="test"
          // 52	Accusation Result
        } else if (item.message_type == 61) {
          string ="End of the game!"
          // 61	End of Game
        } else {
          //alert("ERROR IN MESSAGEBOARD")
        }
        if (string != "") {
          newmessages.push(string)
        }
        if (anotherstring != "") {
          newmessages.push(anotherstring)
        }
        //console.log("MESSAGE STRING " + string)
        //console.log("MESSAGE ANOTHERSTRING " + anotherstring)
        //newmessages = [newmessages, ...string];
       // console.log("MESSAGE: " + newmessages)

      }
    }
    return { messages: newmessages };
  }

  render() {
    return (
      <ul>
        {this.state.messages.map((elem) => (
          <li style={{
            textAlign: "left",
          }}
          >{elem}</li>
        ))}
      </ul>
    );
  }
}

export default MessageBoard;
