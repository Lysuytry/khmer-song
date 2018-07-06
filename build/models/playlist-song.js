'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeConnection = require('../common/sequelize-connection');

const PlaylistSong = _sequelizeConnection.sequelize.define('Playlists-Songs', {
  id: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  playlistId: { type: _sequelizeConnection.Sequelize.INTEGER, references: {
      model: Playlist,
      key: 'id'
    } },
  songId: { type: _sequelizeConnection.Sequelize.INTEGER, references: {
      model: Song,
      key: 'id'
    } }
}, { timestamps: false });

exports.default = PlaylistSong;
//# sourceMappingURL=playlist-song.js.map