const users = [];

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    const index = users.findIndex(user => (user.name === name) && (user.room === room));

    if (index === -1) {
        const user = { id, name, room};
        users.push(user);
        // console.log(user, users);
        return { user };
    }

    else {
        return { error: 'Username Already Taken!' };
    }
};

const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        users.splice(index, 1);
    }
};

const getUser = (id) => {
    return users.find(user => user.id === id);
};

const getUsersInRoom = (room) => {
    return users.filter(user => user.room === room);
};

const getRemainedUsersInRoom = (id, room) => {
    let temp = users.filter(user => user.room === room);
    return temp.filter(user => user.id !== id);
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom, getRemainedUsersInRoom };