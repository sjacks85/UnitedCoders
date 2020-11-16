class MovementManager {

    constructor(communication, gameboard, players) {
        this.communication = communication;
        this.mGameBoard = gameboard;
        this.mLastPositions = [];
        for (var player in players) {
            this.mLastPositions[player.id] = this.mGameBoard.getCurrentPosition(player.character);
        }
    }

    move(player) {
        console.log('\n\t---MovementManager starts movement logic---');
        return new Promise((resolve) => {
            this.promptMove(player).then((movement) => {
                resolve(movement);
            });
        });
    }

    promptMove(player) {
        return new Promise((resolve) => {
            const movementHandler = (movement) => {
                console.log('Movement:', movement);
                if (movement.movement_made == "true") {
                    var new_location = valid_move_options[movement.movement_id];
                    this.mLastPositions[player.id] = new_location;

                    this.mGameBoard.handlePlayerMovement(player.character, new_location);

                }
                resolve(movement);
                // return;
            }

            var start_broadcast_string = "User " + player.username + " is starting their turn.";
            var start_broadcast = {
                "broadcast_message": start_broadcast_string
            }
            this.communication.send(0, 21, start_broadcast);


            var possible_movement = this.mGameBoard.getPossibleMovement(player.character);
            var valid_move_options = [];

            var move_request = {
                "movement_required": this.isMovementRequired(player),
                "movement_possible": possible_movement.length > 0,
                "valid_locations": []
            };

            var count = 1;
            for (var option in possible_movement) {
                var location = possible_movement[option];
                valid_move_options[count] = location;
                var move_option = {
                    "movement_id": count,
                    "location": location
                };
                count = count + 1;
                move_request.valid_locations.push(move_option);
            }

            /*
            // KPC = Added count to make movement_id unqiue
            var count = 1;
            for (var i = 0; i < 5; i++) {
                for (var j = 0; j < 5; j++) {
                    var move_option = {
                        "movement_id": count,
                        "location": [i, j]
                    };
                    count = count + 1;
                    move_request.valid_locations.push(move_option);
                }
            }*/

            this.communication.send(player.id, 31, move_request, movementHandler, 41);
        });
    }

    isMovementRequired(player) {
        var cur_pos = this.mGameBoard.getCurrentPosition(player.character);
        //if the player's character is in a room and they were moved there out of turn (in a suggestion)
        //they do not have to move to make a suggestion
        if (cur_pos != this.mLastPositions[player.id] && this.mGameBoard.isRoom(cur_pos[0], cur_pos[1])){
            return false;
        }
        //otherwise the player must move
        return true;
    }
}

module.exports = MovementManager;