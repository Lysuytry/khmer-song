'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeConnection = require('../common/sequelize-connection');

//import Production from './production'

const Album = _sequelizeConnection.sequelize.define('albums', {
  id: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: _sequelizeConnection.Sequelize.STRING, allowNull: false },
  image: { type: _sequelizeConnection.Sequelize.TEXT, allowNull: true },
  type: { type: _sequelizeConnection.Sequelize.ENUM('new', 'old'), defaultValue: 'new' },
  status: { type: _sequelizeConnection.Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active' },
  productionId: {
    type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED,
    references: {
      model: 'productions',
      key: 'id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL'
  },
  createdBy: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, allowNull: false },
  updatedBy: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, allowNull: false }
}, { timestamps: true });

exports.default = Album;
//# sourceMappingURL=album.js.map