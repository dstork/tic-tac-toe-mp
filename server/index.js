const ws = require('ws');
const { v4: uuidv4 } = require('uuid');

const Game = require('./game.js');

const PORT = 3333;	  // API port

const g = new Game();

const wsServer = new ws.Server({ port: PORT });
wsServer.on('connection', (socket, request) => {
	const uuid = uuidv4();
	console.log(`incoming connection: ${uuid}`);
	// first player or second?
	let player1;
	if (g.players.length < 2) {
		player1 = g.players.length === 0 ? true : !g.players[0].isPlayer1;
		g.addPlayer({
			id: uuid,
			isPlayer1: player1,
			socket
		});
	} else {
		// ignore for now
		socket.close(4000, "Game full");
		return;
	}

	// 'player1' is closure'd into the function
	socket.on('message', message => {
		console.log("incoming message");
		let obj = JSON.parse(message);
		g.move(player1, +obj.square);
	});

	socket.on('close', (s, request) => {
		g.removePlayerById(uuid);
		console.log("disconnected")
	});
});

wsServer.on('close', (socket, request) => {

});