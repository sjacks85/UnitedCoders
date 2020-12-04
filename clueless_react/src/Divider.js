import React from "react";
import "./Divider.css";
import UserInput from "./UserInput";
import Players from "./Players";
import Turn from "./Turn";
import MessageBoard from "./MessageBoard";

class Divider extends React.Component {
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
      <div class="float-container">
        <div id="divider-right" class="float-child">
          <div class="green">
            <h4>Players</h4>
            <p>
              <Players actions={this.props.actions} />
            </p>
            <h4>Turn</h4>
            <p>
              <Turn actions={this.props.actions} />
            </p>
            <h4>Message Board</h4>
            <p>
              <MessageBoard actions={this.props.actions} />
            </p>
          </div>
        </div>
        <div class="float-child">
          <div class="blue">
            <h4>User Input</h4>
            Characters : plum, scarlet, mustard, white, green, peacock<br></br>
            Rooms : study, hall, lounge, dinning, billiard, library,
            conservatory, ballroom, kitchen<br></br>
            Weapons : candlestick, revolver, knife, pipe, rope, wrench<br></br>
            <br></br>
            Movement : true/false [hallway, room, secret]<br></br>
            Suggestion : room character weapon<br></br>
            Accusation : true/false room character weapon<br></br>
            Disprove : true/false card<br></br>
            <br></br>
            <UserInput />
          </div>
        </div>
      </div>
    );
  }
}

export default Divider;
