import React from "react";

class MessageBoard extends React.Component {
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
    return (
      <ul>
        {this.props.actions.map((elem) => (
          <li>{JSON.stringify(elem)}</li>
        ))}
      </ul>
    );
  }
}

export default MessageBoard;
