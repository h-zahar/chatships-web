import React from 'react';
import './Input.css';

const Input = ({ message, setMessage, sendMessage }) => {
    return (
        <form className="form">
                <input id="in" className="input" 
                placeholder="Type here..."
                value={message}
                onChange={e => setMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
                type="text" />
                <button className="sendButton" onClick={(e) => sendMessage(e)}>Send</button>
        </form>
    )
}

export default Input;