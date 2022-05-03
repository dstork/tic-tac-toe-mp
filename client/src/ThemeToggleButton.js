import "./css/ThemeToggleButton.css";

function ThemeToggleButton({darkMode, setDarkMode}) {
	const label = "Dark Mode";

	const onSwitch = () => {
		setDarkMode(mode => {
			return !mode;
		});
	};

	return (
		<div className="container">
      <div className="toggle-switch">
        <input type="checkbox" className="checkbox"
               name={label} id={label} value={darkMode} onChange={onSwitch}/>
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
	);
}

export default ThemeToggleButton;