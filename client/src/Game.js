import React from 'react';
import Board from './Board.js';
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
	}

	componentDidMount() {
		const ws = new WebSocket(this.backend);

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
	}

	handleClick(i) {
		// check if field still empty, then report to server
		const squares = this.state.squares.slice();
		if (!squares[i]) {
			// update to server

			// for now, mock server response to test CSS
			squares[i] = this.state.player1IsNext ? 'X' : 'O';
			this.setState({
				squares
			});
		}
	}

	render() {
		let text;
		if (this.state.player1IsNext && this.state.iAmPlayer1) {
			text = "It's your turn!";
		} else {
			text = "Waiting for opponent...";
		}

		let myTurn = this.state.player1IsNext && this.state.iAmPlayer1;
		myTurn &= this.state.gameState === GAME_STATE.GAME_STATE;
		return (
			<div className="game">
				<div className="header">
					{text}
				</div>
				<Board
					squares={this.state.squares}
					myTurn={myTurn}
					onClick={myTurn ? this.handleClick.bind(this) : null}
					winners={[]}	// mocked
				/>
			</div>
		)
	}
}

export default Game;