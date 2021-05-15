const express = require('express');
const ws = require('ws');

const Game = require('./game.js');

const PORT = 3333;	  // API port
const app = express();

const g = new Game();

const wsServer = new ws.Server({ port: PORT });
wsServer.on('connection', (socket, request) => {
	console.log("incoming connection");
	// first player or second?
	let player1;
	if (g.players.length === 0) {
		player1 = true;
		g.addPlayer({
			isPlayer1: player1,
			socket
		});
	} else if (g.players.length === 1) {
		player1 = false;
		g.addPlayer({
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
});

wsServer.on('close', (socket, request) => {
	g.removePlayer({
		socket
	});
});