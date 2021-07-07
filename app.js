const express = require('express');
const app = express();
const server = require('http').createServer(app)
const io = require("socket.io")(server);

server.listen('3600', () => console.log('Server is working...'));

app.use(express.static('public'));

app.get('/', (request, respons) => {
    respons.sendFile(__dirname + '/index.html')
});

io.sockets.on('connection', (socket) => {
    $serstt = true;
    socket.username = 'Anonymous';

    socket.on('change_username', (data) => {
        socket.username = data.username
    });

    socket.on('send_mess', function (data) {
        io.sockets.emit('add_mess', {
            time: data.time,
            username: socket.username,
            message: data.message,
            className: data.className
        });
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', {username: socket.username})
    });
});
