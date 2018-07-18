import { Sequelize, sequelize } from '../common/sequelize-connection';
import RoomUser from '../models/room-user';
import { readFile } from '../common/syncFile';
import path from 'path';
import format from 'string-template';

const Room = sequelize.define(
  'rooms',
  {
    id: { type: Sequelize.CHAR(36), defaultValue: Sequelize.UUIDV4, primaryKey: true },
    name: { type: Sequelize.TEXT, allowNull: true },
    status: { type: Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active' },
    createdBy: { type: Sequelize.INTEGER.UNSIGNED },
    updatedBy: { type: Sequelize.INTEGER.UNSIGNED }
  },
  { timestamps: true }
);

export const findAllRoom = async data => {
  try {
    const {id, limit, offset} = data;
    const preString = readFile(path.join(__dirname, '../../src/query/room/get-room-user-status.sql'));
    const countString = readFile(path.join(__dirname, '../../src/query/room/count-room-user-status.sql'));
    const replacements = { id , limit, offset};
    const queryString = format(preString);
    const queryCount = format(countString);
    const [rooms, [count]] = await Promise.all([
      sequelize.query(queryString, { replacements, type: sequelize.QueryTypes.SELECT }),
      sequelize.query(queryCount, { replacements, type: sequelize.QueryTypes.SELECT })
    ]);
    return { rooms, count };
  } catch (error) {
    return error;
  }
};

export const createRoomAndUser = async data => {
  const transaction = await sequelize.transaction();
  try {
    const { name, updatedBy, createdBy, id, friendIds } = data;
    friendIds.push(id);
    //create room & no worry how to redundancy room
    const room = await Room.create({ name, updatedBy, createdBy }, { transaction });
    //bind for inputting into RoomUser
    const roomData = friendIds.map(friend => ({
      userId: friend,
      roomId: room.id
    }));
    //bulk input
    await RoomUser.bulkCreate(roomData, { transaction });

    transaction.commit();
    return room;
  } catch (error) {
    transaction.rollback();
    return new Error(error.message);
  }
};

export const addUser = async data => {
  const transaction = await sequelize.transaction();
  try {
    const { roomId, friendIds } = data;
    const roomData = friendIds.map(friend => ({
      userId: friend,
      roomId
    }));
    await RoomUser.bulkCreate(roomData, { transaction });
    transaction.commit();
  } catch (error) {
    transaction.rollback();
    return error;
  }
};

export default Room;
