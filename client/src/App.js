import Game from './Game.js';

function App({backend}) {
  return (
	<Game
			iAmPlayer1="true"
	  	backend={backend}
		/>
  );
}

export default App;