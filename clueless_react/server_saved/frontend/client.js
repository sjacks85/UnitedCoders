

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
    console.log("Connected")
    socket.emit('join', username);
});

socket.on('suggestion', data => {
    console.log(data);

    rl.question('Suspect: ', (suspect) => {
        rl.question('Weapon: ', (weapon) => {
            rl.question('Room: ', (room) => {

                var suggestion = {
                    "suspect": suspect,
                    "weapon": weapon,
                    "room": room
                };

                socket.emit('suggestion', suggestion);
            });
        });
    });
});


socket.on("ping", message => {
    console.log(message);
    socket.emit("pong", "pong");
});




socket.on('assignCards', data => {
    cards = data;
    console.log("Cards:", cards);
});


socket.on('disprove', suggestion => {
    rl.question('do you have any of these cards?: ' + JSON.stringify(suggestion) + '\n', (card) => {
        socket.emit('disprove', card);
    });
});

socket.on('movement', move => {
    console.log(move);

    rl.question('New Location: ', (new_room) => {
        var movement = {
            "movement": new_room
        };
        socket.emit('movement', movement);
    });
});

socket.on('accusation', accusation => {
    console.log(accusation);

    rl.question('Accuse?: ', (accuse_res) => {
        var accuse = {
            "accuse": accuse_res
        };
        socket.emit('accusation', accuse);
    });
});


socket.on("disprove server response", (response) => {
    console.log(response)
});


rl.on("close", function () {
    process.exit(0);
});