import React from "react";
class Popup extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <br></br>
          {this.props.children}
          <br></br>
          <button onClick={this.props.closePopup}>Close</button>
        </div>
      </div>
    );
  }
}
class Prompt extends React.Component {
  constructor() {
    super();
    this.state = {
      show: true,
    };
    this.togglePopup = this.togglePopup.bind(this)
  }
  togglePopup() {
    console.log("TOGGLEPOPUP")
    this.setState({
      show: false,
    });
  }
  static getDerivedStateFromProps(props, state) {
    //console.log("getDerivedStateFromProps");
    console.log(props.show)
    console.log(state.show)

    var newShow = state.show;

    if (props.show === true && state.show === false) {
      console.log("FOUND")
      newShow = true;
    }
    return {
      show: newShow
    }
  }

  render() {
    return (
      <div>
        {this.state.show ? (
          <Popup closePopup={this.togglePopup.bind(this)} >
            {this.props.children}
          </Popup>
        ) : null}
      </div>
    );
  }
}
export default Prompt;
