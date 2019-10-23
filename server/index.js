const http      = require('http');
const express   = require('express');
const socketio  = require('socket.io');
const cors      = require('cors');

const router    = require('./router');

const app       = express();
const server    = http.createServer(app);
const io        = socketio(server);

const ENDPOINT  = process.env.PORT || 5000;
const USERS     = [];

app.use(cors());
app.use(router);

io.on('connection', (socket) => {
    console.log('connected');
    socket.on('login', (data) => {
        if (data) {
            console.log(data + ' has joined');
            USERS.push(data);
            console.table(USERS);
        }
    });

});

server.listen(ENDPOINT, () => console.log(`Server has started on ${ENDPOINT}.`));