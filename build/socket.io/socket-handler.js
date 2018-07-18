'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chatHandler = undefined;

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
//# sourceMappingURL=socket-handler.js.map