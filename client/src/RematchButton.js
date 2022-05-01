function RematchButton({ws}) {

	const handleOnClick = () => {
		ws.send(JSON.stringify({
			type: "REMATCH"
		}));
	};

	return (
		<button style={{"margin-left":"20px", "background":"white", "border-width":"1px"}} onClick={handleOnClick}>Rematch</button>
	)
}

export default RematchButton;