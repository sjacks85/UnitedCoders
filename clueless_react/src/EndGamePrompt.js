import React from "react";
import "./EndGamePrompt.css";

class EndGamePrompt extends React.Component {
  state = { show: this.props.state };

  showModal = () => {
    console.log("Showmodal");
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    console.log("Showww" + this.props.show);
    if (this.props.show === false) {
      return null;
    }
    return (
      <main>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <p>Modal</p>
          <p>Data</p>
        </Modal>
        {/* <button type="button" onClick={this.showModal}>
          Open
        </button> */}
      </main>
    );
  }
}
class Modal extends React.Component {
  state = {};
  render() {
    const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
    console.log("Show" + this.props.show);
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {this.props.children}
          <button onClick={this.props.handleClose}>Close</button>
        </section>
      </div>
    );
  }
}
// const Modal = ({ handleClose, show, children }) => {
//   const showHideClassName = show ? "modal display-block" : "modal display-none";
//   console.log("Show" + show);
//   return (
//     <div className={showHideClassName}>
//       <section className="modal-main">
//         {children}
//         <button onClick={handleClose}>Close</button>
//       </section>
//     </div>
//   );
// };

export default EndGamePrompt;
