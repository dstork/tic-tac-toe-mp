import Game from './Game.js';
import './css/App.css';

function App({backend}) {
  return (
		<div className="App">
			<Game
				iAmPlayer1="true"
				backend={backend}
			/>
		</div>
  );
}

export default App;