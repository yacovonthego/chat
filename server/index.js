const http      = require('http');
const express   = require('express');
const socketio  = require('socket.io');
const cors      = require('cors');

const router    = require('./router');

const app       = express();
const server    = http.createServer(app);
const io        = socketio(server);

const ENDPOINT  = process.env.PORT || 5000;

// let because of filtering users
let     STORAGE = {
            rooms: ['JS', 'PHP', 'C++'],
            users: {
                'JS': [],
                'PHP': [],
                'C++': []
            }
        };

app.use(cors());
app.use(router);

app.get('/get-rooms', (req, res) => {
    res.send(STORAGE.rooms);
});

io.origins(['*:*']);

io.on('connection', (socket) => {

    socket.on('join', ({ name, room }) => {
        if (name && room) {
            if (!STORAGE.users[room].includes(name)) {
                STORAGE.users[room].push(name);
                console.log(STORAGE.users[room] + 'joined' + room);
                socket.emit('joined', STORAGE.users[room]);
            } 
        }       
    });
    
    socket.on('leave', ({ name, room }) => {
        if (name && room) {
            // STORAGE.users[room] = STORAGE.users[room].filter( item => item !==name );
            // console.log(`${name} disconnected from ${room}`);
            console.log(name, room);
            console.log(STORAGE);
        }
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