'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeConnection = require('../common/sequelize-connection');

//import User from './user';
//import Song from './song';

const Playlist = _sequelizeConnection.sequelize.define('playists', {
  id: { type: _sequelizeConnection.Sequelize.CHAR(36), defaultValue: _sequelizeConnection.Sequelize.UUIDV4, primaryKey: true },
  name: { type: _sequelizeConnection.Sequelize.STRING(70), allowNull: false },
  userId: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, references: {
      model: 'users',
      key: 'id'
    }, onDelete: 'CASCADE', onUpdate: 'CASCADE' }
}, { timestamps: true });

//Playlist.belongsToMany(User);
//Playlist.belongsToMany(Song);

exports.default = Playlist;
//# sourceMappingURL=playlist.js.map