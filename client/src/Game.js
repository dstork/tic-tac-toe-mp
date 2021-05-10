import React from 'react';
import Board from './Board.js';
import './css/Game.css';

class Game extends React.Component {
	constructor(props) {
		super(props);

		// connect to server (and retrieve state accordingly? for late joiners e.g.)

		this.state = {
			squares: Array(9).fill(null),
			player1IsNext: true,								// Player1 is always 'X', 2 is 'O'
			iAmPlayer1: this.props.iAmPlayer1
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