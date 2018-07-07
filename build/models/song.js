'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeConnection = require('../common/sequelize-connection');

// import Album from './album';
// import Category from './category';
//import Artist from './artist';
//import Playlist from './playlist';

const Song = _sequelizeConnection.sequelize.define('songs', {
  id: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: _sequelizeConnection.Sequelize.STRING, allowNull: false },
  duration: { type: _sequelizeConnection.Sequelize.STRING(10) },
  size: { type: _sequelizeConnection.Sequelize.INTEGER(11), defaultValue: 0 },
  albumId: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, references: {
      model: 'albums',
      key: 'id'
    }, onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  categoryId: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, references: {
      model: 'categories',
      key: 'id'
    }, onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  status: { type: _sequelizeConnection.Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active' },
  createdBy: { type: _sequelizeConnection.Sequelize.STRING(50), defaultValue: 'admin' },
  updatedBy: { type: _sequelizeConnection.Sequelize.STRING(50), defaultValue: 'admin' }
}, { timestamps: true });

//Song.belongsTo(Album);
//Song.belongsTo(Category);
//Song.belongsToMany(Artist);
//Song.belongsToMany(Playlist);

exports.default = Song;
//# sourceMappingURL=song.js.map