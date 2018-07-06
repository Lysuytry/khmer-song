'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeConnection = require('../common/sequelize-connection');

var _artist = require('./artist');

var _artist2 = _interopRequireDefault(_artist);

var _song = require('./song');

var _song2 = _interopRequireDefault(_song);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ArtistSong = _sequelizeConnection.sequelize.define('Artists-Songs', {
  id: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  artistId: { type: _sequelizeConnection.Sequelize.INTEGER, references: {
      model: _artist2.default,
      key: 'id'
    } },
  songId: { type: _sequelizeConnection.Sequelize.INTEGER, references: {
      model: _song2.default,
      key: 'id'
    } }
}, { timestamps: false });

exports.default = ArtistSong;
//# sourceMappingURL=artist-song.js.map