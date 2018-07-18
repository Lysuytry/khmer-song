'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeConnection = require('../common/sequelize-connection');

const roomUser = _sequelizeConnection.sequelize.define('roomUsers', {
  roomId: { type: _sequelizeConnection.Sequelize.CHAR(36), primaryKey: true },
  userId: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, primaryKey: true }
}, { timestamps: true });

exports.default = roomUser;
//# sourceMappingURL=room-user.js.map