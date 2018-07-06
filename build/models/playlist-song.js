'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeConnection = require('../common/sequelize-connection');

var _playlist = require('./playlist');

var _playlist2 = _interopRequireDefault(_playlist);

var _song = require('./song');

var _song2 = _interopRequireDefault(_song);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PlaylistSong = _sequelizeConnection.sequelize.define('Playlists-Songs', {
  id: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  playlistId: { type: _sequelizeConnection.Sequelize.INTEGER, references: {
      model: _playlist2.default,
      key: 'id'
    } },
  songId: { type: _sequelizeConnection.Sequelize.INTEGER, references: {
      model: _song2.default,
      key: 'id'
    } }
}, { timestamps: false });

exports.default = PlaylistSong;
//# sourceMappingURL=playlist-song.js.map