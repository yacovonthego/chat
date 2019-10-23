import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import './Join.css'

const Join = () => {

	const [name, setName] = useState('');

	return (
		<div className="outer">
			<div className="form form-login">
				<h1 className="roboto font-big">Join</h1>
				<input 
					onChange={ (event) => setName(event.target.value) }
					placeholder="Enter your name"
					type="text" 
					className="input input-login mt20 roboto p-medium"
				/>
				<Link
					onClick={ event => (!name) ? event.preventDefault() : null }
					to={{
						pathname: '/chat',
						state: { name }
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