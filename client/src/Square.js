import './css/Square.css';

function Square({winner, onClick, value}) {
	let className = "square" + (winner ? " winner" : "");
	return (
		<button className={className} onClick={onClick}>
			{value}
		</button>
	)
}

export default Square;