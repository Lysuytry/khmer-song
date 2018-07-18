'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _room = require('./room.api');

var _room2 = require('./room.middleware');

const routeRoom = (0, _express.Router)();

routeRoom.get('/', _room.getRoomList);
routeRoom.post('/', _room2.validateRoomCreating, _room.createRoom);
routeRoom.get('/chat', _room.getRoomChat);
routeRoom.get('/:id', _room.getRoomChatById);
routeRoom.delete('/:id', _room.deleteRoomChatById);
routeRoom.get('/:id/users', _room.getListUserInRoom);
routeRoom.post('/:roomId/users', _room2.validateAddUserToRoom, _room.addUserToRoom);

exports.default = routeRoom;
//# sourceMappingURL=room.route.js.map