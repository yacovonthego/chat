import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import './Rooms.css'


const Chat = (props) => {

	const [name, setName] = useState('');
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		setName(props.location.state.name);
		setRooms(props.location.state.rooms);

		return () => {
      setName('');
      setRooms([])
		};
	}, [props.location.state]);

  // useEffect(() => {
  //   	// logging in
  //     socket = io.connect('localhost:5000');
  //     socket.emit('login', name);
  // }, [name]);

  // useEffect(() => {
  //   socket.on('choice', data => setRooms(data));
    
  //   return () => {
  //     socket.emit('disconnect');
  //     socket.off();
  //     console.log('disconnected');
  //   }
  // });



	// props.location.state
	return (
    <div className="outer outer-chat">
      <div className="rooms roboto">
        <h2 className="rooms-title roboto font-medium mb20">Rooms:</h2>
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