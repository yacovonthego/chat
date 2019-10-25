import React, { useState, useEffect } from 'react';
import io from "socket.io-client";

import './Chat.css'

const ENDPOINT 	= 'localhost:5000';
const socket 	= io(ENDPOINT);

const Chat = (props) => {

	const [name, setName] 		= useState('');
	const [room, setRoom] 		= useState('');
	const [users, setUsers] 	= useState([]);
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');

	useEffect(() => {
		setName(props.location.state.name);
		setRoom(props.location.state.roomName);

		socket.emit('join', {name, room}, error => {
			if (error) console.log(error);
		});

		return () => {
			// clear state after dismount
			setName('');
			setRoom('');
		};
	}, [name, room, props.location.state]);

	useEffect(() => {
		socket.on('usersInRoom', resUsers => {
			console.log(users);
		});

		socket.on('message', message => setMessages([...messages, message]));
	
		return () => {
			socket.emit('leave')
		};
	}, [users, messages]);

	return (
		<div>
			<div className="outer p-medium">
				<h1 className="roboto title-chat">CHAT: {room}</h1>
				<div className="container-chat">
					<div className="container-people">

					</div>
					<div className="container-box">
						<div className="message-box">

						</div>
						<div className="container-input">
							<textarea 
								placeholder="Enter your message..."
								type="text" className="input input-chat roboto"
							/>
							<button className="button button-chat p-small mt20 roboto">Send</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Chat;