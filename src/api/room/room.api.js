import Room, { createRoomAndUser } from '../../models/room';
import RoomUser from '../../models/room-user';
import path from 'path';
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

export const createRoom = async (req, res) => {
  try {
    const { id, updatedBy, createdBy } = req.authUser;
    const { name, friendIds } = req.body;
    const room = await createRoomAndUser({ name, updatedBy, createdBy, id, friendIds });
    res.success(room);
  } catch (error) {
    res.fail(error);
  }
};

export const getRoomById = async data => {
  try {
    const { id } = data;
    const room = await Room.findOne({ where: { id, status } });
    return room;
  } catch (error) {
    return new Error(error.message);
  }
};

export const getRoomList = async (req, res) => {
  try {
    const { id } = req.authUser;
    const { limit, offset } = req.query;
    const { rows, count } = await RoomUser.findAndCountAll({
      raw: true,
      attributes: [['roomId', 'id']],
      where: { userId: id }
    });
    res.success(rows, { count, limit, offset });
  } catch (error) {
    res.fail(error);
  }
};

export const getRoomChatById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const room = await Room.findOne({ where: { id, status } });
    if (!room) return res.fail('no room.');
    const file = path.join(__dirname + '../../../../html/index.html');
    res.sendFile(file);
    //res.success(room);
  } catch (error) {
    res.fail(error);
  }
};

export const getRoomChat = async (req, res) => {
  try {
    const file = path.join(__dirname + '../../../../html/index.html');
    res.sendFile(file);
  } catch (error) {
    res.fail(error);
  }
};

export const joinAllChatRoom = async (userId, socket) => {
  try {
    const rows = await RoomUser.findAll({
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
