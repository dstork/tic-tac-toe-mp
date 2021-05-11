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
	}

	addPlayer(p) {
		this.players.push(p);

		if (this.players.length === 2) {
			this.gameState = GAME_STATE.STARTED;

			// emit initial state - client's block event handlers until then
			for (let player in this.players) {
				player.socket.send(JSON.stringify({
					iAmPlayer1: player.isPlayer1,
					player1IsNext: true,
					squares: this.squares,
					gameState: this.gameState
				}));
			}
		}
	}

	move(bPlayer1, iSquare) {
		if (this.square) {
			// error - how to handle?
		} else {
			this.squares[iSquare] = bPlayer1 ? 'X' : 'O';

			// winning state is checked by client; squares are maintained here

			for (let player in this.players) {
				player.socket.send(JSON.stringify({
					squares: this.squares,
					player1IsNext: !this.player1IsNext
				}));
			}
		}
	}
}

module.exports = Game;