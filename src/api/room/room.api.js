import Room, { createRoomAndUser, addUser, findAllRoom } from '../../models/room';
import RoomUser from '../../models/room-user';
import path from 'path';
import { Op } from '../../common/sequelize-connection';
import User from '../../models/user';
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
    //check all user's Id
    const users = await User.findAll({
      attributes: ['id'],
      where: { id: { [Op.in]: friendIds }, status: 'active', role: 'guest' }
    });
    //if different length ==> not match all user's Id
    if (!(friendIds.length === users.length)) return res.fail('some Id is not found.');
    //otherwise => create room and add user
    const room = await createRoomAndUser({ name, updatedBy, createdBy, id, friendIds });
    //return room back to user
    return res.success(room);
  } catch (error) {
    res.fail(error);
  }
};

export const addUserToRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { friendIds } = req.body;
    const { status } = req.query;
    //check room is available to add more people
    const [usersRoom, roomUsers, room, users] = await Promise.all([
      RoomUser.findAll({ attributes: ['roomId'], where: { roomId, userId: { [Op.in]: friendIds } } }),
      RoomUser.findAll({ attributes: ['roomId'], where: { roomId } }),
      Room.findOne({ attributes: ['id'], where: { id: roomId, status } }),
      User.findAll({ attributes: ['id'], where: { id: { [Op.in]: friendIds }, status: 'active', role: 'guest' } })
    ]);
    //if it is not existed
    if (!room) return res.fail('Room Id is invalid.');
    //check length => match or not
    if (!(friendIds.length === users.length)) return res.fail('some Id is not found.');
    //if friend already in group
    if (usersRoom.length > 0) return res.fail('some Id is already in the room.');
    //check if it more than 10 people in a room
    if (roomUsers.length + friendIds.length > 10) return res.fail('Over the limit 10 people per room.');
    //if matched => add user into the room
    await addUser({ friendIds, roomId });
    return res.success('Successfully added a user to a room.');
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
    const { rooms, count } = await findAllRoom({ id, limit, offset });
    res.success(rooms, { ...count, limit, offset });
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
    res.success(room);
  } catch (error) {
    res.fail(error);
  }
};

export const deleteRoomChatById = async (req, res) => {
  try {
    const { updatedBy } = req.authUser;
    const { id } = req.params;
    await Room.update({ updatedBy, status: 'inactive' }, { where: { id, status: 'active' } });
    res.success('Successfully deleted room.');
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
    // const rows = await RoomUser.findAll({
    //   raw: true,
    //   attributes: [['roomId', 'id']],
    //   where: { userId }
    // });
    const limit = 20, offset = 0;
    const { rooms, count } = await findAllRoom({ id: userId, limit, offset });
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
