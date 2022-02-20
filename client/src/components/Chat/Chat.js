import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';

let socket;

const Chat = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

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


    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
        console.log(message, messages);
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }

    };


    return (
        <div className="outerContainer">
            <div className="container">

                <InfoBar name={name} room={room} />
                {/* <input 
                value={message}
                onChange={e => setMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
                type="text" /> */}
            </div>
        </div>
    )
}

export default Chat;