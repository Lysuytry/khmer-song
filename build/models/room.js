'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRoomAndUser = undefined;

var _sequelizeConnection = require('../common/sequelize-connection');

var _roomUser = require('../models/room-user');

var _roomUser2 = _interopRequireDefault(_roomUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Room = _sequelizeConnection.sequelize.define('rooms', {
  id: { type: _sequelizeConnection.Sequelize.CHAR(36), defaultValue: _sequelizeConnection.Sequelize.UUIDV4, primaryKey: true },
  name: { type: _sequelizeConnection.Sequelize.TEXT, allowNull: true },
  status: { type: _sequelizeConnection.Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active' },
  createdBy: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED },
  updatedBy: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED }
}, { timestamps: true });

const createRoomAndUser = exports.createRoomAndUser = async data => {
  const transaction = await _sequelizeConnection.sequelize.transaction();
  try {
    const { id, updatedBy, createdBy, name, friendId } = data;
    const room = await Room.create({ name, updatedBy, createdBy }, { transaction });
    const roomData = [{ userId: id, roomId: room.id }, { userId: friendId, roomId: room.id }];
    await _roomUser2.default.bulkCreate(roomData, { transaction });
    transaction.commit();
    return room;
  } catch (error) {
    transaction.rollback();
    return new Error(error.message);
  }
};

exports.default = Room;
//# sourceMappingURL=room.js.map