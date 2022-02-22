const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');

const port = process.env.PORT || 5000;

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const router = require('./router');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
      origin: "https://chatships.web.app",
      methods: ["GET", "POST"]
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

        socket.emit('message', { user: 'admin', text: `hey ${user.name}, welcome to ${user.room}!` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

        socket.join(user.room);

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        // console.log('User has disconnected');
        const user = getUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
            removeUser();
        }
    });
});

app.use(router);

server.listen(port, () => {
    console.log(`Listening at port ${port}`);
});