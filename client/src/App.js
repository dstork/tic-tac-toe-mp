import Game from "./Game.js";
import ThemeToggleButton from "./ThemeToggleButton.js";
import {useState} from "react";
import "./css/App.css";

function App({backend}) {
	const [darkMode, setDarkMode] = useState(false);
  return (
		<div className="App" data-theme={darkMode ? "black" : "white"}>
			<ThemeToggleButton darkMode={darkMode} setDarkMode={setDarkMode}/>
				<Game
					iAmPlayer1="true"
					backend={backend}
				/>
		</div>
  );
}

export default App;