import React, { Component } from 'react';

class Message extends Component {
  state = {
    getBody: ''
  };
  
  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null;
  }
  
  getItems() {
    //http://node-express-env.eba-m3dz2nxw.us-east-2.elasticbeanstalk.com/test
    //Get request and then assign it to state.getBoby
    //return state.getBody in render
    //Could also unshift into array, and return the array like Divider:Stubbed_Messages
  }

  componentDidMount() {
    this.getItems();
    //Starting timer to fetch every 5 seconds
    this.timer = setInterval(()=> this.getItems(), 5000);
  }
  
render() {
    return (
        <p>!{this.state.getBody}!</p>
    );
  }
}

export default Message;