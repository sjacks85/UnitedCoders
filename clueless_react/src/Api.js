import { socket } from './ClientManager.js'

// Test timer to display
function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
}

function subscribeToMessage(cb) {
  socket.on('message', message => cb(null, message));
}

function subscribeToArray(cb) {
  socket.on('message', message => cb(null, message));
}

// Messages sent from server to client
function subscribeToCards(cb) {
  socket.on('assignCards', message => cb(null, message));
}
function subscribeToTurn(cb) {
  socket.on('turn', message => cb(null, message));
}
function subscribeToMovement(cb) {
  socket.on('movement', message => cb(null, message));
}
function subscribeToSuggestion(cb) {
  socket.on('suggestion', message => cb(null, message));
}
function subscribeToDisprove(cb) {
  socket.on('Do you have?', message => cb(null, message));
  //socket.on('disprove', message => cb(null, message));
}
function subscribeToAccusation(cb) {
  socket.on('accusation', message => cb(null, message));
}

export { subscribeToTimer, subscribeToMessage, subscribeToArray, subscribeToCards, subscribeToTurn,
  subscribeToMovement, subscribeToSuggestion, subscribeToDisprove, subscribeToAccusation };