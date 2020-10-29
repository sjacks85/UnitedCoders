
//NOTE this apparently needs to be like this and not a class in order to use callbacks, *think* because of scope
//issue, but I'm not totally positive.
var clients = [];

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
                    console.log(new_player_id, " new player id")

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
				//}
                //do we ever stop listening, or do we always listen but server manager tells us 'no' if too many?
            });


            // handle client disconnect
            socket.on('end', function () {
                console.log("Client disconnected...");
            });
        });
    },

    send: (player_id, type, message, callback, return_type=0) => {

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

        console.log("\t\t---Communication Utility sends---");

        //send over socket
        for (var i = 0; i < clients.length; i++)
        {
            //if it is a broadcast message or if this is the targeted player, send the message
            if (player_id == 0 || clients[i].id == player_id) {
                console.log("Sending game message to client " + clients[i].id + ":" + JSON.stringify(full_message))

                clients[i].socket.emit("game", full_message);
                if (callback) {
                    //console.log("Message has callback " + return_type)
                    clients[i].socket.on(return_type, callback);
				}
			}
        }

        console.log("\t\t---Communication Utility done---");

    }
}


