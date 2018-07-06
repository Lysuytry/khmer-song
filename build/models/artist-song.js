'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeConnection = require('../common/sequelize-connection');

const ArtistSong = _sequelizeConnection.sequelize.define('Artists-Songs', {
  id: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  artistId: { type: _sequelizeConnection.Sequelize.INTEGER, references: {
      model: Artist,
      key: 'id'
    } },
  songId: { type: _sequelizeConnection.Sequelize.INTEGER, references: {
      model: Song,
      key: 'id'
    } }
}, { timestamps: false });

exports.default = ArtistSong;
//# sourceMappingURL=artist-song.js.map