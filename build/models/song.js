'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSongArtistCategory = exports.updateSong = exports.insertSong = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //import Playlist from './playlist';

// import Album from './album';
// import Category from './category';


var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _stringTemplate = require('string-template');

var _stringTemplate2 = _interopRequireDefault(_stringTemplate);

var _sequelizeConnection = require('../common/sequelize-connection');

var _syncFile = require('../common/syncFile');

var _artistSong = require('./artist-song');

var _artistSong2 = _interopRequireDefault(_artistSong);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Song = _sequelizeConnection.sequelize.define('songs', {
  id: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: _sequelizeConnection.Sequelize.STRING, allowNull: false },
  duration: { type: _sequelizeConnection.Sequelize.STRING(10) },
  size: { type: _sequelizeConnection.Sequelize.INTEGER(11), defaultValue: 0 },
  albumId: {
    type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED,
    references: {
      model: 'albums',
      key: 'id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  },
  categoryId: {
    type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED,
    references: {
      model: 'categories',
      key: 'id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  },
  status: { type: _sequelizeConnection.Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active' },
  createdBy: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, allowNull: false },
  updatedBy: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, allowNull: false }
}, { timestamps: true });

const insertSong = exports.insertSong = async data => {
  const transaction = await _sequelizeConnection.sequelize.transaction();
  try {
    const { artistIds, duration, size, name } = data;
    const conditions = { name, duration, size };
    //console.log(data);
    //create song with that transaction
    const [song] = await Song.findOrCreate({ where: conditions, defaults: data, transaction });
    //map into one object => (songId, artistId)
    const artistSongs = artistIds.map(artistId => ({
      songId: song.id,
      artistId: artistId
    }));
    //insert many into ArtistSong
    await _artistSong2.default.bulkCreate(artistSongs, { transaction });
    //we need to commit data
    transaction.commit();
    //End transaction
    ////////////////////
    return song;
  } catch (error) {
    transaction.rollback();
    throw error;
  }
};

const updateSong = exports.updateSong = async body => {
  const transaction = await _sequelizeConnection.sequelize.transaction();
  try {
    const { data, id, artistIds } = body;
    let artistSongs;
    let filterArtistSong = {};
    //check if they provide artistIds to update or not
    if (artistIds) {
      artistSongs = artistIds.map(artistId => ({
        songId: id,
        artistId: artistId
      }));
      filterArtistSong = _artistSong2.default.destroy({ where: { songId: id }, transaction });
    }
    //if have update => 2 process otherwise only once process
    const [song] = await Promise.all([Song.update(data, { where: { id, status: 'active' }, transaction }), filterArtistSong]);
    //check again
    if (artistIds) await _artistSong2.default.bulkCreate(artistSongs, { transaction });
    transaction.commit();
    return song;
  } catch (error) {
    transaction.rollback();
    throw error;
  }
};

const getSongArtistCategory = exports.getSongArtistCategory = async data => {
  try {
    const { limit, offset, name, singerId, type, albumId } = data;
    const filterSingerId = singerId ? `AND singerId = :singerId` : ``;
    const filterSingerName = name ? `AND (A.name LIKE :name OR S.name LIKE :name)` : ``;
    const filterSingerType = type ? `AND A.type = :singerType` : ``;
    const filterAlbumId = albumId ? `AND S.albumId = :albumId` : ``;
    const preString = (0, _syncFile.readFile)(_path2.default.join(__dirname, '../../src/query/song/getSongArtistCategory.sql'));
    const preStringCount = (0, _syncFile.readFile)(_path2.default.join(__dirname, '../../src/query/song/countAllSongArtistCategory.sql'));
    const queryString = (0, _stringTemplate2.default)(preString, { filterSingerId, filterSingerName, filterSingerType, filterAlbumId });
    const queryStringCount = (0, _stringTemplate2.default)(preStringCount, {
      filterSingerId,
      filterSingerName,
      filterSingerType,
      filterAlbumId
    });
    const replacementSong = {
      name: `%${name}%`,
      singerType: type,
      albumId: albumId,
      limitValue: limit,
      offsetValue: offset
    };
    const [songs, [count]] = await Promise.all([_sequelizeConnection.sequelize.query(queryString, {
      replacements: replacementSong,
      type: _sequelizeConnection.sequelize.QueryTypes.SELECT
    }), _sequelizeConnection.sequelize.query(queryStringCount, {
      replacements: replacementSong,
      type: _sequelizeConnection.sequelize.QueryTypes.SELECT
    })]);
    return _extends({ songs }, count);
  } catch (error) {
    throw new Error('Error');
  }
};

exports.default = Song;
//# sourceMappingURL=song.js.map