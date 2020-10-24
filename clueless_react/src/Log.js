import React from 'react';
import './Divider.css';
import UserInput from './UserInput';
import Message from './Message';

class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {array: [{type: 'broadcast', message: "austin"},{type: 'broadcast', message: "austin"}]};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    //this.addLog()
  }

  addLog = () => {

    alert("addLog")
    console.log(this.state)
    //this.setState({array: this.state.array.concat([{type: 'broadcast', message: "amanda"}])})
    let newElement = [{type: 'broadcast', message: "amanda"}];
    this.setState({array: newElement.concat(this.state.array)})

    //let temp = [{type: 'broadcast', message: "amanda"}].concat(this.state.array)
    //this.state = {array: temp};
    console.log("AddLog " + this.state)

    };

  render() {
      return (
      <div>
        {this.state.array.map(elem => (
          <p>{elem.type}: {elem.message}</p>
        ))}
      </div>
      );
    }
  }

export default Log;
