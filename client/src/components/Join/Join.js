import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import './Join.css'

const Join = () => {

	const [name, setName] = useState('');
	const [rooms, setRooms] = useState([]);

	// data fetching patterns specified in react documentation
	useEffect(() => {	
		let ignore = false;

		// EEF instead definition and calling
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
				<Link
					className="link"
					onClick={ event => (!name) ? event.preventDefault() : null }
					to={{
						// passing state, for using socket connection later
						pathname: '/rooms',
						state: { 
							name,
							rooms
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