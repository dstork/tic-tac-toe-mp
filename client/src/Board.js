import './css/Board.css';

import Square from './Square.js';

function Board({squares, onClick, winners}) {

	const renderSquare = sq => {
		return (
			<Square
				key={sq}
				value={squares[sq]}
				onClick={() => onClick(sq)}
				winner={winners.includes(sq)}
			/>
		);
	}

	let i = 0;
	const squareArray = [];
	while (i < 9) {
		squareArray.push(renderSquare(i));
		i++;
	}

	return (
		<div className="board">
			{squareArray}
		</div>
	);
}

export default Board;