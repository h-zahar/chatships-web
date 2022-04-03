const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');

const port = process.env.PORT || 5000;

const { addUser, removeUser, getUser, getUsersInRoom, getRemainedUsersInRoom } = require('./users');
const router = require('./router');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origins: ["https://chatships.web.app", "https://www.google.com"],
        // allowedHeaders: ["accept-header"],
        methods: ["GET", "POST"]
        // credentials: true
    }
});

io.on('connection', (socket) => {
    // console.log('New connection!');

    socket.on('join', ({ name, room }, callback) => {
        const { user, error } = addUser({ id: socket.id, name, room });
        // console.log(user);

        if(error) {
            return callback(error);
        }

        socket.join(user.room);

        socket.emit('message', { user: 'admin', text: `hey ${user.name}, welcome to ${user.room}!` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        callback();
    });

    socket.on('disconnect', () => {
        // console.log('User has disconnected');
        const user = getUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getRemainedUsersInRoom(user.id,user.room) });
            removeUser(socket.id);
        }
    });
});

app.use(router);

server.listen(port, () => {
    console.log(`Listening at port ${port}`);
});