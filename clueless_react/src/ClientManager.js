
import { setMessage } from './Message.js'
import React, { Component } from 'react';

var io = require('socket.io-client');

// var CARDS = require('./game_data/cards.json');

var myArgs = process.argv.slice(2);
var cards;

// Start socket and export it for others to use
var url = "http://localhost:5000";
const socket = io.connect(url);
export { socket }

// Called by App to join
const startClient = function(port) {
    
    socket.on('connect', function () {
        socket.emit('join', port);
    });

};

// socket.on('turn', data => {
//     console.log(data);
//     alert("CLIENTMANAGER: Your turn to make suggestion");
    
//     var suggestion = {
//         "suspect": "peacock",
//         "weapon": "gun",
//         "room": "kitchen"
//     };

//     //sendSuggestion(suggestion);
// });

socket.on('assignCards', data => {
    cards = data;
    console.log("Cards:", cards);
});

socket.on('Do you have?', suggestion => {
    alert('do you have any of these cards?: ' + JSON.stringify(suggestion))
    socket.emit('I have gun');
});

socket.on("Has your card", (response) => {
    alert('Has your card:' + response)
    console.log(response)
})

// Messages to server from client, called by user input
function makeMovement(move, room) {

        // “movement_made”:
        // “movement_id”:
        // }
        // movement_made (bool) - True if the player has moved to a new location, false otherwise. 
        // new_location (int) - The unique ID of the chosen movement option. 
        
    var movement = {
        "movement_made" : move,
        "movement_id": 1, //KPC - Hardcoded
    };
    console.log('movement request: ' + move + room)    
    console.log("makeMovement: " + JSON.stringify(movement));
    //socket.emit('movement', movement);
    //socket.emit('game', movement);
    socket.emit(31, movement)
}

function makeSuggestion(person, weapon) {

        // “suggested_character”:
        // “suggested_weapon”:
        // }
        // suggested_character (String) - The name of the character that was suggested.
        // suggested_weapon (String) - The name ID if the weapon that was suggested.
        
    var suggestion = {
        "suspect": person,
        "weapon": weapon
    };
    console.log('suggestion request: ' + person + weapon)
    console.log("makeSuggestion: " + JSON.stringify(suggestion));
    socket.emit(32, suggestion);
}

function makeDisprove(disprove, card) {

    // “suggestion_id”:
    // “can_disprove”:
    // “disprove_card”:
    // }
    // suggestion_id (int) - The unique ID of the suggestion being disproven.
    // can_disprove (bool) - True if the suggestion is disproved, false otherwise.
    // disprove_card (String) - The card used to disprove the suggestion; only populated if can_disprove is true.
    
    var disprove = {
        "disprove" : disprove,
        "card" : card
    }
    console.log('disprove request: ' + disprove + card)
    console.log("makeDisprove: " + JSON.stringify(disprove));
    socket.emit(33, disprove);
}

function makeAccusation(accuse, person, room, weapon) {

        // “accused_room”:
        // “accused_character”:
        // “accused_weapon”:
        // }
        // accused-room (String) - The name of the room that was accused. 
        // accused_character (String) - The name of the character that was accused.
        // accused_weapon (String) - The name ID if the weapon that was accused.
        
    var accusation = {
        "accusation": accuse,
        "suspect": person,
        "weapon": weapon,
        "room": room
    };
    console.log('accusation request: ' + accuse + person + weapon + room)
    console.log("makeAccusation: " + JSON.stringify(accusation));
    socket.emit(34, accusation);
}

export { startClient, makeMovement, makeSuggestion, makeDisprove, makeAccusation };