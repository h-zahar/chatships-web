import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    {/* <div>
      <h1>ChatShips - Have Chatship with your Mates <span role="img" aria-label="emoji">💬</span></h1>
      <h2>Created with React.js, Express.js, Node.js and Socket.io <span role="img" aria-label="emoji">❤️</span></h2>
      <h2>Try out now! <span role="img" aria-label="emoji">⬅️</span></h2>
    </div> */}
    {
      users
        ? (
          <div>
            <h1>People currently chatting:</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;