'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onlineHandler = exports.chatHandler = undefined;

var _room = require('../api/room/room.api');

var _pushMessage = require('./push-message');

const chatHandler = exports.chatHandler = socket => {
  socket.on('join', userId => {
    (0, _room.joinAllChatRoom)(userId, socket);
  });

  socket.on('newMessage', data => {
    const { from, to, messages } = data;
    (0, _pushMessage.pushMessage)({ id: 10, from, to, messages });
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