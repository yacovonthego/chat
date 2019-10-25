import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import './Rooms.css'


const Chat = (props) => {

	const [name, setName] = useState('');
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
    // setting state we got in join
		setName(props.location.state.name);
		setRooms(props.location.state.rooms);

		return () => {
      setName('');
      setRooms([])
		};
  }, [props.location.state]);
  
	return (
    <div className="outer outer-chat">
      <div className="rooms roboto">
        <h2 className="rooms-title roboto font-medium mb20">Rooms:</h2>
        {/* passing collected state for socket connection once again :^) */}
        { 
          rooms.map(item => 
            <Link
              className="room-name"
              key={item}
              to={{
                pathname: '/chat',
                state: {
                  name,
                  roomName: item
                }
              }}
            >
              <div className="room">
                { item }
              </div>
            </Link>
          ) 
        }
      </div>
    </div>
	)
}

export default Chat;