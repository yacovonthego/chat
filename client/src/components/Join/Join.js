import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
// initial imports

import './Join.css'
// style imports

const Join = (props) => {

	const [name, setName] 				= useState('');
	const [rooms, setRooms] 			= useState([]);
	const [loginError, setLoginError] 	= useState(false);
	const [uriError, setUriError] 		= useState(false);

	// data fetching patterns specified in react documentation
	// no need to use bidirectional communication just to get an array :^)
	useEffect(() => {
		// wether we should update our call or not	
		let ignore = false;

		// EEF instead definition and calling
		// remember to check different if locations
		(async function fetchData() {
		 	axios.get('http://localhost:5000/get-rooms')
		  		 .then(response => {
					if (!ignore) setRooms(response.data);
				   })
		  		 .catch((error) => {});
		})();

		// ignore used for cleanup, to prevent memory leaks
		return () => {
			ignore = true;
		}

	  });

	useEffect(() => {
		const state = props.location.state;
		if (typeof(state) !== "undefined") {
			if (state.loginError) setLoginError(true);
			if (state.uriError) setUriError(true);
		}
		return () => {
			setLoginError(false);
			setUriError(false);
		};
	}, [props.location]);

	return (
		<div className="outer outer-join">
			<div className="form form-login">
				<h1 className="roboto font-big">Join</h1>
				<input 
					onChange={ (event) => setName(event.target.value) }
					placeholder="Enter your name"
					type="text" 
					className="input input-login mt20 roboto p-medium"
				/>
				{/* duct tape for login loginError handling :^() */}
				{
					loginError &&
					<div className="login-error roboto">Username is taken, try new one</div>
				}
				{/* another duct tape for uriError handling :^B */}
				{
					uriError &&
					<div className="login-error roboto">Login first, please</div>
				}
				<Link
					className="link"
					onClick={ event => (!name) ? event.preventDefault() : null }
					to={{
						// passing state, for using socket connection later
						pathname: uriError ? `/chat/${props.location.state.roomFrom}` : '/rooms',
						state: { 
							name,
							room: uriError ? props.location.state.roomFrom : rooms
						}
					}}
				>
					<button className="button button-form mt20 roboto p-small">
						Sign in
					</button>
				</Link>
			</div>
		</div>
	)
}

export default Join;