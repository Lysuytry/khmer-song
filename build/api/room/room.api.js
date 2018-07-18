'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.joinAllChatRoom = exports.getRoomChat = exports.getRoomChatById = exports.getRoomList = exports.getRoomById = exports.createRoom = undefined;

var _room = require('../../models/room');

var _room2 = _interopRequireDefault(_room);

var _roomUser = require('../../models/room-user');

var _roomUser2 = _interopRequireDefault(_roomUser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { Op } from '../../common/sequelize-connection';

// export const createRoom = async (data) => {
//   try{
//     const
//     const room = await Room.create(data);
//     const roomData = {userId: id, roomId: room.id};
//     const roomUser = await RoomUser.create(roomData);
//     return room;
//   } catch(error){
//     return new Error(error.message);
//   }
// };

const createRoom = exports.createRoom = async (req, res) => {
  try {
    const { id, updatedBy, createdBy } = req.authUser;
    const { name, friendId } = req.body;
    const room = await (0, _room.createRoomAndUser)({ name, updatedBy, createdBy, id, friendId });
    res.success(room);
  } catch (error) {
    res.fail(error);
  }
};

const getRoomById = exports.getRoomById = async data => {
  try {
    const { id } = data;
    const room = await _room2.default.findOne({ where: { id, status } });
    return room;
  } catch (error) {
    return new Error(error.message);
  }
};

const getRoomList = exports.getRoomList = async (req, res) => {
  try {
    const { id } = req.authUser;
    const { limit, offset } = req.query;
    const { rows, count } = await _roomUser2.default.findAndCountAll({
      raw: true,
      attributes: [['roomId', 'id']],
      where: { userId: id }
    });
    res.success(rows, { count, limit, offset });
  } catch (error) {
    res.fail(error);
  }
};

const getRoomChatById = exports.getRoomChatById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const room = await _room2.default.findOne({ where: { id, status } });
    if (!room) return res.fail('no room.');
    const file = _path2.default.join(__dirname + '../../../../html/index.html');
    res.sendFile(file);
    //res.success(room);
  } catch (error) {
    res.fail(error);
  }
};

const getRoomChat = exports.getRoomChat = async (req, res) => {
  try {
    const file = _path2.default.join(__dirname + '../../../../html/index.html');
    res.sendFile(file);
  } catch (error) {
    res.fail(error);
  }
};

const joinAllChatRoom = exports.joinAllChatRoom = async (userId, socket) => {
  try {
    const rows = await _roomUser2.default.findAll({
      raw: true,
      attributes: [['roomId', 'id']],
      where: { userId }
    });
    socket.join(userId);
    rows.forEach(room => {
      socket.join(room.id);
    });
    return null;
  } catch (error) {
    return error;
  }
};

// export const leftChatRoomById = async (roomId, socket) => {
//   try {
//     const room = await Room.findById(roomId);
//     if(!room) return socket.emit('error', 'Wrong room ID');
//     socket.leave(room.id);
//     return;
//   } catch (error) {
//     return new Error(error.message);
//   }
// };
//# sourceMappingURL=room.api.js.map