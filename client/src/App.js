import Game from './Game.js';

function App(props) {
  return (
    <Game
			iAmPlayer1="true"
      backend={props.backend}
		/>
  );
}

export default App;
