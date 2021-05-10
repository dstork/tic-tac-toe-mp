import './css/Board.css';

function Board(props) {

	const renderSquare = i => {
		return (
			<Square
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

function Square(props) {
	let winner = props.winner;
	let className = "square" + (winner ? " winner" : "");
	return (
		<button className={className} onClick={props.onClick}>
			{props.value}
		</button>
	)
}

export default Board;