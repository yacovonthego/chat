import React, { useState, useEffect } from 'react';
import io from "socket.io-client";

let socket = null;

const Chat = (props) => {

	const [name, setName] 		= useState('');
	const [room, setRoom] 		= useState('');
	const [users, setUsers] 	= useState([]);
	const ENDPOINT 				= 'localhost:5000'

	useEffect(() => {
		setName(props.location.state.name);
		setRoom(props.location.state.roomName);

		// connection call io on connection on server
		socket = io(ENDPOINT);

		socket.emit('join', { name, room }, (error) => {
			if ( error ) console.log(error);
		});

		return () => {
			// clear state after dismount
			setName('');
			setRoom('');

			// emit disconnect event and close socket connection after dismount
			console.log('disconnected');
			socket.emit('leave', { name, room }, (error) => {
				console.log(error);
			});
			socket.off();
		};
	}, [name, room, props.location.state]);

	useEffect(() => {
		
		socket.on('joined', (resUsers) => {
			setUsers(resUsers);
			console.log(users);	
		});

		return () => {
			setUsers([]);
		};
	}, [users]);
	

	return (
		<div>
			<h1>CHAT</h1>
		</div>
	)
}

export default Chat;