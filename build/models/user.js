'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeConnection = require('../common/sequelize-connection');

//import Playlist from './playlist';

const User = _sequelizeConnection.sequelize.define('users', {
  id: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  username: { type: _sequelizeConnection.Sequelize.STRING(100), allowNull: false, validate: { isAlphanumeric: true } },
  password: { type: _sequelizeConnection.Sequelize.STRING(100), allowNull: false },
  role: { type: _sequelizeConnection.Sequelize.ENUM('guest', 'admin'), defaultValue: 'guest' },
  status: { type: _sequelizeConnection.Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active' },
  createdBy: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, allowNull: false },
  updatedBy: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, allowNull: false }
}, { timestamps: true });

//User.hasMany(Playlist);

exports.default = User;
//# sourceMappingURL=user.js.map