'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeConnection = require('../common/sequelize-connection');

//import Playlist from './playlist';
//import Song from './song';

const PlaylistSong = _sequelizeConnection.sequelize.define('playlists-songs', {
  id: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  playlistId: { type: _sequelizeConnection.Sequelize.CHAR(64), references: {
      model: 'playlists',
      key: 'id'
    }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  songId: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, references: {
      model: 'songs',
      key: 'id'
    }, onDelete: 'CASCADE', onUpdate: 'CASCADE' }
}, { timestamps: false });

exports.default = PlaylistSong;
//# sourceMappingURL=playlist-song.js.map