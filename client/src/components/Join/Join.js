import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Join.css';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        return history.push(`/chat?name=${name}&room=${room}`);
    };

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>

                <form onSubmit={handleSubmit}>
                    <div><input placeholder="Name" className="joinInput" type="text" onChange={(e) => setName(e.target.value)} /></div>
                    <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(e) => setRoom(e.target.value)} /></div>

                    {
                        name && room &&
                        <Link to={`/chat?name=${name}&room=${room}`}>
                        <button className="button mt-20" type="submit">Sign In</button></Link>
                    }

                    {
                        (!name || !room) &&
                        <button className="button mt-20">Sign In</button>
                    }
                </form>

            </div>
            
        </div>
    )
}

export default Join;