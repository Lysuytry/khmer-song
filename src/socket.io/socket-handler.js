import { joinAllChatRoom } from '../api/room/room.api';

//let listChat = {};

export const chatHandler = socket => {
  socket.on('join', userId => {
    joinAllChatRoom(userId, socket);
    //socket.join(roomId);
    //joinChatRoomById(roomId, socket);
    //listChat.push({ room: roomId, socketId: socket.id});
  });

  socket.on('newMessage', data => {
    const { from, to, messages } = data;
    socket.broadcast.to(to).emit('addMessage', { to, from, messages });
  });
};
