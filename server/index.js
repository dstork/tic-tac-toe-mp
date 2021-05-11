const express = require('express');
const ws = require('ws');
// const {v4: uuidv4} = require('uuid');

const game = require('./game.js');

const PORT = 3333;      // API port
const app = express();

const g = game();

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', (socket, request) => {
    // first player or second?
    let player1;
    if (g.players.length === 0) {
        player1 = true;
        players.push({
            isPlayer1: player1,
            socket: socket
        });
    } else if (g.players.length === 1) {
        player1 = false;
        players.push({
            isPlayer1: player1,
            socket: socket,
        });
    } else {
        // ignore for now
        socket.close(4000, "Game full");
        return;
    }

    socket.on('message', message => {
        let obj = JSON.parse(message);
        g.move(player1, +obj.square);
    });
});