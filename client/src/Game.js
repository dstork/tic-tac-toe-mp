import {useEffect, useState, useRef} from 'react';
import Board from './Board.js';
import RematchButton from './RematchButton.js';
import { calculateWinner } from './utils/GameUtils.js';
import './css/Game.css';

const GAME_STATE = {
	NOT_STARTED: 0,
	STARTED: 1,
	FINISHED: 2
};

function Game({backend, iiAmPlayer1}) {
	const [state, setState] = useState({
		squares: Array(9).fill(null),
		player1IsNext: true,
		iAmPlayer1: iiAmPlayer1,
		gameState: GAME_STATE.NOT_STARTED
	});

	const ws = useRef(null);

	useEffect(() => {
		ws.current = new WebSocket(backend);

		ws.current.onopen = () => {
			console.log(`connected to ${ws.current.url}`);
		};

		ws.current.onmessage = evt => {
			const message = JSON.parse(evt.data);
			setState(prevState => {
				return {...prevState, ...message};
			});
		};

		ws.current.onclose = () => {
			console.log('disconnected');
		};

		return (() => ws.current.close(3001));
	}, [backend]);

	const handleClick = i => {
		// check if field still empty, then report to server
		// const squares = squares.slice();
		if (!state.squares[i]) {
			// update to server
			ws.current.send(JSON.stringify({
				type: "MOVE",
				square: i
			}));
		}
	}

	let text;
	let winners = [];
	if (state.gameState === GAME_STATE.NOT_STARTED) {
		text = "Waiting for game to start";
	} else if (state.gameState === GAME_STATE.FINISHED) {
		const winObj = calculateWinner(state.squares);
		if (winObj.winner /* player1 */ === state.iAmPlayer1) {
			text = "You win!";
		} else {
			text = "You lose!";
		}
		winners = winObj.squares;
	} else if (state.player1IsNext === state.iAmPlayer1) {
		text = "It's your turn!";
	} else {
		text = "Waiting for opponent...";
	}

	let myTurn = state.player1IsNext === state.iAmPlayer1;
	myTurn &= state.gameState === GAME_STATE.STARTED;

	return (
		<div className="game">
			<div className="header">
				{text}
				{ state.gameState === GAME_STATE.FINISHED && <RematchButton ws={ws.current}/>}
			</div>
			<Board
				squares={state.squares}
				myTurn={myTurn}
				onClick={myTurn ? handleClick : () => {}}
				winners={winners}	// mocked
			/>
		</div>
	)
}

export default Game;