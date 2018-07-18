'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUser = exports.createRoomAndUser = exports.findAllRoom = undefined;

var _sequelizeConnection = require('../common/sequelize-connection');

var _roomUser = require('../models/room-user');

var _roomUser2 = _interopRequireDefault(_roomUser);

var _syncFile = require('../common/syncFile');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _stringTemplate = require('string-template');

var _stringTemplate2 = _interopRequireDefault(_stringTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Room = _sequelizeConnection.sequelize.define('rooms', {
  id: { type: _sequelizeConnection.Sequelize.CHAR(36), defaultValue: _sequelizeConnection.Sequelize.UUIDV4, primaryKey: true },
  name: { type: _sequelizeConnection.Sequelize.TEXT, allowNull: true },
  status: { type: _sequelizeConnection.Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active' },
  createdBy: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED },
  updatedBy: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED }
}, { timestamps: true });

const findAllRoom = exports.findAllRoom = async data => {
  try {
    const { id, limit, offset } = data;
    const preString = (0, _syncFile.readFile)(_path2.default.join(__dirname, '../../src/query/room/get-room-user-status.sql'));
    const countString = (0, _syncFile.readFile)(_path2.default.join(__dirname, '../../src/query/room/count-room-user-status.sql'));
    const replacements = { id, limit, offset };
    const queryString = (0, _stringTemplate2.default)(preString);
    const queryCount = (0, _stringTemplate2.default)(countString);
    const [rooms, [count]] = await Promise.all([_sequelizeConnection.sequelize.query(queryString, { replacements, type: _sequelizeConnection.sequelize.QueryTypes.SELECT }), _sequelizeConnection.sequelize.query(queryCount, { replacements, type: _sequelizeConnection.sequelize.QueryTypes.SELECT })]);
    return { rooms, count };
  } catch (error) {
    return error;
  }
};

const createRoomAndUser = exports.createRoomAndUser = async data => {
  const transaction = await _sequelizeConnection.sequelize.transaction();
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
    await _roomUser2.default.bulkCreate(roomData, { transaction });

    transaction.commit();
    return room;
  } catch (error) {
    transaction.rollback();
    return new Error(error.message);
  }
};

const addUser = exports.addUser = async data => {
  const transaction = await _sequelizeConnection.sequelize.transaction();
  try {
    const { roomId, friendIds } = data;
    const roomData = friendIds.map(friend => ({
      userId: friend,
      roomId
    }));
    await _roomUser2.default.bulkCreate(roomData, { transaction });
    transaction.commit();
  } catch (error) {
    transaction.rollback();
    return error;
  }
};

exports.default = Room;
//# sourceMappingURL=room.js.map