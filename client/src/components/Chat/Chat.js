import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;

const Chat = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'http://localhost:5000/';

    const location = useLocation();
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        setName(name);
        setRoom(room);

        socket = io(ENDPOINT);
        // console.log(socket);

        socket.emit('join', { name, room }, (error) => {
            if(error) {
                window.alert(error);
            }
        });

        return () => {
            socket.emit('disconnect');
            socket.off('disconnect');
            socket.off('join');
        };
        
    }, [location.search]);


    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

        socket.on('roomData', ({ users }) => {
            console.log(users);
            setUsers(users);
        });
        
        return () => {
            socket.off('message');
            socket.off('roomData');
        }

        // console.log(message, messages);
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }

        document.getElementById('in').focus();

    };


    return (
        <div className="outerContainer">
            <div className="container">

                <InfoBar name={name} room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />

            </div>
            <TextContainer users={users} />
        </div>
    )
}

export default Chat;