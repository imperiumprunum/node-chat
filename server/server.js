//  Requirements
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {Users} = require('./utils/users');
const {message} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

//  Set up server
let app = express();
app.use(express.static(publicPath));

//  SocketIO config
let server = http.createServer(app);
let io = socketIO(server);

let users = new Users();

//  Establish socket connection
io.on('connection', (socket) => {
    console.log('New user has connected');

    //  Creating new user
    users.removeUser(socket.id);
    users.addNewUser(socket.id, 'Root', 'Sample-room');
    console.log(users.getUsersList('Sample-room'));


    //  Socket events

    socket.on('disconnect', () => {
        users.removeUser(socket.id);
        console.log('User has disconnected');
        console.log(users.getUsersList('Sample-room'));
    });

    //  Custom events
    
    // Emitting message to the client - del
    socket.emit('newMessage', message('Teddy','Hello chat app'));

    //  Reciving message from the client
    socket.on('createNewMessage', (newMessage, callback) => {
        io.emit('newMessage',
         {
            from: newMessage.from,
            text: newMessage.text    
        });
        callback();
    });












});



server.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});