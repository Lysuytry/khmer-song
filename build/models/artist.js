'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeConnection = require('../common/sequelize-connection');

//import Song from './song';

const Artist = _sequelizeConnection.sequelize.define('artists', {
  id: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: _sequelizeConnection.Sequelize.STRING(100), allowNull: false },
  type: { type: _sequelizeConnection.Sequelize.ENUM('new', 'old'), defaultValue: 'new', validate: { isLowercase: true } },
  image: { type: _sequelizeConnection.Sequelize.TEXT, allowNull: true },
  status: { type: _sequelizeConnection.Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active' },
  createdBy: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, allowNull: false },
  updatedBy: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, allowNull: false }
}, { timestamps: true });

//Artist.belongsToMany(Song);

exports.default = Artist;
//# sourceMappingURL=artist.js.map