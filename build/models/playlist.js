'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSongByPlaylistId = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _sequelizeConnection = require('../common/sequelize-connection');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _syncFile = require('../common/syncFile');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import User from './user';
//import Song from './song';

const Playlist = _sequelizeConnection.sequelize.define('playists', {
  id: { type: _sequelizeConnection.Sequelize.CHAR(36), defaultValue: _sequelizeConnection.Sequelize.UUIDV4, primaryKey: true },
  name: { type: _sequelizeConnection.Sequelize.STRING(70), allowNull: false },
  userId: {
    type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, { timestamps: true });

const getSongByPlaylistId = exports.getSongByPlaylistId = async data => {
  try {
    const { id, limit, offset, userId } = data;
    const pathQuery = _path2.default.join(__dirname, '../../src/query/playlist/getAllSongInPlaylist.sql');
    const pathCount = _path2.default.join(__dirname, '../../src/query/playlist/countAllSongInPlaylist.sql');
    const querySong = (0, _syncFile.readFile)(pathQuery);
    const countSong = (0, _syncFile.readFile)(pathCount);
    const replacementsQuery = {
      replacements: { id: id, userId: userId, limitValue: limit, offsetValue: offset },
      type: _sequelizeConnection.sequelize.QueryTypes.SELECT
    };
    const replacementsCount = { replacements: { id: id }, type: _sequelizeConnection.sequelize.QueryTypes.SELECT };
    const [songs, [count]] = await Promise.all([_sequelizeConnection.sequelize.query(querySong, replacementsQuery), _sequelizeConnection.sequelize.query(countSong, replacementsCount)]);
    return _extends({ songs }, count);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.default = Playlist;
//# sourceMappingURL=playlist.js.map