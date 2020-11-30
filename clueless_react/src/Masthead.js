import React from "react";
import "./Masthead.css";
import "./MenuModals.css";

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

    // Open/Close Game Info:
    const displayGameInfo = () => {
      var modal = document.getElementById("gameInfoModal");
      modal.style.display = "block";
    };

    const closeGameInfo = () => {
      var modal = document.getElementById("gameInfoModal");
      modal.style.display = "none";
    };

    // Open/Close Help:
    const displayHelp = () => {
      var modal = document.getElementById("helpModal");
      modal.style.display = "block";
    };

    const closeHelp = () => {
      var modal = document.getElementById("helpModal");
      modal.style.display = "none";
    };

    // Open/Close About Info:
    const displayAboutInfo = () => {
      var modal = document.getElementById("aboutInfoModal");
      modal.style.display = "block";
    };

    const closeAboutInfo = () => {
      var modal = document.getElementById("aboutInfoModal");
      modal.style.display = "none";
    };

    // Open/Close Settings:
    const displaySettings = () => {
      var modal = document.getElementById("settingsModal");
      modal.style.display = "block";
    };

    const closeSettings = () => {
      var modal = document.getElementById("settingsModal");
      modal.style.display = "none";
    };

    return (
      <div class="masthead">
        <span class="logo">
          <img src={logoImage} />
        </span>

        <span class="menu">
          <div class="dropdown">
            <img src={menuIcon}></img>
            <div class="dropdown-content">
              <span onClick={displayGameInfo}>
                <img src={gameIcon} />
                Game Info
              </span>
              <span onClick={displayHelp}>
                <img src={helpIcon} />
                Help
              </span>
              <span onClick={displayAboutInfo}>
                <img src={aboutIcon} />
                About
              </span>
              <span onClick={displaySettings}>
                <img src={settingsIcon} />
                Settings
              </span>
            </div>
          </div>
        </span>

        <div id="gameInfoModal" class="modal">
          <div class="modalContent">
            <span onClick={closeGameInfo} class="close">
              &times;
            </span>
            <h1>Clue-Less Game Info</h1>
          </div>
        </div>

        <div id="helpModal" class="modal">
          <div class="modalContent">
            <span onClick={closeHelp} class="close">
              &times;
            </span>
            <h1>Help Menu</h1>
          </div>
        </div>

        <div id="aboutInfoModal" class="modal">
          <div class="modalContent">
            <span onClick={closeAboutInfo} class="close">
              &times;
            </span>
            <h1>About Us</h1>
          </div>
        </div>

        <div id="settingsModal" class="modal">
          <div class="modalContent">
            <span onClick={closeSettings} class="close">
              &times;
            </span>
            <h1>Game Settings</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Masthead;
