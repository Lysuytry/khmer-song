'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeConnection = require('../common/sequelize-connection');

//import Album from './album';

const Production = _sequelizeConnection.sequelize.define('productions', {
  id: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: _sequelizeConnection.Sequelize.STRING, allowNull: false },
  logo: { type: _sequelizeConnection.Sequelize.TEXT, allowNull: true },
  status: { type: _sequelizeConnection.Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active' },
  createdBy: { type: _sequelizeConnection.Sequelize.STRING(50), defaultValue: 'admin' },
  updatedBy: { type: _sequelizeConnection.Sequelize.STRING(50), defaultValue: 'admin' }
}, { timestamps: true });

//Production.hasMany(Album);

exports.default = Production;
//# sourceMappingURL=production.js.map