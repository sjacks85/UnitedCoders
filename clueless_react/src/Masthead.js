import React from "react";
import "./Masthead.css";
import "./MenuModals.css";
var COLORS = require("./game_data/colors.json");

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

    // Note: There is def a much better way to do this...

    const colorSchemeBlue = () => {
      var masthead = document.getElementById("masthead");
      masthead.style.background = COLORS.Blue;
      var dropdownButton = document.getElementsByClassName("dropbtn");
      for (var i = 0; i < dropdownButton.length; i++) {
        dropdownButton[i].style.background = COLORS.Blue;
      }
      var dropdownContent = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdownContent.length; i++) {
        dropdownContent[i].style.background = COLORS.Blue + "cb";
      }
      //Working on this: .dropdown-content span:hover --> darkColor
    };

    const colorSchemeRed = () => {
      var masthead = document.getElementById("masthead");
      masthead.style.background = COLORS.Red;
      var dropdownButton = document.getElementsByClassName("dropbtn");
      for (var i = 0; i < dropdownButton.length; i++) {
        dropdownButton[i].style.background = COLORS.Red;
      }
      var dropdownContent = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdownContent.length; i++) {
        dropdownContent[i].style.background = COLORS.Red + "cb";
      }
      //Working on this: .dropdown-content span:hover --> darkColor
    };

    const colorSchemeGreen = () => {
      var masthead = document.getElementById("masthead");
      masthead.style.background = COLORS.Green;
      var dropdownButton = document.getElementsByClassName("dropbtn");
      for (var i = 0; i < dropdownButton.length; i++) {
        dropdownButton[i].style.background = COLORS.Green;
      }
      var dropdownContent = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdownContent.length; i++) {
        dropdownContent[i].style.background = COLORS.Green + "cb";
      }
      //Working on this: .dropdown-content span:hover --> darkColor
    };

    const colorSchemeYellow = () => {
      var masthead = document.getElementById("masthead");
      masthead.style.background = COLORS.Yellow;
      var dropdownButton = document.getElementsByClassName("dropbtn");
      for (var i = 0; i < dropdownButton.length; i++) {
        dropdownButton[i].style.background = COLORS.Yellow;
      }
      var dropdownContent = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdownContent.length; i++) {
        dropdownContent[i].style.background = COLORS.Yellow + "cb";
      }
      //Working on this: .dropdown-content span:hover --> darkColor
    };

    const colorSchemePink = () => {
      var masthead = document.getElementById("masthead");
      masthead.style.background = COLORS.Pink;
      var dropdownButton = document.getElementsByClassName("dropbtn");
      for (var i = 0; i < dropdownButton.length; i++) {
        dropdownButton[i].style.background = COLORS.Pink;
      }
      var dropdownContent = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdownContent.length; i++) {
        dropdownContent[i].style.background = COLORS.Pink + "cb";
      }
      //Working on this: .dropdown-content span:hover --> darkColor
    };

    const colorSchemeSilver = () => {
      var masthead = document.getElementById("masthead");
      masthead.style.background = COLORS.Silver;
      var dropdownButton = document.getElementsByClassName("dropbtn");
      for (var i = 0; i < dropdownButton.length; i++) {
        dropdownButton[i].style.background = COLORS.Silver;
      }
      var dropdownContent = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdownContent.length; i++) {
        dropdownContent[i].style.background = COLORS.Silver + "cb";
      }
      //Working on this: .dropdown-content span:hover --> darkColor
    };

    return (
      <div id="masthead" class="masthead">
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
            <p>
              {" "}
              In August 2020, the United Coders (A group of student developers
              enrolled in the Johns Hopkins University’s Foundation of Software
              Engineering Fall 2020 course) took on a project to reimagine the
              classic murder mystery board game Clue© as an online-board game
              called Clue-Less. The end-goal of this project was to create a
              product that offered an engaging and intuitive online board game
              experience that was highly accessible and easy to use all while
              maintaining the basic rules and game mechanics of the original
              board game Clue©. The final product of this effort is this web
              application, "Clue-Less" by the United Coders.
            </p>
            <p>
              {" "}
              Developers: Sophia Anousheh • Kathryn Crisafulli • Sidney Jackson
              • Cheryl Limer • Erik Riis{" "}
            </p>
          </div>
        </div>

        <div id="settingsModal" class="modal">
          <div class="modalContent">
            <span onClick={closeSettings} class="close">
              &times;
            </span>
            <h1>Game Settings</h1>
            <p class="settings"> Select Color Scheme: </p>
            <div class="row">
              <div class="column" onClick={colorSchemeBlue}>
                <img src="./SettingColors/BlueColor.png" width="25" />
              </div>
              <div class="column" onClick={colorSchemeRed}>
                <img src="./SettingColors/RedColor.png" width="25" />
              </div>
              <div class="column" onClick={colorSchemeGreen}>
                <img src="./SettingColors/GreenColor.png" width="25" />
              </div>
              <div class="column" onClick={colorSchemeYellow}>
                <img src="./SettingColors/YellowColor.png" width="25" />
              </div>
              <div class="column" onClick={colorSchemePink}>
                <img src="./SettingColors/PinkColor.png" width="25" />
              </div>
              <div class="column" onClick={colorSchemeSilver}>
                <img src="./SettingColors/SilverColor.png" width="25" />
              </div>
              <div> </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Masthead;
