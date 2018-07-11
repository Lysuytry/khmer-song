'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeConnection = require('../common/sequelize-connection');

//import Artist from './artist';
//import Song from './song';

const ArtistSong = _sequelizeConnection.sequelize.define('artistSongs', {
  artistId: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, primaryKey: true },
  songId: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, primaryKey: true }
}, { timestamps: false });

exports.default = ArtistSong;
//# sourceMappingURL=artist-song.js.map