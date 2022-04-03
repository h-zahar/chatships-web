import React from 'react';
import './Messages.css';
import Message from '../Message/Message';
import ScrollToBottom from 'react-scroll-to-bottom';

const Messages = ({ messages, name }) => {
    return (
        <ScrollToBottom className="messages">
            {
                (messages?.length > 0) ?
                messages.map((message, index) => {
                    return <div key={index}>
                        <Message message={message} name={name} />
                    </div>
                }) :
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            }
        </ScrollToBottom>
    )
}

export default Messages;