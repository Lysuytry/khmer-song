'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeConnection = require('../common/sequelize-connection');

//import Playlist from './playlist';
//import Song from './song';

const PlaylistSong = _sequelizeConnection.sequelize.define('playlistSongs', {
  playlistId: { type: _sequelizeConnection.Sequelize.CHAR(64), primaryKey: true },
  songId: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, primaryKey: true }
}, { timestamps: false });

exports.default = PlaylistSong;
//# sourceMappingURL=playlist-song.js.map