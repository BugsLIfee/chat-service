const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
require("dotenv").config();
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
// const server = app.listen(8089, () => {
//   console.log("Private-chat-Server listening on port 8085 new");
// });
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  console.log("socket 연결", socket.connected,"--",socket.id);


  socket.on('join', ({ name, room }, callback) => {
    console.log("join?")
    const { error, user } = addUser({ id: socket.id, name, room });

    
    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: '<알림>', text: `${user.name}님, 반갑습니다. 질문번호: ${user.room}번 방에 입장하셨습니다.`});
    socket.broadcast.to(user.room).emit('message', { user: '<알림>', text: `${user.name} 님이 입장하셨습니다.` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: '<알림>', text: `${user.name} 가 방을 나가셨습니다.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen( 8089, () => console.log(`Server 8089 has started.`,));