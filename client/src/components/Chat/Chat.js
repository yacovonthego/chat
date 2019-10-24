import React, { useState, useEffect } from 'react';
import io from "socket.io-client";

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
			<h1>CHAT</h1>
			{users}
			<div className="container-chat">
				<input type="text" className="input input-chat"/>
				<button className="button button-chat">Send</button>
			</div>
		</div>
	)
}

export default Chat;