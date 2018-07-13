'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSongToPlaylist = exports.removeSongFromPlaylist = exports.getSongFromPlaylist = exports.deletePlaylist = exports.createPlaylist = exports.getPlaylist = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _playlist = require('../../models/playlist');

var _playlist2 = _interopRequireDefault(_playlist);

var _user = require('../../models/user');

var _user2 = _interopRequireDefault(_user);

var _song = require('../../models/song');

var _song2 = _interopRequireDefault(_song);

var _playlistSong = require('../../models/playlist-song');

var _playlistSong2 = _interopRequireDefault(_playlistSong);

var _sequelizeConnection = require('../../common/sequelize-connection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getPlaylist = exports.getPlaylist = async (req, res) => {
  try {
    const { userId } = req.body;
    const { limit, offset, name } = req.query;
    const filterName = name ? { name: { [_sequelizeConnection.Op.like]: `%${name}%` } } : {};
    const conditions = _extends({ userId }, filterName);
    const { rows, count } = await _playlist2.default.findAndCountAll({ where: conditions, offset, limit });
    res.success(rows, { count, limit, offset });
  } catch (error) {
    res.fail(error);
  }
};

const createPlaylist = exports.createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.authUer.id;
    //we must know who created it
    const user = await _user2.default.findById(userId);
    const [playlist] = !user ? res.fail('User Id is not found.') : await _playlist2.default.findOrCreate({ where: { name, userId }, defaults: req.body });
    res.success(playlist);
  } catch (error) {
    res.fail(error);
  }
};

const deletePlaylist = exports.deletePlaylist = async (req, res) => {
  const transaction = await _sequelizeConnection.sequelize.transaction();
  try {
    const { id } = req.params;
    const userId = req.authUer.id;
    await Promise.all([_playlist2.default.destroy({ where: { id, userId }, transaction }), _playlistSong2.default.destroy({ where: { playlistId: id }, transaction })]);
    transaction.commit();
    res.success('Successfully deleted.');
  } catch (error) {
    transaction.rollback();
    res.fail(error.message);
  }
};

const getSongFromPlaylist = exports.getSongFromPlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.authUer.id;
    const { limit, offset } = req.query;
    const { songs, count } = await (0, _playlist.getSongByPlaylistId)({ id, userId, limit, offset });
    res.success(songs, { count, limit, offset });
  } catch (error) {
    res.fail(error.message);
  }
};

const removeSongFromPlaylist = exports.removeSongFromPlaylist = async (req, res) => {
  try {
    const { id, songId } = req.params;
    const userId = req.authUer.id;
    //check playlist Id is existing
    //count >findOne
    const playlist = await _playlist2.default.findOne({ attributes: ['id'], where: { userId, id } });
    //not => invalid playlist
    if (!playlist) res.fail('Playlist Id is not valid.');
    //success => check song id in playlistsong
    const row = await _playlistSong2.default.destroy({ where: { playlistId: id, songId: songId } });
    //if no check songId again
    if (!row) return res.fail('Song Id is invalid.');
    res.success('Successfully deletd.');
  } catch (error) {
    res.fail(error.message);
  }
};

const addSongToPlaylist = exports.addSongToPlaylist = async (req, res) => {
  try {
    const { status } = req.query;
    const { id, songId } = req.params;
    const userId = req.authUer.id;
    //check if song if existing
    const [song, playlist] = await Promise.all([_song2.default.findOne({ attributes: ['id'], where: { id: songId, status } }), _playlist2.default.findOne({ attributes: ['id'], where: { userId, id } })]);
    //if not => return songId is not found
    if (!song) return res.fail('Song is invalid.');
    if (!playlist) return res.fail('Playlist is invalid.');
    //existing => add to table playlistsong
    const [{ isNewRecord }] = await _playlistSong2.default.findOrCreate({
      raw: true,
      where: { playlistId: id, songId },
      defaults: { playlistId: id, songId }
    });
    //result._options.isNewRecord =
    !isNewRecord ? res.success('Song has already added to playlist.') : res.success('Successfully added song to playlist.');
  } catch (error) {
    res.fail(error.name);
  }
};
//# sourceMappingURL=playlist.api.js.map