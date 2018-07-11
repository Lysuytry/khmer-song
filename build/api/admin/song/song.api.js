'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSongById = exports.createSong = exports.deleteSongById = exports.getSongById = exports.getSongList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
//import ArtistSong from '../../../models/artist-song';


var _song = require('../../../models/song');

var _song2 = _interopRequireDefault(_song);

var _artist = require('../../../models/artist');

var _artist2 = _interopRequireDefault(_artist);

var _album = require('../../../models/album');

var _album2 = _interopRequireDefault(_album);

var _category = require('../../../models/category');

var _category2 = _interopRequireDefault(_category);

var _sequelizeConnection = require('../../../common/sequelize-connection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getSongList = exports.getSongList = async (req, res) => {
  try {
    const { limit, offset, status, name } = req.query;
    const fliterName = name ? { name: { [_sequelizeConnection.Op.like]: `%${name}%` } } : {};
    const conditions = _extends({}, fliterName, { status });
    const { rows, count } = await _song2.default.findAndCount({ where: conditions, offset, limit });
    res.success(rows, { limit, offset, count });
  } catch (error) {
    res.fail(error);
  }
};

const getSongById = exports.getSongById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const song = await _song2.default.findOne({ where: { id, status } });
    song ? res.success(song) : res.success({});
  } catch (error) {
    res.fail(error);
  }
};

const deleteSongById = exports.deleteSongById = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await _song2.default.update({ status: 'inactive' }, { where: { id, status: 'active' } });
    result === 0 ? res.fail('Id is not found.') : res.success('Successfully deleted.');
  } catch (error) {
    res.fail(error);
  }
};

//create with album , category and artist
const createSong = exports.createSong = async (req, res) => {
  try {
    const { albumId, categoryId, artistIds, name, duration, size, createdBy, updatedBy } = req.body;
    const { status } = req.query;
    const fliterArtist = { id: { [_sequelizeConnection.Op.in]: artistIds }, status };
    //check all these folks that are existing or not ...
    const [hasAlbum, hasCategory, hasArtist] = await Promise.all([_album2.default.count({ where: { id: albumId, status } }), _category2.default.count({ where: { id: categoryId, status } }), _artist2.default.findAll({ where: fliterArtist })]);
    //response what wrong with these
    hasAlbum ? hasCategory ? hasArtist.length == artistIds.length ? {} : res.fail('Artist Id is not found.') : res.fail('Category Id is not found.') : res.fail('Album Id is not found.');
    //otherwise => insert part
    const song = await (0, _song.insertSong)({ albumId, categoryId, artistIds, name, duration, size, createdBy, updatedBy });
    res.success(song);
  } catch (error) {
    res.fail(error.name);
  }
};

const updateSongById = exports.updateSongById = async (req, res) => {
  try {
    res.success('Successfully updated.');
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=song.api.js.map