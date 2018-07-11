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
    const [hasAlbum, hasCategory, hasArtist] = await Promise.all([_album2.default.findOne({ attributes: ['id'], where: { id: albumId, status } }), _category2.default.findOne({ attributes: ['id'], where: { id: categoryId, status } }), _artist2.default.findAll({ attributes: ['id'], where: fliterArtist })]);
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
    const { id } = req.params;
    const { albumId, categoryId, artistIds, name, duration, size, updatedBy } = req.body;
    //const { status } = req.query;
    //check if song Id is exist or not because I dont want to query sth before check it
    const result = await _song2.default.findOne({ where: { id, status: 'active' } });
    if (!result) res.fail('Song Id is invalid.');
    //if exist => query for update
    const fliterAlbum = albumId ? _album2.default.findOne({ where: { id: albumId, status: 'active' } }) : {};
    const fliterCategory = categoryId ? _category2.default.findOne({ where: { id: categoryId, status: 'active' } }) : {};
    const fliterArtist = artistIds ? _artist2.default.findAll({ where: { id: { [_sequelizeConnection.Op.in]: artistIds }, status: 'active' } }) : {};
    //if include album , ... => process to check
    const [hasAlbum = 0, hasCategory = 0, hasArtist = 0] = await Promise.all([fliterAlbum, fliterCategory, fliterArtist]);
    //response what wrong with these
    hasAlbum ? hasCategory ? Array.isArray(hasArtist) ? hasArtist.length === artistIds.length ? {} //isArray but donot found some artist id
    : res.fail('Some artist Id is invalid.') : {} // if no process of that query
    : res.fail('Category Id is not found.') : res.fail('Album Id is not found.');

    const fliterName = name ? { name: name } : {};
    const fliterDuration = duration ? { duration: duration } : {};
    const fliterSize = size ? { size: size } : {};
    //for table song need to update
    const data = _extends({}, fliterName, fliterSize, fliterDuration, fliterAlbum, fliterCategory, { updatedBy });
    await (0, _song.updateSong)({ data, id, artistIds });
    res.success('Successfully updated.');
  } catch (error) {
    res.fail(error.message);
  }
};
//# sourceMappingURL=song.api.js.map