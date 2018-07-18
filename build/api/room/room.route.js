'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _room = require('./room.api');

const routeRoom = (0, _express.Router)();

routeRoom.get('/', _room.getRoomList);
routeRoom.post('/', _room.createRoom);
routeRoom.get('/chat', _room.getRoomChat);
routeRoom.get('/:id', _room.getRoomChatById);

exports.default = routeRoom;
//# sourceMappingURL=room.route.js.map