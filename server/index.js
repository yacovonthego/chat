const http      = require('http');
const express   = require('express');
const socketio  = require('socket.io');
const cors      = require('cors');

const router    = require('./router');

const app       = express();
const server    = http.createServer(app);
const io        = socketio(server);

const ENDPOINT  = process.env.PORT || 5000;
const STORAGE   = {
    rooms: ['JS', 'PHP', 'C++'],
    addRoom: (room) => {
        STORAGE.rooms.push(room);
    },
};

STORAGE.addRoom('LOLIS');
app.use(cors());
app.use(router);

app.get('/get-rooms', (req, res) => {
    res.send(STORAGE.rooms);
});

io.origins(['*:*']);

io.on('connection', (socket) => {
    socket.on('login', ({ name, room }) => {

    });
    // let user = null;
    // socket.on('login', (username) => {
    //     if (username) {
    //         console.log(username + ' has joined');
    //         if (!USERS.includes(username)) {
    //             USERS.push(username);
    //             user = username;
    //         }
    //         console.table(USERS);
    //         socket.emit('choice', ROOMS);
    //     }
    // });

    // // disconnect handling
    // socket.on('disconnect', (reason) => {
    //     if (reason === 'io server disconnect') socket.connect();
    //     else if (user){
    //         USERS = USERS.filter( value => value !== user);
    //         console.log('disconnected');
    //     }
    //     //console.table(USERS);
    // });

    // // room subscribe handling
    // socket.on('subToRoom', (data) => {
    //     socket.join(data.room);
    // });
});

server.listen(ENDPOINT, () => console.log(`Server has started on ${ENDPOINT}.`));