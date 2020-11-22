import React from "react";
import CardMapper from "./CardMapper";
import "./PlayerHand.css";

class PlayerHand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //cards: this.props.cards,
      cards: [],
    };
    this.updatePlayerHand = this.updatePlayerHand.bind(this);
  }

  state = {
    cards: [],
    //cards: [1, 2, 3, 4, 5], // Default. Can remove this once we know the cards are being populated.
  };

  updatePlayerHand() {
    let items = this.state.cards.map((card) => {
      CardMapper.generateIdMap();
      var imgLocation = "./CardImages/" + CardMapper.getCardImgById(card);
      return (
        <li class="playerHand_li">
          <div class="block">
            <img src={imgLocation} />
          </div>
        </li>
      );
    }, this);
    return items;
  }

  static getDerivedStateFromProps(props, state) {
    var newcards = state.cards;
    if (props.cards != undefined) {
      if (props.cards != state.cards) {
        newcards = props.cards;
        //console.log("CARDS " + props.cards);
        //console.log("CARDS " + state.cards);
      }
    }
    return { cards: newcards };
  }

  render() {
    //console.log("PLAYERHAND"  + this.state.cards)
    //console.log("PLAYERHAND"  + this.state.cards.length)
    return (
      <div class="playerHandFrame">
        <ul class="hs center playerHand_ul">{this.updatePlayerHand()}</ul>
      </div>
    );
  }
}

export default PlayerHand;
