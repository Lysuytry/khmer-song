'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onlineHandler = exports.chatHandler = undefined;

var _room = require('../api/room/room.api');

//let listChat = {};

const chatHandler = exports.chatHandler = socket => {
  socket.on('join', userId => {
    (0, _room.joinAllChatRoom)(userId, socket);
    //socket.join(roomId);
    //joinChatRoomById(roomId, socket);
    //listChat.push({ room: roomId, socketId: socket.id});
  });

  socket.on('newMessage', data => {
    const { from, to, messages } = data;
    socket.broadcast.to(to).emit('addMessage', { to, from, messages });
  });
};

let users = [];
const onlineHandler = exports.onlineHandler = socket => {
  socket.on('online', userId => {
    users = users.filter(item => item.way !== socket.id);
    users.push({ id: userId, way: socket.id });
    socket.emit('updateOnline', users);
    socket.broadcast.emit('updateOnline', users);
  });

  socket.on('disconnect', () => {
    users = users.filter(item => item.way !== socket.id);
    socket.emit('updateOnline', users);
    socket.broadcast.emit('updateOnline', users);
  });
};
//# sourceMappingURL=socket-handler.js.map