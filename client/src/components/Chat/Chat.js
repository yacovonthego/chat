import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'

import './Chat.css'

const Chat = (props) => {

	const [name, setName] = useState('');

	useEffect(() => {
		setName(props.location.state.name);


		return () => {
			setName('');
		};
	}, [props.location.state]);

	const socket = io.connect('localhost:5000');
	socket.emit('login', name);

	// props.location.state
	return (
			<div className="outer outer-chat">
				<aside className="rooms roboto">
					<div className="room room1">
						room1
					</div>
					<div className="room room2">
						room2
					</div>
					<div className="room room3">
						room3
					</div>
					<div className="room room4">
						room4
					</div>
				</aside>
			</div>
	)
}

export default Chat;