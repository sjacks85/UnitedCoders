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


//NOTE this apparently needs to be like this and not a class in order to use callbacks, *think* because of scope
//issue, but I'm not totally positive.
var clients = [];
var handleSuggestion;

//KPC - Quick fix to avoid re-adding existing players, instead react client will rejoin when reloaded
var usernames = [];

module.exports = {

    startListening: (io, client_callback) => {
        io.on('connection', function (socket) {
            // If a client joins then add them to the list of clients
            socket.on('join', function (username) {
                /*need to fix this
                var exists = false;
                for (var i = 0; i < clients.length; i++) {
                    if (clients[i].id == player_id) {
                        exists = true;
                    }
                }*/
                //if (!exists) {
                if (usernames.includes(username)) {
                    //console.log(username, "already exists")
                } else {
                    console.log(username, "joined")

                    new_player_id = clients.length + 1;

                    clientObj = {
                        "id": new_player_id,
                        "socket": socket
                    };
                    clients.push(clientObj);
                    usernames.push(username);

                    playerObj = {
                        "username": username,
                        "id": new_player_id
                    };

                    client_callback(playerObj);
                }   
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

        /* TODO - we should clean up message type so it's not hardcoded in managers
         * I *think* the mapping should only be here? but not sure how best to pass
         * that info into here. 
         * 
         * */
        var full_message = {
            "game_id": 0,
            "player_id": player_id,
            "message_type": type,
            "message": message,
        }

        //send over socket
        for (var i = 0; i < clients.length; i++)
        {
            //if it is a broadcast message or if this is the targeted player, send the message
            if (player_id == 0 || clients[i].id == player_id) {

                //KPC - Changed to emit to game, so client will always look for socket.on("game")
                clients[i].socket.emit("game", full_message);
                if (callback) {
                    clients[i].socket.on(type, callback);
				}
			}
        }

    }
}


