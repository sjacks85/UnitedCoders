import React from "react";
import { sendJoinGame, sendStartGame } from "./ClientManager";
import "./LoginPage.css";

var uniqueIDs = [
  //0
  { type: "character", name: "Miss Scarlet", image: "C1" },
  //1
  { type: "character", name: "Mr. Green", image: "C2" },
  //2
  { type: "character", name: "Colonel Mustard", image: "C3" },
  //3
  { type: "character", name: "Prof. Plum", image: "C4" },
  //4
  { type: "character", name: "Mrs. Peacock", image: "C5" },
  //5
  { type: "character", name: "Mrs. White", image: "C6" },
  //6
  { type: "weapon", name: "Candlestick", image: "W1" },
  //7
  { type: "weapon", name: "Revolver", image: "W4" },
  //8
  { type: "weapon", name: "Knife", image: "W2" },
  //9
  { type: "weapon", name: "Pipe", image: "W3" },
  //10
  { type: "weapon", name: "Rope", image: "W5" },
  //11
  { type: "weapon", name: "Wrench", image: "W6" },
  //12
  { type: "room", name: "Study", roomId: 11 },
  //13
  { type: "room", name: "Hall", roomId: 12 },
  //14
  { type: "room", name: "Lounge", roomId: 13 },
  //15
  { type: "room", name: "Dinning Room", roomId: 23 },
  //16
  { type: "room", name: "Billiard Room", roomId: 22 },
  //17
  { type: "room", name: "Library", roomId: 21 },
  //18
  { type: "room", name: "Conservatory", roomId: 31 },
  //19
  { type: "room", name: "Ballroom", roomId: 32 },
  //20
  { type: "room", name: "Kitchen", roomId: 33 },
];

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      character: 0,
      page: "",
      available_characters: [],
      game_id: 0,
      player_id: 0,
      host: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCharacter = this.handleCharacter.bind(this);
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickCreate = this.handleClickCreate.bind(this);
  }

  // handleChange(event) {
  //   this.setState({ value: event.target.value });
  // }

  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value,
    });
    //console.log(JSON.stringify(this.state));
  }

  handleCharacter(evt) {
    //console.log(evt.target.value);
    //console.log(typeof evt.target.value);
    this.setState({ character: Number(evt.target.value) });
    //console.log(JSON.stringify(this.state));
  }

  handleClick(evt) {
    console.log("CLICKJOIN=" + JSON.stringify(this.state));
    sendJoinGame(
      true,
      this.state.game_id,
      this.state.username,
      this.state.character,
      this.state.player_id
    );
    this.props.setUsername(this.state.username);
  }

  handleClickCreate(evt) {
    console.log("CLICKCREATE=" + JSON.stringify(this.state));
    //     MESSAGE ID 02
    // Client -> server join game: {
    // create_game: (bool; true to start game)
    // game_id: (int; ID of the game to join if joining active game)
    // username: (string; player username)
    // character: (int; ID of chosen character)
    // player_id: (int; ID of player
    // }
    sendJoinGame(
      false,
      this.state.game_id,
      this.state.username,
      this.state.character,
      this.state.player_id
    );
    this.props.setUsername(this.state.username);
    //this.props.setUsername(this.state.username);
  }

  handleClickStart(evt) {
    console.log("CLICKSTART=" + JSON.stringify(this.state));
    sendStartGame();
  }

  createSelectItems(array) {
    if (array != undefined) {
      //console.log(JSON.stringify(array));
      // let items = array.map((item, i) => {
      //   return (
      //     item.type == type && (
      //       <option key={i} value={i}>
      //         {uniqueIDs[i].name}
      //       </option>
      //     )
      //   );
      // }, this);
      let items = array.map((item) => {
        return (
          <option key={item} value={item}>
            {/* {uniqueIDs[i].name} */}
            {uniqueIDs[item].name}
          </option>
        );
      }, this);
      //console.log(JSON.stringify(items));
      return items;
    } else {
      return [];
    }
  }

  displayLoginPage() {
    if (this.state.page == "") {
      return (
        <div>
          <p>Whoops the server isn't started</p>
        </div>
      );
    } else if (this.state.page == "create_game") {
      return (
        <div>
          <p>No active games found. Would you like to start a game?</p>
          <label>
            Username
            <input
              className="logininput"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
          <br></br>
          <label>
            Character
            <select
              className="loginselect"
              name="character"
              value={this.state.character}
              onChange={this.handleCharacter}
            >
              {this.createSelectItems(this.state.available_characters)}
            </select>
          </label>
          <br></br>
          <button type="submit" onClick={this.handleClickCreate}>
            Create Game
          </button>
        </div>
      );
    } else if (this.state.page == "unable_to_join") {
      return (
        <div>
          <p>Whoops the game has started! Unable to join.</p>
        </div>
      );
    } else if (this.state.page == "join_game") {
      return (
        <div>
          <label>
            Username
            <input
              className="logininput"
              className="logininput"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
          <br></br>
          <label>
            Character
            <select
              className="loginselect"
              name="character"
              value={this.state.character}
              onChange={this.handleCharacter}
            >
              {this.createSelectItems(this.state.available_characters)}
            </select>
          </label>
          <br></br>
          <button type="submit" onClick={this.handleClick}>
            Join Game
          </button>
        </div>
      );
    } else if (this.state.page == "waiting") {
      return (
        <div>
          <p>Waiting for others to join</p>
        </div>
      );
    } else if (this.state.page == "start_game") {
      return (
        <div>
          <button type="submit" onClick={this.handleClickStart}>
            Start Game
          </button>
        </div>
      );
    }
    // Client
    // If active game but not started:
    // Ask player for game id
    // Ask player for username
    // Ask player for character
    // Send join game
    // If active game but started:
    // Tell player they can’t join
    // If no active game:
    // Ask player if they want to start a game
    // Ask for username, player
    // Send join game

    //     MESSAGE ID 02
    // Client -> server join game: {
    // create_game: (bool; true to start game)
    // game_id: (int; ID of the game to join if joining active game)
    // username: (string; player username)
    // character: (int; ID of chosen character)
    // player_id: (int; ID of player
    // }
  }

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps-LoginPage");

    var first = props.setup_messages[0];
    var newPage = state.page;
    var newAvailChar = state.available_characters;
    var newGameId = state.game_id;
    var newPlayerId = state.player_id;
    var newHost = state.host;

    if (first != undefined) {
      if (first.message_type == 1) {
        //         MESSAGE ID 01
        // Server -> client : {
        // active_game: (bool; if the host has started a game, either in waiting room or active play)
        // game_started: (bool; true if the game has started; no more players
        // game_id: (int; id of the active game)
        // num_players: (int; number of players joined in the game)
        // players: {
        // Id: (int; Id of player
        // username: (string; player username)
        // character: (int; character ID)
        // }
        // host: (int; id of host player)
        // available_characters: (int []; IDs of characters available)
        // player_id: (int, id of player)
        newAvailChar = first.message.available_characters;
        newGameId = first.message.game_id;
        newPlayerId = first.message.player_id;
        if (first.message.active_game === false) {
          newPage = "create_game";
          newHost = true;
        } else if (first.message.game_started === true) {
          newPage = "unable_to_join";
        } else {
          newPage = "join_game";
        }
      } else if (first.message_type == 3) {
        //         MESSAGE ID 03
        // Server -> client update waiting room: {
        // num_players: (int; number of current players)
        // can_start: (bool; true if enough players to start game)
        // must_start: (bool; true if max players reached and game must start)
        // players: {
        // Id: (int; Id of player
        // username: (string; player username)
        // character: (int; character ID)
        // }
        // host: (int; id of host player)
        newPage = "waiting";
        if (state.host === true) {
          if (
            first.message.can_start === true ||
            first.message.must_start === true
          ) {
            newPage = "start_game";
          }
        }
      }
    }
    return {
      page: newPage,
      available_characters: newAvailChar,
      game_id: newGameId,
      player_id: newPlayerId,
      host: newHost,
    };
  }

  render() {
    return (
      <div className="loginbox">
        <h4>Welcome!</h4>
        <p>!{JSON.stringify(this.props.setup_messages)}!</p>
        {this.displayLoginPage()}
      </div>
    );
  }
}

export default LoginPage;
