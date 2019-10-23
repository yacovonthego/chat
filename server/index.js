const http      = require('http');
const express   = require('express');
const socketio  = require('socket.io');
const cors      = require('cors');

const router    = require('./router');

const app       = express();
const server    = http.createServer(app);
const io        = socketio(server);

app.use(cors());
app.use(router);

io.on('connection', (socket) => {
    
    socket.on('login', (data) => {
        console.log(data);
    });

});