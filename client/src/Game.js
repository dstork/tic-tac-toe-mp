import React from 'react';
import Board from './Board.js';
import { calculateWinner } from './utils/GameUtils.js';
import './css/Game.css';

const GAME_STATE = {
	NOT_STARTED: 0,
	STARTED: 1,
	FINISHED: 2
};
class Game extends React.Component {
	constructor(props) {
		super(props);

		this.backend = props.backend;

		this.state = {
			squares: Array(9).fill(null),
			player1IsNext: true,								// Player1 is always 'X', 2 is 'O'
			iAmPlayer1: props.iAmPlayer1,
			gameState: GAME_STATE.NOT_STARTED
		};

		this.componentCleanup = this.componentCleanup.bind(this);
	}

	componentDidMount() {
		const ws = new WebSocket(this.backend);
		this.ws = ws;

		ws.onopen = () => {
			console.log(`connected to ${ws.url}`);
		};

		ws.onmessage = evt => {
			const message = JSON.parse(evt.data);
			this.setState(message);
		};

		ws.onclose = () => {
			console.log('disconnected');
		};

		window.addEventListener('beforeunload', this.componentCleanup);
	}

	componentWillUnmount() {
		this.componentCleanup();
		window.removeEventListener('beforeunload', this.componentCleanup);
	}

	componentCleanup() {
		this.ws.close(3001);
	}

	handleClick(i) {
		// check if field still empty, then report to server
		const squares = this.state.squares.slice();
		if (!squares[i]) {
			// update to server
			this.ws.send(JSON.stringify({
				square: i
			}));
		}
	}

	render() {
		let text;
		let winners = [];
		if (this.state.gameState === GAME_STATE.NOT_STARTED) {
			text = "Waiting for game to start";
		} else if (this.state.gameState === GAME_STATE.FINISHED) {
			const winObj = calculateWinner(this.state.squares);
			if (winObj.winner /* player1 */ === this.state.iAmPlayer1) {
				text = "You win!";
			} else {
				text = "You lose!";
			}
			winners = winObj.squares;
		} else if (this.state.player1IsNext === this.state.iAmPlayer1) {
			text = "It's your turn!";
		} else {
			text = "Waiting for opponent...";
		}

		let myTurn = this.state.player1IsNext === this.state.iAmPlayer1;
		myTurn &= this.state.gameState === GAME_STATE.STARTED;
		return (
			<div className="game">
				<div className="header">
					{text}
				</div>
				<Board
					squares={this.state.squares}
					myTurn={myTurn}
					onClick={myTurn ? this.handleClick.bind(this) : () => { }}
					winners={winners}	// mocked
				/>
			</div>
		)
	}
}

export default Game;