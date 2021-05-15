import './css/Board.css';

import Square from './Square.js';

function Board(props) {

	const renderSquare = i => {
		return (
			<Square
				key={i}
				value={props.squares[i]}
				onClick={() => props.onClick(i)}
				winner={props.winners.includes(i)}
			/>
		);
	}

	let i = 0;
	let squares = [];
	while (i < 9) {
		squares.push(renderSquare(i));
		i++;
	}

	return (
		<div className="board">
			{squares}
		</div>
	);
}

export default Board;