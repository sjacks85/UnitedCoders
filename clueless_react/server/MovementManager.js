class MovementManager {

    constructor(communication) {
        this.communication = communication;
    }

    move(player) {
        return new Promise((resolve) => {
            this.promptMove(player).then((movement) => {
                resolve(movement);
            });
        });
    }

    promptMove(player) {
        return new Promise((resolve) => {
            const handler = (movement) => {
                console.log('Movement:', movement);
                var move_broadcast = {
                    "character_moved": true,
                    "weapon_moved": false,
                    "moved_character": player.id,
                    "moved_weapon": "",
                    "new_character_location": movement.new_location,
                    "new_weapon_location": []
                };
                this.communication.send(0, 22, move_broadcast);
                resolve(movement);
                // return;
            }

            //TODO do actual validation/logic here
            var move_request = {
                "movement_required": true,
                "movement_possible": true,
                "valid_locations": []
            };

            for (var i = 0; i < 5; i++) {
                for (var j = 0; j < 5; j++) {
                    var move_option = {
                        "movement_id": i,
                        "location": [i, j]
                    };
                    move_request.valid_locations.push(move_option);
                }
            }

            this.communication.send(player.id, 31, move_request, handler);
        });
    }
}

module.exports = MovementManager;