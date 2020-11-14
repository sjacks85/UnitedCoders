import React from "react";

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: this.props.actions,
    };
  }
  state = {
    actions: [],
  };

  render() {
    const temp = this.props.actions.filter(
      (element) => element.message_type == 11 && element.player_id == 0
    );
    return (
      <ul>
        {temp.map((elem) => (
          <li>
            player_id={JSON.stringify(elem.message.player_id)} username=
            {JSON.stringify(elem.message.username)} character=
            {JSON.stringify(elem.message.character)} cards=
            {JSON.stringify(elem.message.cards)}
          </li>
        ))}
      </ul>
    );
  }
}

export default Players;
