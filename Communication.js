/*
class Communication {

    constructor(io, server_callback, clients = []) {
        this.mIo = io;
        this.mServerCallback = server_callback;
        this.mClients = clients;
        console.log(this.mClients);
    }

    setSuggestionHandler(suggestionHandler) {
        this.mSuggestionHandler = suggestionHandler;
	}

    startListening(new_callback) {

        console.log(this.mClients);
        this.mIo.on('connection', function (socket) {
            // If a client joins then add them to the list of clients
            socket.on('join', function (username) {
                console.log(username, "joined");
                console.log(this.mClients);

                //var new_player_id = 1;
                var new_player_id = this.mClients.length + 1;

                var clientObj = {
                    "id": new_player_id,
                    "socket": socket
                };
                this.mClients.push(clientObj);

                var playerObj = {
                    "username": username,
                    "id": new_player_id
                };

                new_callback(playerObj);
                //this.mServerCallback(playerObj);

                //do we ever stop listening, or do we always listen but server manager tells us 'no' if too many?
            });


            // handle client disconnect
            socket.on('end', function () {
                console.log("Client disconnected...");
            });

            socket.once('suggestion', function () {
                this.mSuggestionHandler();
            });

        });
    }

    send(player_id, type, message){
        //attach header
        //send over socket

        //there's got to be a more elegant way to do this
        for(var i = 0; i < this.mClients.length; i++)
        {
            if (this.mClients[i].id == player_id) {
                this.mClients[i].socket.emit(type, message);
            }
        }

    }

    test() {
        console.log('worked');
    }


}
module.exports = Communication;
*/

var clients = [];
var handleSuggestion;

module.exports = {
    /*
    setSuggestionCallback: (callback) => {
        handleSuggestion = callback;
    },*/

    startListening: (io, client_callback) => {
        io.on('connection', function (socket) {
            // If a client joins then add them to the list of clients
            socket.on('join', function (username) {
                console.log(username, "joined")

                new_player_id = clients.length + 1;

                clientObj = {
                    "id": new_player_id,
                    "socket": socket
                };
                clients.push(clientObj);

                playerObj = {
                    "username": username,
                    "id": new_player_id
                };

                client_callback(playerObj);

                //do we ever stop listening, or do we always listen but server manager tells us 'no' if too many?
            });


            // handle client disconnect
            socket.on('end', function () {
                console.log("Client disconnected...");
            });
            /*
            // handle the event sent with socket.send()
            socket.on('message', data => {
                console.log(data);
            });

            
            // handle socket.emit() suggestion
            socket.on('suggestion', suggestion => {
                console.log(suggestion);
                currSuggestion = suggestion;

                clients[askedClientIndex].socket.emit("Do you have?", currSuggestion);

            }); */

            //socket.once('suggestion', handleSuggestion);

            /*
            socket.on("I have", (card) => {
                if (card.toUpperCase() === "NO" && (askedClientIndex + 2) < clients.length) {
                    //ask next client
                    askedClientIndex++;
                    clients[askedClientIndex].socket.emit("Do you have?", currSuggestion);

                } else if (card.toUpperCase() === "NO") {
                    askedClientIndex = 0;
                    currClient.socket.emit("Has your card", "No player has your card");
                    nextTurn();
                } else {
                    currClient.socket.emit("Has your card", clients[askedClientIndex].username + " has the card: " + card); //send client which has the card
                    nextTurn();
                }
            }); */
        });
    },

    send: (player_id, type, message, callback) => {
        //attach header
        //send over socket
        //there's got to be a more elegant way to do this
        for (var i = 0; i < clients.length; i++)
        {
            if (clients[i].id == player_id) {
                clients[i].socket.emit(type, message);
                if (callback) {
                    clients[i].socket.on(type, callback);
				}
			}
        }

    },

 
}


