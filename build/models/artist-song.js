'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeConnection = require('../common/sequelize-connection');

//import Artist from './artist';
//import Song from './song';

const ArtistSong = _sequelizeConnection.sequelize.define('artists-songs', {
  id: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  artistId: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, references: {
      model: 'artists',
      key: 'id'
    }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  songId: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, references: {
      model: 'songs',
      key: 'id'
    }, onDelete: 'CASCADE', onUpdate: 'CASCADE' }
}, { timestamps: false });

exports.default = ArtistSong;
//# sourceMappingURL=artist-song.js.map