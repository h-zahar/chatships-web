import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';

let socket;

const Chat = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const ENDPOINT = 'http://localhost:5000/';

    const location = useLocation();
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        setName(name);
        setRoom(room);

        socket = io(ENDPOINT);
        console.log(socket);

        socket.emit('join', { name, room }, () => {
            
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        };
        
    }, [ENDPOINT, location.search]);
    return (
        <div>
            <h1>Chat</h1>
        </div>
    )
}

export default Chat;