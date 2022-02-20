const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const port = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

io.on('connection', (socket) => {
    console.log('New connection!');

    socket.on('disconnect', () => {
        console.log('User has disconnected');
    });
});

app.use(router);

server.listen(port, () => {
    console.log(`Listening at port ${port}`);
});