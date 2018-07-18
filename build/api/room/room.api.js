'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.joinAllChatRoom = exports.getRoomChat = exports.deleteRoomChatById = exports.getRoomChatById = exports.getRoomList = exports.getRoomById = exports.addUserToRoom = exports.createRoom = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _room = require('../../models/room');

var _room2 = _interopRequireDefault(_room);

var _roomUser = require('../../models/room-user');

var _roomUser2 = _interopRequireDefault(_roomUser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sequelizeConnection = require('../../common/sequelize-connection');

var _user = require('../../models/user');

var _user2 = _interopRequireDefault(_user);

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
    const { name, friendIds } = req.body;
    //check all user's Id
    const users = await _user2.default.findAll({
      attributes: ['id'],
      where: { id: { [_sequelizeConnection.Op.in]: friendIds }, status: 'active', role: 'guest' }
    });
    //if different length ==> not match all user's Id
    if (!(friendIds.length === users.length)) return res.fail('some Id is not found.');
    //otherwise => create room and add user
    const room = await (0, _room.createRoomAndUser)({ name, updatedBy, createdBy, id, friendIds });
    //return room back to user
    return res.success(room);
  } catch (error) {
    res.fail(error);
  }
};

const addUserToRoom = exports.addUserToRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { friendIds } = req.body;
    const { status } = req.query;
    //check room is available to add more people
    const [usersRoom, roomUsers, room, users] = await Promise.all([_roomUser2.default.findAll({ attributes: ['roomId'], where: { roomId, userId: { [_sequelizeConnection.Op.in]: friendIds } } }), _roomUser2.default.findAll({ attributes: ['roomId'], where: { roomId } }), _room2.default.findOne({ attributes: ['id'], where: { id: roomId, status } }), _user2.default.findAll({ attributes: ['id'], where: { id: { [_sequelizeConnection.Op.in]: friendIds }, status: 'active', role: 'guest' } })]);
    //if it is not existed
    if (!room) return res.fail('Room Id is invalid.');
    //check length => match or not
    if (!(friendIds.length === users.length)) return res.fail('some Id is not found.');
    //if friend already in group
    if (usersRoom.length > 0) return res.fail('some Id is already in the room.');
    //check if it more than 10 people in a room
    if (roomUsers.length + friendIds.length > 10) return res.fail('Over the limit 10 people per room.');
    //if matched => add user into the room
    await (0, _room.addUser)({ friendIds, roomId });
    return res.success('Successfully added a user to a room.');
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
    const { rooms, count } = await (0, _room.findAllRoom)({ id, limit, offset });
    res.success(rooms, _extends({}, count, { limit, offset }));
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
    res.success(room);
  } catch (error) {
    res.fail(error);
  }
};

const deleteRoomChatById = exports.deleteRoomChatById = async (req, res) => {
  try {
    const { updatedBy } = req.authUser;
    const { id } = req.params;
    await _room2.default.update({ updatedBy, status: 'inactive' }, { where: { id, status: 'active' } });
    res.success('Successfully deleted room.');
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
    // const rows = await RoomUser.findAll({
    //   raw: true,
    //   attributes: [['roomId', 'id']],
    //   where: { userId }
    // });
    const limit = 20,
          offset = 0;
    const { rooms, count } = await (0, _room.findAllRoom)({ id: userId, limit, offset });
    socket.join(userId);
    rooms.forEach(room => {
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