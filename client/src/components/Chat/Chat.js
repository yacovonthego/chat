import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router';
import io from "socket.io-client";
import DummyScroll from '../DummyScroll/DummyScroll'
// initial imports

import './Chat.css'
//style imports

const Chat = (props) => {

	// state
	const [name, setName] 					= useState('');
	const [room, setRoom] 					= useState('');
	const [users, setUsers] 				= useState([]);
	const [messages, setMessages] 			= useState([]);
	const [message, setMessage] 			= useState('');
	const [uriRedirect, setUriRedirect] 	= useState(false);
	// login error redirect state
	const [loginRedirect, setLoginRedirect] = useState(false);
	const ENDPOINT 							= 'https://tr-chat-ff.herokuapp.com/';
	// using useRef to store socket as mentioned in docs
	const socket 							= useRef();

	// message sending handler
	const sendMessage = event => {
		event.preventDefault();

		if ( message ) socket.current.emit('send', message, () => setMessage(''));
	}

	const getRoomFromUri = (path) => {
		const index = path.lastIndexOf('/') + 1;
		return path.slice(index, path.length);
	}


	// update component on name, room, messages changing
	useEffect(() => {
			
		// if we came here the regular way, from login and rooms
		if (props.location.state) {
			// specify aour connection point and wmit io.connection event
			socket.current = io(ENDPOINT);

			// setting our state from parametres we got in previous components

			setName(props.location.state.name);
			setRoom(props.location.state.room);

			socket.current.emit('join', {name, room}, error => {
				// login error handler
				if (error) setLoginRedirect(true);
			});

			// saving messages to state
			socket.current.on('message', resMessage => setMessages([...messages, resMessage]));

			// saving users to state
			socket.current.on('roomData', resUsers => setUsers(resUsers) );

			return () => {
				// clear state after dismount and disconnect from socket
				setName('');
				setLoginRedirect(false);
				setRoom('');
				setUsers([]);

				// emitting leave event and disconnection from socket
				socket.current.emit('leave');
				socket.current.disconnect();
			};
		} else {
			// if we came to this condition, it means, we're unlogged
			setUriRedirect(true);
			
			// we don't need to save state of redirection 
			return () => setUriRedirect(false);
		}
	}, [messages, name, room, props.location.state]);

	// if we came here unlogged, redirect to login page, and then come back logged
	if (uriRedirect) return <Redirect to={{ pathname: '/', state: { uriError: true, roomFrom: getRoomFromUri(props.location.pathname) } }}/>

	// if login error occured, redirect to login page
	if (loginRedirect) return <Redirect to={{ pathname: '/', state: { loginError: true } }}/>

	return (
		<div>
			<div className="outer p-medium">
				<h1 className="roboto title-chat">CHAT: {room}</h1>
				<div className="container-chat">
					<div className="container-people">
						{/* iterate over messages to loop layout, using username as key, becaause it's unique */}
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
							{/* iterate over messages to loop layout, using index as key, because we will never delete previous messages */}
							{
								messages.map(
									(mes, index) => 
									<div
										key={ index }
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
							{/* because dummy is always at the bottom, box will scroll to the bottom every render */}
							<DummyScroll />
						</div>
						<div className="container-input">
							<textarea 
								// set our current message state on change in input 
								onChange ={ event => setMessage(event.target.value) }
								placeholder="Enter your message..."
								type="text" className="input input-chat roboto"
							/>
							<button 
								// if there's message to send, stored in state, call fucntion that emits sending event 
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