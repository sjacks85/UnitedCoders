class AccusationManager {

    constructor(socket) {
      this.socket = socket;
    }


    hello() {
      console.log("HELLO");
    }
    // Method
    getSocket() {
      return this.socket;
    }
  }

  module.exports = AccusationManager;