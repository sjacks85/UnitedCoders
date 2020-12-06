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
        </p>
        {objects}
      </div>
    );
  }
//   return (
//  X={this.props.x} Y={this.props.y}
//     <div>
//       <p>
//         {this.props.contents.roomName}
//         <br></br>
//         Objects: {JSON.stringify(this.props.contents.roomObjs)}
//         <br></br>
//       </p>
//       {objects}
//     </div>
//   );
// }

  createStyle (id) {
    if (id != 0) {
      return {
        width: "150px",
        height: "150px",
        backgroundColor: "rgb(222, 222, 222)",
        //backgroundColor: "rgba(0, 89, 179, .3)",
        //opacity: 0.5,
        color: "black",
        border: "1px solid black",
        tableLayout: "fixed",
        fontSize: "15px",
        verticalAlign: "top",
        textAlign: "center",
      };
    } else {
      return {
        width: "150px",
        height: "150px",
        backgroundColor: 'white',
        //backgroundColor: "rgba(0, 89, 179, .3)",
        //opacity: 0.5,
        color: "black",
        border: "1px solid black",
        tableLayout: "fixed",
        fontSize: "15px",
        verticalAlign: "top",
        textAlign: "center",
      };
    }
  }
  render() {
    // const style = {
    //   width: "150px",
    //   height: "150px",
    //   backgroundColor: "rgb(222, 222, 222)",
    //   //backgroundColor: "rgba(0, 89, 179, .3)",
    //   //opacity: 0.5,
    //   color: "black",
    //   border: "1px solid black",
    //   tableLayout: "fixed",
    //   fontSize: "15px",
    //   verticalAlign: "top",
    //   textAlign: "center",
    // };

    return (
      <td style={this.createStyle(this.props.contents.roomId)} onClick={this.props.onClick}>
        {this.props.contents.roomId != 0 && this.displayIcons()}
        X={this.props.x} Y={this.props.y}
        <br></br>
        {JSON.stringify(this.props.contents.roomObjs)}
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
