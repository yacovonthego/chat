const http      = require('http');
const express   = require('express');
const socketio  = require('socket.io');
const cors      = require('cors');

const router    = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');


const app       = express();
const server    = http.createServer(app);
const io        = socketio(server);

const ENDPOINT  = process.env.PORT || 5000;
const ROOMS     = ['JS', 'PHP', 'C++'];


app.use(cors());
app.use(router);

app.get('/get-rooms', (req, res) => {
    res.send(ROOMS);
});

io.origins(['*:*']);

io.on('connection', (socket) => {

    socket.on('join', ({ name, room }, callback) => {
        // if (name && room) {
        //     if (!STORAGE.users[room].includes(name)) {
        //         STORAGE.users[room].push(name);
        //         console.log(name + ' joined ' + room);
        //         socket.emit('welcome', STORAGE.users[room]);
        //         console.log(STORAGE.users[room]);
        //         callback();
        //     } 
        // } 
        if (name && room) {
            const { error, user } = addUser({ id: socket.id, name, room });

            if (error) return callback(error);

            socket.join(user.room);

            io.to(user.room).emit('usersInRoom', getUsersInRoom(user.room));

            callback();
        }
    });
    
    socket.on('send', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, test: message });
    });

    socket.on('leave', () => {
        const user = removeUser(socket.id);
    });
});

server.listen(ENDPOINT, () => console.log(`Server has started on ${ENDPOINT}.`));