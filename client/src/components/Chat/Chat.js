import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router';
import io from "socket.io-client";

import './Chat.css'


const Chat = (props) => {

	const [name, setName] 			= useState('');
	const [room, setRoom] 			= useState('');
	const [users, setUsers] 		= useState([]);
	const [messages, setMessages] 	= useState([]);
	const [message, setMessage] 	= useState('');
	const [redirect, setRedirect] 	= useState(false);
	const ENDPOINT 					= 'localhost:5000';
	const socket 					= useRef();

	const sendMessage = event => {
		event.preventDefault();

		if ( message ) socket.current.emit('send', message, () => setMessage(''));
	}

	useEffect(() => {

		socket.current = io(ENDPOINT);

		setName(props.location.state.name);
		setRoom(props.location.state.roomName);

		socket.current.emit('join', {name, room}, error => {
			if (error) setRedirect(true);
		});

		socket.current.on('message', resMessage => setMessages([...messages, resMessage]));

		socket.current.on('roomData', resUsers => setUsers(resUsers) );

		return () => {
			// clear state after dismount
			// console.log('destroy hook called');
			setName('');
			setRedirect(false);
			setRoom('');
			setUsers([]);

			socket.current.emit('leave');
			socket.current.disconnect();
		};
	}, [messages, name, room, props.location.state]);

	if (redirect) return <Redirect to={{ pathname: '/', state: { loginError: true } }}/>

	return (
		<div>
			<div className="outer p-medium">
				<h1 className="roboto title-chat">CHAT: {room}</h1>
				<div className="container-chat">
					<div className="container-people">
						{/* iterate over messages to loop layout */}
						{
								users.map(
									 user => 
									 <div
									 	key={ user.name }
									 	className="roomate roboto mt5"
									 >
										{ user.name }
									</div> 
								)
						}
					</div>
					<div className="container-box">
						<div className="message-box">
							{/* iterate over messages to loop layout */}
							{
								messages.map(
									mes => 
									<div
										key={ mes.text }
										className="message roboto"
									>
										<div className="message__name font-small">
											{ mes.user }: 
										</div>
										<div  className="message__body_user" >
											<div className="message__text">
												{ mes.text }
											</div>
											<div className="message__time">
												{ mes.time }
											</div>
										</div>
									</div>
								)
							}
						</div>
						<div className="container-input">
							<textarea 
								onChange ={ event => setMessage(event.target.value) }
								placeholder="Enter your message..."
								type="text" className="input input-chat roboto"
							/>
							<button 
								onClick = { event => (!message) ? null : sendMessage(event) }
								className="button button-chat p-small mt20 roboto"
							>
								Send
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Chat;