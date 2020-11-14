import React from "react";

export class Room extends React.Component {
  displayIcons() {
    const players = this.props.contents.roomPlayers.map((player) => {
      const imgsrc = "/gameboard/" + player.toString() + ".png";
      return <img src={imgsrc} height="45" width="30" />;
    });

    const weapons = this.props.contents.roomWeapons.map((weapon) => {
      const imgsrc = "/gameboard/" + weapon.toString() + ".png";
      return <img src={imgsrc} height="45" width="30" />;
    });

    return (
      <div>
        <p>
          {this.props.contents.roomName}
          <br></br>
          Players: {JSON.stringify(this.props.contents.roomPlayers)}
          <br></br>
          Weapons: {JSON.stringify(this.props.contents.roomWeapons)}
        </p>
        {players}
        {weapons}
      </div>
    );
  }

  render() {
    const style = {
      width: "150px",
      height: "150px",
      backgroundColor: "rgb(222, 222, 222)",
      color: "black",
      border: "1px solid black",
      tableLayout: "fixed",
      fontSize: "15px",
      verticalAlign: "top",
      textAlign: "center",
    };

    return (
      <td style={style} onClick={this.props.onClick}>
        {this.props.contents.roomId != 0 && this.displayIcons()}
      </td>
    );
  }
}

export default Room;

{
  /* <b>{this.props.contents.roomName}</b>
<br></br>
Players: {JSON.stringify(this.props.contents.roomPlayers)}
<br></br>
Weapons: {JSON.stringify(this.props.contents.roomWeapons)}
</p>
{players}
{weapons} */
}
