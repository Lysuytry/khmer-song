'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeConnection = require('../common/sequelize-connection');

const Album = _sequelizeConnection.sequelize.define('albums', {
  id: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey },
  name: { type: _sequelizeConnection.Sequelize.STRING, allowNull: false },
  image: { type: _sequelizeConnection.Sequelize.TEXT, allowNull: true, validate: { isAlphanumeric } },
  status: { type: _sequelizeConnection.Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active' },
  productId: { type: _sequelizeConnection.Sequelize.INTEGER, references: {
      model: Production,
      key: 'id'
    } },
  createdBy: { type: _sequelizeConnection.Sequelize.STRING(50), defaultValue: 'admin' },
  updatedBy: { type: _sequelizeConnection.Sequelize.STRING(50), defaultValue: 'admin' }
}, { timestamps: true });

exports.default = Album;
//# sourceMappingURL=album.js.map