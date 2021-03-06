import { joinAllChatRoom } from '../api/room/room.api';
import { pushMessage } from './push-message';

export const chatHandler = socket => {
  socket.on('join', userId => {
    joinAllChatRoom(userId, socket);
  });

  socket.on('newMessage', data => {
    const { from, to, messages } = data;
    pushMessage({ id: 10, from, to, messages });
    socket.broadcast.to(to).emit('addMessage', { to, from, messages });
  });
};

let users = [];
export const onlineHandler = socket => {
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
