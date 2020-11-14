import React from "react";

export class Room extends React.Component {
  displayIcons() {

    const objects = this.props.contents.roomObjs.map((object) => {
      const imgsrc = "/gameboard/" + object.toString() + ".png";
      return <img src={imgsrc} height="45" width="30" />;
    });

    return (
      <div>
        <p>
          {this.props.contents.roomName}
          <br></br>
          Objects: {JSON.stringify(this.props.contents.roomObjs)}
          <br></br>
        </p>
        {objects}
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
