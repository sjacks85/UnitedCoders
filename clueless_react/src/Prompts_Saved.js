import React from "react";
import Prompt from "./Prompt";
import CardMapper from "./CardMapper";

class Prompts extends React.Component {
  constructor() {
    super();
    this.state = {
      show_cards: false,
      cards: [],
      show_revoked: false,
      revoked_message: {},
      show_end: false,
      end_message: {},
    };
    this.displayCards = this.displayCards.bind(this);
    this.displayDisprove = this.displayDisprove.bind(this);
    this.displayRevoked = this.displayRevoked.bind(this);
    this.displayEndGame = this.displayEndGame.bind(this);
  }

  displayCards() {
    //.log("displaycards");
    let items = this.state.cards.map((card) => {
      CardMapper.generateIdMap();
      var imgLocation = "./CardImages/" + CardMapper.getCardImgById(card);
      return <img src={imgLocation} width="120" height="150" />;
    }, this);
    //let items = <p>{JSON.stringify(this.state.cards)}</p>
    return (
      <div>
        <p>The game has started! Here are your cards:</p>
        {items}
      </div>
    );
  }

  displayDisprove() {
    //console.log("displaydisprove");
    var card =
      "./CardImages/" +
      CardMapper.getCardImgById(
        this.state.disprove_message.message.disprove_card
      );
    return (
      <div>
        <p>Player {this.state.disprove_message.message.disproving_player} disproved this card:</p>
        <img src={card} width="120" height="150" />
      </div>
    );
  }

  //Sending game message to client 1:{"game_id":0,"player_id":1,"message_type":51,"message":{"is_disproved":true,"disprove_card":"1","disproving_player":"sadfds"}}

  displayRevoked() {
    CardMapper.generateIdMap();
    var room =
      "./CardImages/" +
      CardMapper.getCardImgById(
        this.state.revoked_message.message.correct_room
      );
    var weapon =
      "./CardImages/" +
      CardMapper.getCardImgById(
        this.state.revoked_message.message.correct_weapon
      );
    var character =
      "./CardImages/" +
      CardMapper.getCardImgById(
        this.state.revoked_message.message.correct_character
      );
    return (
      <div>
        <p>Revoked! Here's the envelope cards: </p>
        <img src={room} width="120" height="150" />
        <img src={weapon} width="120" height="150" />
        <img src={character} width="120" height="150" />
      </div>
    );
  }

  displayEndGame() {
    CardMapper.generateIdMap();
    var room =
      "./CardImages/" +
      CardMapper.getCardImgById(this.state.end_message.message.correct_room);
    var weapon =
      "./CardImages/" +
      CardMapper.getCardImgById(this.state.end_message.message.correct_weapon);
    var character =
      "./CardImages/" +
      CardMapper.getCardImgById(
        this.state.end_message.message.correct_character
      );
    return (
      <div>
        <p>
          Player {this.state.end_message.message.winning_player} won! Here's the
          envelope cards:
        </p>
        <img src={room} width="120" height="150" />
        <img src={weapon} width="120" height="150" />
        <img src={character} width="120" height="150" />
      </div>
    );
  }

  static getDerivedStateFromProps(props, state) {
    var newcards = state.cards;
    var newshowcards = state.show_cards;
    var newshowdisprove = state.show_disprove;
    var newdisprovemessage = state.disprove_message;
    var newshowrevoked = state.show_revoked;
    var newrevokedmessage = state.revoked_message;
    var newshowend = state.show_end;
    var newendmessage = state.end_message;

    if (props.cards != undefined) {
      //console.log(JSON.stringify(props));
      //console.log(JSON.stringify(state));
      if (props.cards != state.cards) {
        //console.log("PromptCards");
        newcards = props.cards;
        newshowcards = true;
      }
    }

    var first = props.actions[0];
    if (first != undefined) {
      if (first.message_type == 51) {
        console.log("Prompt 51" + JSON.stringify(first))
        // “is_disproven”:
        // “disprove_card”:
        if (first.message.is_disproved === true) {
          console.log("Promptdisprove")
          //console.log("PromptDisprove");
          newshowdisprove = true;
          newdisprovemessage = first;
        }
      } else if (first.message_type == 52) {
        // “accusation_correct”:
        // “correct_room”:
        // “correct_character”:
        // “correct_weapon”:
        if (first.message.accusation_correct === false) {
          //console.log("PromptRevoked");
          newshowrevoked = true;
          newrevokedmessage = first;
        }
      } else if (first.message_type == 61) {
        //   “game_over”:
        //   “winning_player”:
        //   “correct_room”:
        //   “correct_character”:
        //   “correct_weapon”:
        //console.log("PromptEnd");
        newshowend = true;
        newendmessage = first;
      }
    }

    return {
      show_cards: newshowcards,
      cards: newcards,
      show_disprove: newshowdisprove,
      disprove_message: newdisprovemessage,
      show_revoked: newshowrevoked,
      revoked_message: newrevokedmessage,
      show_end: newshowend,
      end_message: newendmessage,
    };
  }

  render() {
    return (
      <div>
        {this.state.show_cards ? <Prompt>{this.displayCards()}</Prompt> : null}
        {this.state.show_disprove ? (
          <Prompt >{this.displayDisprove()}</Prompt>
        ) : null}
        {this.state.show_revoked ? (
          <Prompt >{this.displayRevoked()}</Prompt>
        ) : null}
        {this.state.show_end ? <Prompt >{this.displayEndGame()}</Prompt> : null}
      </div>
    );
  }
}
export default Prompts;

// import React from "react";
// class Popup extends React.Component {
//   render() {
//     return (
//       <div className="popup">
//         <div className="popup_inner">
//           <h1>{this.props.text}</h1>
//           <button onClick={this.props.closePopup}>close me</button>
//         </div>
//       </div>
//     );
//   }
// }
// class Test extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       showPopup: false,
//     };
//   }
//   togglePopup() {
//     console.log("HI")
//     this.setState({
//       //showPopup: !this.state.showPopup,
//       showPopup: false,
//     });
//   }
//   static getDerivedStateFromProps(props, state) {
//     // <EndGamePrompt final_message={this.state.final_message} show={this.state.show}/>
//     console.log("TESTPOPUP");
//     console.log(JSON.stringify(props));
//     console.log(JSON.stringify(state));

//     var newshowPopup = state.showPopup;
//     if (props.show === true) {
//       newshowPopup = true;
//     }

//     return {showPopup: newshowPopup}
//   }

//   render() {
//     return (
//       <div className="app">
//         <h1>hihi</h1>
//         <button onClick={this.togglePopup.bind(this)}>show popup</button>

//         {this.state.showPopup ? (
//           <Popup text="Close Me" closePopup={this.togglePopup.bind(this)} />
//         ) : null}
//       </div>
//     );
//   }
// }
// export default Test;
