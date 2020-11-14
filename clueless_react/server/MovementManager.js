class MovementManager {

    constructor(communication) {
        this.communication = communication;
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
            const handler = (movement) => {
                console.log('Movement:', movement);
                var move_broadcast = {
                    "character_moved": true,
                    "weapon_moved": true,
                    "moved_character": player.id,
                    "moved_weapon": 7,
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
            }

            this.communication.send(player.id, 31, move_request, handler, 41);
        });
    }
}

module.exports = MovementManager;