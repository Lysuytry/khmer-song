'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeConnection = require('../common/sequelize-connection');

const Category = _sequelizeConnection.sequelize.define('categories', {
  id: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: _sequelizeConnection.Sequelize.STRING(80), allowNull: false },
  status: { type: _sequelizeConnection.Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active' },
  createdBy: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, allowNull: false },
  updatedBy: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, allowNull: false }
}, { timestamps: true });

exports.default = Category;
//# sourceMappingURL=category.js.map