import React from "react";
import "./Masthead.css";

export class Masthead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
    };
  }
  state = {
    username: "Sample_Username",
  };

  render() {
    var logoImage = "./MastheadImages/CluelessLogo.png";
    var menuIcon = "./MastheadImages/MenuIcon.png";
    var gameIcon = "./MastheadImages/GameIcon.png";
    var helpIcon = "./MastheadImages/HelpIcon.png";
    var aboutIcon = "./MastheadImages/AboutIcon.png";
    var settingsIcon = "./MastheadImages/SettingsIcon.png";
    return (
      <div class="masthead">
        <span class="logo">
          <img src={logoImage} />
        </span>

        <span>
          <div class="dropdown">
            <button src={menuIcon}></button>
            <div class="dropdown-content">
              <span>
                <img src={gameIcon} />
                <button class="textButton"> Game Info </button>
              </span>
              <span>
                <img src={helpIcon} />
                <button class="textButton"> Help </button>
              </span>
              <span>
                <img src={aboutIcon} />
                <button class="textButton"> About </button>
              </span>
              <span>
                <img src={settingsIcon} />
                <button class="textButton"> Settings </button>
              </span>
            </div>
          </div>
        </span>
      </div>
    );
  }
}

export default Masthead;
