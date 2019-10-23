import React, {useState} from 'react'

import './Join.css'

const Join = () => {
	return (
		<div className="outer">
			<div className="form form-login">
				<h1 className="roboto font-big">Join</h1>
				<input 
						placeholder="Enter your name"
						type="text" 
						className="input input-login mt20 roboto p-medium"
				/>
				<button className="button button-form mt20 roboto p-small">
						Sign in
				</button>
			</div>
		</div>
	)
}

export default Join;