const http      = require('http');
const express   = require('express');
const socketio  = require('socket.io');
const cors      = require('cors');

const router    = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom, getUsers } = require('./users');


const app       = express();
const server    = http.createServer(app);
const io        = socketio(server);

const ENDPOINT  = process.env.PORT || 5000;
const ROOMS     = ['JS', 'PHP', 'C++'];

const getTime = () => {
    const date = new Date();
    // adding 0 if there's one digit in hours and minutes
    return `${ (date.getHours().length === 1) ? '0' + date.getHours() : date.getHours() }:${ (date.getMinutes().length === 1) ? '0' + date.getMinutes() : date.getMinutes()}`;
};

// console.log(getUsers());

app.use(cors());
app.use(router);

app.get('/get-rooms', (req, res) => {
    res.send(ROOMS);
});

io.origins(['*:*']);

io.on('connection', (socket) => {

    socket.on('join', ({ name, room }, callback) => {

        if (name && room) {
            const { error, user } = addUser({ id: socket.id, name, room });

            if (error) return callback(error);

            // console.log(name +' joined ' + room);

            // console.log(getUsersInRoom(user.room));

            socket.join(user.room);

            io.to(user.room).emit('roomData', getUsersInRoom(user.room) );

            callback();
        }
    });

    socket.on('send', (message, callback) => {
        const user = getUser(socket.id);

        // console.log(user);
        io.to(user.room).emit('message', { user: user.name, text: message, time: getTime() });
    });

    socket.on('leave', () => {
        const user = removeUser(socket.id);
        // console.log('leave emitted');
    });
});

server.listen(ENDPOINT, () => console.log(`Server has started on ${ENDPOINT}.`));