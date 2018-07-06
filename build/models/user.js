'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeConnection = require('../common/sequelize-connection');

var _util = require('util');

const User = _sequelizeConnection.sequelize.define('users', {
  id: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  username: { type: _sequelizeConnection.Sequelize.STRING(100), allowNull: false, validate: { isString: true } },
  password: { type: _sequelizeConnection.Sequelize.STRING(30), allowNull: false, validate: { isAlphanumeric: true } },
  role: { type: _sequelizeConnection.Sequelize.STRING(20), validate: { isString: true }, defaultValue: 'guest' },
  status: { type: _sequelizeConnection.Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active' }
}, { timestamps: true });

exports.default = User;
//# sourceMappingURL=user.js.map