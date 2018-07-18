import { Sequelize, sequelize } from '../common/sequelize-connection';
import RoomUser from '../models/room-user';

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

export const createRoomAndUser = async data => {
  const transaction = await sequelize.transaction();
  try {
    const { id, updatedBy, createdBy, name, friendIds } = data;
    const room = await Room.create({ name, updatedBy, createdBy }, { transaction });

    const roomData = friendIds.map(friend => ({
      userId: friend.id,
      roomId: room.id
    }));
    roomData.push({ userId: id, roomId: room.id });

    await RoomUser.bulkCreate(roomData, { transaction });
    transaction.commit();
    return room;
  } catch (error) {
    transaction.rollback();
    return new Error(error.message);
  }
};

export default Room;
