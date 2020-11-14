import React from "react";

export class Square extends React.Component {
  render() {
    const w = this.props.dims[0];
    const h = this.props.dims[1];
    const cursor = this.props.contents == " " ? "crosshair" : "not-allowed";
    const name = this.props.name;

    //console.log(h, w, this.props.contents.roomId);
    const style = {
      // width: w,
      // height:h,
      width: "150px",
      height: "150px",
      backgroundColor: "rgb(222, 222, 222)",
      color: "black",
      border: "1px solid black",
      tableLayout: "fixed",
      //cursor: cursor,
      fontSize: "15px",
      verticalAlign: "top",
      textAlign: "center",
    };

    const players = this.props.contents.roomPlayers.map((player) => {
      const imgsrc = "/gameboard/" + player.toString() + ".png";
      return <img src={imgsrc} height="45" width="30" />;
    });

    const weapons = this.props.contents.roomWeapons.map((weapon) => {
      const imgsrc = "/gameboard/" + weapon.toString() + ".png";
      return <img src={imgsrc} height="45" width="30" />;
    });

    return (
      <td style={style} onClick={this.props.onClick}>
        <p>
          {this.props.contents.roomId} {this.props.contents.roomName}
          <br></br>
          Players: {JSON.stringify(this.props.contents.roomPlayers)}
          <br></br>
          Weapons: {JSON.stringify(this.props.contents.roomWeapons)}
        </p>
        {/* <img
          src="/gameboard/P1.png"
          height="45"
          width="30"
          title="Miss Scarlet"
        />
        <img
          src="/gameboard/P1.png"
          height="45"
          width="30"
          title="Miss Scarlet"
        /> */}
        {players}
        {weapons}
        {/* {JSON.stringify(this.props.contents)} */}
      </td>
    );
  }
}

export default Square;
