import React from "react";
import "./Masthead.css";
import "./MenuModals.css";
import Music from "./Music";

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
            <p id="sub-italic">There has been a murder!</p>
            <p id="sub-content">
              The objective of the game Clue-Less is to be the first player to accurately guess who did it, where, and with what. When the game is initialized, a suspect, room, and weapon card are randomly chosen and hidden from the players. If a player is able to guess the correct cards in the form of an accusation, they win the game. However, if their accusation is incorrect the player is out of the game and loses.
              The game consists of 4 to 6 players, each of whom are assigned turns determined by the order in which they joined the game. Turns continue until a player has made an accurate accusation and wins the game, or all players have accused incorrectly, in which case the game is over.
         </p>
            <p id="sub-content">
              When it is a players turn, a prompt will appear in their turn box.
              Each turn consists of a movement, suggestion, and accusation.
         </p>
            <p id="sub-header">Movement:</p>
            <p id="sub-content">
              The rooms are laid out in a 3x3 grid with a hallway separating each pair of adjacent rooms.
              Each hallway only holds one person. If someone is currently in a hallway, you may not move there. The player may select an adjacent room or hallway to move into as long as the movement is valid. If not, then the player will receive an alert that the movement is invalid.
              The player may choose the “no movement” option if they do not wish to move their character during a turn.
         </p>
            <p id="sub-header">Suggestion:</p>
            <p id="sub-content">
              The player may select a suspect and weapon card to suggest from the presented dropdown menus. Once the player submits their suggestion, each subsequent player will be asked if they have any of the selected cards. If the next player has a card they must disprove the suggestion by showing the suggester that card. If they have multiple suggested cards, the player may select which card they would like to show to the suggester. If they don’t have any of the suggested cards, the next player will be asked, until every other player has been asked to disprove.
         </p>
            <p id="sub-header">Accusation:</p>
            <p id="sub-content">
              At the end of their turn, each player has the option to make an accusation in which they can guess the suspect, weapon, and room card that was chosen and hidden at the beginning of the game.
              If the player does not wish to make an accusation they can simply select, “no accusation”
              Otherwise the player can select a card from each type in the dropdown menus. If the accusation is correct then they win the game. Otherwise that player loses and is out of the game.
         </p>
          </div>
        </div>
        <div id="helpModal" class="modal">
          <div class="modalContent" id="content">
            <span onClick={closeHelp} class="close">
              &times;
         </span>
            <h1>Help Menu</h1>
            <p id="sub-header">Frequently Asked Questions:</p>
            <p id="sub-italic-left">Where can I see the cards in my hand?</p>
            <p id="sub-content">The current cards in your hand are located in the "Player Hand" section of the right divider on the page. Every card in your hand will be visibly displayed in this section.</p>
            <p id="sub-italic-left">What Is the Notebook and is it necessary to use?</p>
            <p id="sub-content">The Notbook can be opened by clicking the "Notebook" button in the "Player Notebook" section of the right divider. Players can use the Notebook to keep track of other player's cards they have seen in suggestion disprovals. The player can check the card off by clicking the corresponding cell in the table in the Notebook. Players do not need to use the Notebook, it is only provided as a utility for keeping trck of cards.</p>
            <p id="sub-italic-left">What settings can be changed in the game?</p>
            <p id="sub-content">Game settings can be accessed and modified by clicking the "Settings" section of the navigation dropdown. Players can select a new color scheme from the options provided and can play or pause a music track selected from the adjacent dropdown menu. </p>
            <p id="sub-italic-left">How do I know when it is my turn?</p>
            <p id="sub-content">A player will be notified of their turn by a prompt in the turn box in the right divider of the page. If it is not a players turn, they should see a message stating that it is another players turn. Players will also receive a prompt if they are up to disprove another player's suggestion, which is necessary to respond to for the suggesting player to complete their turn.</p>
            <p id="sub-italic-left">Do I have to make a movement on every turn?</p>
            <p id="sub-content">A player may choose not to make a movement by clicking the "No Movement" button during their turn. There may be some situations in which both hallways connected to players room are blocked and they cannot make a valid movement, in which case the player should choose "No Movement".</p>
            <p id="sub-italic-left">Do I have to make a suggestion on every turn?</p>
            <p id="sub-content">Players must make a suggestion if they are prompted to. If a player is in a hallway instead of a room, they will not be able to make a suggestion during their turn, however, that player will not be prompted to make a suggestion. They will instead be asked if they would like to make an accusation directly after their movement selection.</p>
            <p id="sub-italic-left">Do I have to make an accusation on every turn?</p>
            <p id="sub-content">Players do not need to make an accusation on every turn, in fact they should not. If a player is fairly certain of what cards we're chosen and hidden at the beginning of the game they may make an accusation in an attempt to win the game. However, if the player makes an incorrect accusation they will lose and no longer have turns.</p>
          </div>
        </div>
        <div id="aboutInfoModal" class="modal">
          <div class="modalContent" id="content">
            <span onClick={closeAboutInfo} class="close">
              &times;
         </span>
            <h1>About Us</h1>
            <p id="sub-content">
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
            <h1>Developers</h1>
            <h3>Cheryl Limer</h3>
            <p id="sub-content">
              My name is Cheryl, I live in Central NY, and work at a government contractor in an engineering rotational program with a background and focus in software engineering. I have BS degrees in both Psychology and Computer Science from SUNY (State University of New York) Brockport, and this is my first class towards an MS in Computer Science. Since graduating from undergrad in 2018 I've known that I've wanted to go back to school to get my masters just because I love learning new things and expanding my horizons, and I'm really excited to finally be on this path.
              All of my undergraduate work was in Java, however most of my career work has been in C++ so I feel proficient in both. I'm also familiar with Python. In general I'm organized and detail oriented, which admittedly can sometimes lead to a little bit of perfectionism. I'm good at sticking to schedules, and I prefer to get things done early enough that there is some wiggle room in case there are any last minute roadblocks. (I'm also a big NFL fan and try to get things done early enough to avoid doing work during the games on Sundays!). I like to have work delegated and have clear, defined tasks for everyone on the team. I've worked on small teams since I began my professional career, and enjoy working with others, being a team player and working together to make sure the team succeeds.
              In my spare time I love to read, take pictures, and explore the outdoors. While my true happy place is the beach, I recently started exploring the Adirondack region which is practically in my backyard now and have been loving every second of it. My picture below is at the top of Black Bear Mountain from a few months ago.
         </p>
            <h3>Kathryn Crisafulli</h3>
            <p id="sub-content">
              Hey everyone! My name is Kathryn Crisafulli. I received my bachelor’s degree in Computer Engineering from University of Maryland. Since graduating college in 2018, I have been working at Leidos as a software engineer. I currently work on software that air traffic controllers across the nation rely on 24/7 to direct aircrafts. For work, I primarily program in Ada (a strongly typed, object oriented programming language). Since I don’t imagine anyone’s first choice of programming languages will be Ada, I’m also familiar with Java, C, and C++.
              As a team member, I'm super reliable, a quick learner and always willing to lend a hand if needed. What I'm looking for in other team members is open, consistent communication. After doing my own research, I love brainstorming and bouncing ideas around with my team members. In my opinion, collaboration is the key to developing the best software or product. As for my schedule, I live in Maryland, typically work 9AM to 5PM and will be available in the evening and on weekends.
              I’m excited to be taking this course and starting my grad school journey! I’m really hoping to learn a lot through this course and be able to apply these software engineering techniques back into work.
              A fun fact about me is I brew my own kombucha (fermented tea with probiotic benefits) at home. I also love gardening and pickling/canning my own vegetables. I even built my own raised herb/flower bed earlier this summer.
         </p>
            <h3>Erik Riis</h3>
            <p id="sub-content">
              My name is Erik Riis and I work as a software engineer for GE Healthcare as part of a rotational engineering development program. I have always wanted to attend graduate school to continue my education and being a part of the program has afforded me the chance to do so while working part time. This is going to be my first course at JHU but I am excited to dive in! I prefer working in Java and Python but have experience with and am comfortable working in other languages. As an undergraduate I went to Duke University and studied computer science and electrical and computer engineering. For a little about myself, I live in San Diego, CA and love going to the beach and surfing. I also like to be creative and paint and draw in my free time.
         </p>
            <h3>Sidney Jackson</h3>
            <p id="sub-content">
              My name is Sidney Jackson. This past summer I enrolled in my first EP CS course and am looking forward to another semester of classes. For background, I received a B.S. in Computer Engineering in 2018 and have been working as a Software Engineer at a government contractor since. In the past, I’ve worked as an embedded systems engineer and developed Android mobile applications, but I’m currently doing backend software development in Java for the project I’m currently working on.
              Though I’ve taken CS courses as an undergraduate, I’ve never actually formally taken a class about Software Engineering, so I’m excited to take a course that will reintroduce me to the field and reinforce concepts/principles that I might’ve picked up on but haven’t thoroughly studied.
              Outside of work and school, I enjoy playing guitar, woodworking, and being outdoors.
         </p>
            <h3>Sophia Anousheh</h3>
            <p id="sub-content">
              Hello everyone! My name is Sophia Anousheh and I work as a contractor /Scrum Master. I have been working in software industry for about 8 years.
              Although I have experience programming with C# and Java Script libraries like React for small, and large-scale projects, I do not consider myself a programmer. Being a Scrum master, I am a good team player, listen actively, and demonstrate reliability. I am responsible for keeping the entire team on schedule and ensuring that no task assignments escape notice. A large part of my job is to help everyone on the team follow guidelines through the development process.
              I am excited to be in this class and have the opportunity to learn more about the applications of object-oriented programing and Agile project management approaches.
              I currently live in Fairfax, Virginia with my husband. Something unique about myself, I absolutely love cooking and find it very therapeutic. Other than cooking, I love watching Space and Aviation YouTube channels like “Scott Manley”, and “Mentour Pilot”.
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
            <p class="settings"> Music Options: </p>
            <Music></Music>
          </div>
        </div>
      </div>
    );
 
  }
}

export default Masthead;
