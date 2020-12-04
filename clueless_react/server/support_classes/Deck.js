var CARDOBJECTS = require("./cluelessmap.json"); // Might need to change the name for clarity.
// ../game_data/cluelessmap.json
// **** Thoughts about the Implementation/Improvements ***
// (1) Should we assign Card Objects to Players/Enevelope (By adding player id to an "Assigned Player" field.)
// (2) Should the local deck be utilized in anyway? Or does it only really have one purpose (to shuffle/distribute cards)?

// The following class is used for Card Mappins, Deck Generation, Shuffling, and Player Hand Assignments:

class Deck {
  static idMapping = new Map(); // Note: Key is a NUMBER - This can be changed if a string is preferred.
  static DECK_SIZE = 0;

  constructor() {
    this.deck = []; // "Static" Option: static deck = []; | An Array of Card Objects
    this.envelope = []; // "Static" Option: static envelope = []; | An Array of Card Objects
    Deck.generateIdMap();
  }
  /* **** STATIC FUNCTIONS THAT BELONG TO THE DECK CLASS *** */

  // Generate Clue-Less Card Mapping.
  static generateIdMap() {
    // Get Deck Size:
    Deck.DECK_SIZE = 0;
    Deck.DECK_SIZE += CARDOBJECTS.Suspects.length;
    Deck.DECK_SIZE += CARDOBJECTS.Weapons.length;
    Deck.DECK_SIZE += CARDOBJECTS.Rooms.length;

    // Add Suspects to "Master Map"...
    for (const suspect of CARDOBJECTS.Suspects) {
      Deck.idMapping[suspect.Id] = suspect;
    }
    // Add Weapons to "Master Map"...
    for (const weapon of CARDOBJECTS.Weapons) {
      Deck.idMapping[weapon.Id] = weapon;
    }
    // Add Rooms to "Master Map"...
    for (const room of CARDOBJECTS.Rooms) {
      Deck.idMapping[room.Id] = room;
    }
    return;
  }

  // Get Clue-Less Card Object by ID.
  static getCardById(id) {
    return Deck.idMapping[id];
  }

  // Get Clue-Less Card Name by ID.
  static getCardNameById(id) {
    return Deck.idMapping[id].Name;
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

  /* **** FUNCTIONS THAT BELONG TO THE DECK INSTANCE *** */

  // Generate/Populate Local Array of Card Objects from the Id Mapping.
  populateLocalDeck() {
    // Populate the map if it isn't already populated.
    if (Deck.DECK_SIZE == 0) {
      Deck.generateIdMap();
    }
    // Populate the (local) "Deck" Array.
    for (let i = 0; i < Deck.DECK_SIZE; i++) {
      // Note (1): "Unshift" adds an element to the front of an array.
      // Note (2): "Push" adds an element to the end of an array.
      this.deck.push(Deck.idMapping[i]);
    }
  }

  // Remove Card from (Local) Deck. NOT USED...
  removeCard(id) {
    var removedCard;
    deck.forEach((element) => {
      // The element associated with the id provided is removed from the deck array.
      if (element.id == id) {
        removedCard = element;
        var index = deck.indexOf(element);
        deck.splice(index, 1);
      }
    });
    return removedCard;
  }

  // Generate/Populate Clue-Less Card Envelope | Assign 3 Cards to "Murder Scene" Envelope & Remove these 3 cards from the main deck.
  // NOTE: JavaScript is weird about Nested Functions, so I ended up with this monster :/
  generateEnvelope() {
    // Randomly select id from Suspects; Remove from Deck and Add to Envelope.
    var randomSuspect =
      CARDOBJECTS.Suspects[
        Math.floor(Math.random() * CARDOBJECTS.Suspects.length)
      ];
    this.deck.forEach((element) => {
      // The element associated with the id provided is removed from the deck array.
      if (element.Id == randomSuspect.Id) {
        this.deck.splice(this.deck.indexOf(element), 1);
      }
    });
    this.envelope.push(randomSuspect);

    // Randomly select id from Weapons; Remove from Deck and Add to Envelope.
    var randomWeapon =
      CARDOBJECTS.Weapons[
        Math.floor(Math.random() * CARDOBJECTS.Weapons.length)
      ];
    this.deck.forEach((element) => {
      // The element associated with the id provided is removed from the deck array.
      if (element.Id == randomWeapon.Id) {
        this.deck.splice(this.deck.indexOf(element), 1);
      }
    });
    this.envelope.push(randomWeapon);

    // Randomly select id from Rooms; Remove from Deck and Add to Envelope.
    var randomRoom =
      CARDOBJECTS.Rooms[Math.floor(Math.random() * CARDOBJECTS.Rooms.length)];
    this.deck.forEach((element) => {
      // The element associated with the id provided is removed from the deck array.
      if (element.Id == randomRoom.Id) {
        this.deck.splice(this.deck.indexOf(element), 1);
      }
    });
    this.envelope.push(randomRoom);
  }

  // Shuffle the Main Deck.
  shuffleDeck() {
    var copyOfDeck = this.deck;
    var shuffledDeck = [];
    while (copyOfDeck.length > 0) {
      var randomCardObj =
        copyOfDeck[Math.floor(Math.random() * copyOfDeck.length)];
      var index = copyOfDeck.indexOf(randomCardObj);
      shuffledDeck.push(this.deck.splice(index, 1)[0]);
    }
    this.deck = shuffledDeck;
  }

  // Distribute (Shuffled) Deck Cards | Create an N-Player x 1 where Row # = Player Assignment and Columns = Array of Ids. Return this array.
  generatePlayerHands(numPlayers) {
    var playerHandAssignments = [];
    for (let i = 0; i < numPlayers; i++) {
      var cardIdArray = [];
      playerHandAssignments.push(cardIdArray);
    }
    this.deck.forEach((element) => {
      var playerNumberIndex = this.deck.indexOf(element) % numPlayers;
      playerHandAssignments[playerNumberIndex].push(element.Id);
    });
    return playerHandAssignments;
  }
}
module.exports = Deck;
