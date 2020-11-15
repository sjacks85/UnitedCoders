var CARDOBJECTS = require("./game_data/cluelessMap.json"); // Might need to change the name for clarity.

class CardMapper {
  static idMapping = new Map();
  static MAP_SIZE = 0;

  /* **** STATIC FUNCTIONS THAT BELONG TO THE CARD MAPPER CLASS *** */

  // Generate Clue-Less Card Mapping.
  static generateIdMap() {
    // Get Map Size:
    CardMapper.MAP_SIZE = 0;
    CardMapper.MAP_SIZE += CARDOBJECTS.Suspects.length;
    CardMapper.MAP_SIZE += CARDOBJECTS.Weapons.length;
    CardMapper.MAP_SIZE += CARDOBJECTS.Rooms.length;

    // Add Suspects to "Master Map"...
    for (const suspect of CARDOBJECTS.Suspects) {
      CardMapper.idMapping[suspect.Id] = suspect;
    }
    // Add Weapons to "Master Map"...
    for (const weapon of CARDOBJECTS.Weapons) {
      CardMapper.idMapping[weapon.Id] = weapon;
    }
    // Add Rooms to "Master Map"...
    for (const room of CARDOBJECTS.Rooms) {
      CardMapper.idMapping[room.Id] = room;
    }
    return;
  }

  // Get Clue-Less Card Object by ID.
  static getCardById(id) {
    return CardMapper.idMapping[id];
  }

  // Get Clue-Less Card Name by ID.
  static getCardNameById(id) {
    return CardMapper.idMapping[id].Name;
  }

  // Get Clue-Less Card Name by ID.
  static getCardImgById(id) {
    return CardMapper.idMapping[id].Img;
  }

  // Get ID Array of All Suspects.
  static getAllSuspects() {
    var suspectIdArray = [];
    CARDOBJECTS.Suspects.forEach((element) => {
      suspectIdArray.push(element.Id);
    });
    return suspectIdArray;
  }

  // Get ID Array of All Weapons.
  static getAllWeapons() {
    var weaponIdArray = [];
    CARDOBJECTS.Weapons.forEach((element) => {
      weaponIdArray.push(element.Id);
    });
    return weaponIdArray;
  }

  // Get ID Array of All Rooms.
  static getAllRooms() {
    var roomIdArray = [];
    CARDOBJECTS.Rooms.forEach((element) => {
      roomIdArray.push(element.Id);
    });
    return roomIdArray;
  }
}
module.exports = CardMapper;
