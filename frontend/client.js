
var io = require('socket.io-client');
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// var CARDS = require('./game_data/cards.json');

var myArgs = process.argv.slice(2);
var username = myArgs[0];
var cards;

var url = "http://localhost:3000";

var socket = io.connect(url);

socket.on('connect', function () {
    socket.emit('join', username);
});

socket.on('turn', data => {
    console.log(data);

    rl.question('Suspect: ', (suspect) => {
        rl.question('Weapon: ', (weapon) => {
            rl.question('Room: ', (room) => {

                var suggestion = {
                    "suspect": suspect,
                    "weapon": weapon,
                    "room": room
                };

                sendSuggestion(suggestion);
            });
        });
    });
});



socket.on('assignCards', data => {
    cards = data;
    console.log("Cards:", cards);
});


socket.on('Do you have?', suggestion => {
    rl.question('do you have any of these cards?: ' + JSON.stringify(suggestion) + '\n', (card) => {
        socket.emit('I have', card);
    });
});

socket.on("Has your card", (response) => {
    console.log(response)
})


rl.on("close", function () {
    process.exit(0);
});



function sendSuggestion(suggestion) {
    console.log("Sending suggestion")
    socket.emit('suggestion', suggestion);
}



