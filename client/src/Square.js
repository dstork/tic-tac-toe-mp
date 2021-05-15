import './css/Square.css';

function Square(props) {
	let winner = props.winner;
	let className = "square" + (winner ? " winner" : "");
	return (
		<button className={className} onClick={props.onClick}>
			{props.value}
		</button>
	)
}

export default Square;