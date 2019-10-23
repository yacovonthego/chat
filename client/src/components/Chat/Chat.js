import React, { useState, useEffect } from 'react';

const Chat = (props) => {

	const [name, setName] = useState('');

	useEffect(() => {
		setName(props.location.state);

		return () => {
			setName('');
		};
	}, [props.location.state]);

	// props.location.state
	return (
			<div></div>
	)
}

export default Chat;