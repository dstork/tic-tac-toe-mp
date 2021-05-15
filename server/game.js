const calculateWinner = require('./gameUtils').calculateWinner;

const GAME_STATE = {
	NOT_STARTED: 0,
	STARTED: 1,
	FINISHED: 2
};

class Game {
	constructor() {
		this.players = [];
		this.gameState = GAME_STATE.NOT_STARTED;
		this.squares = Array(9).fill(null);
		this.player1IsNext = true;
	}

	addPlayer(p) {
		this.players.push(p);

		if (this.players.length === 2) {
			this.gameState = GAME_STATE.STARTED;

			// emit initial state - client's block event handlers until then
			for (const player of this.players) {
				player.socket.send(JSON.stringify({
					iAmPlayer1: player.isPlayer1,
					player1IsNext: this.player1IsNext,
					squares: this.squares,
					gameState: this.gameState
				}));
			}
		}
	}

	removePlayer(p) {
		for (let player in this.players) {
			if (player.socket === p.socket) {
				this.players.slice(this.players.indexOf(player), 1);
				return;
			}
		}
	}

	move(bPlayer1, iSquare) {
		if (this.squares[iSquare]) {
			// error - how to handle?
		} else {
			// check if it's the player's turn
			if (bPlayer1 !== this.player1IsNext) {
				// error - do nothing
				return;
			}
			this.squares[iSquare] = bPlayer1 ? 'X' : 'O';

			if (calculateWinner(this.squares)) {
				this.gameState = GAME_STATE.FINISHED;
			}

			// winning state is checked by client; squares are maintained here
			this.player1IsNext = !this.player1IsNext;
			for (let player of this.players) {
				player.socket.send(JSON.stringify({
					squares: this.squares,
					player1IsNext: this.player1IsNext,
					gameState: this.gameState
				}));
			}
		}
	}
}

module.exports = Game;