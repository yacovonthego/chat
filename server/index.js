const http      = require('http');
const express   = require('express');
const socketio  = require('socket.io');
const cors      = require('cors');

const router    = require('./router');

const app       = express();
const server    = http.createServer(app);
const io        = socketio(server);

const ENDPOINT  = process.env.PORT || 5000;
const ROOMS     = ['JS', 'PHP', 'C++'];
let   USERS     = [];

app.use(cors());
app.use(router);

io.origins(['*:*']);

io.on('connection', (socket) => {
    socket.on('login', (data) => {
        if (data) {
            console.log(data + ' has joined');
            if (!USERS.includes(data)) USERS.push(data);
            console.table(USERS);
            socket.emit('choice', ROOMS);
        }

        // disconnect handling
        socket.on('disconnect', (reason) => {
            if (reason === 'io server disconnect') socket.connect();
            else {
                USERS = USERS.filter( value => value !== data);
            }
            //console.table(USERS);
        });
    });
});

server.listen(ENDPOINT, () => console.log(`Server has started on ${ENDPOINT}.`));