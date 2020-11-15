import React from "react";
import CardMapper from "./CardMapper";
import "./PlayerHand.css";

class PlayerHand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.cards,
    };
  }
  state = {
    cards: [1, 2, 3, 4, 5], // Default. Can remove this once we know the cards are being populated.
  };
  updatePlayerHand = this.props.cards.map((card) => {
    CardMapper.generateIdMap();
    var imgLocation = "./CardImages/" + CardMapper.getCardImgById(card);
    return (
      <li>
        <div class="block">
          <img src={imgLocation} />
        </div>
      </li>
    );
  });

  render() {
    return (
      <div class="playerHandFrame">
        <ul class="hs center">{this.updatePlayerHand}</ul>
      </div>
    );
  }
}

export default PlayerHand;
