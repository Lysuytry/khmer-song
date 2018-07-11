'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rawQuery = exports.updateSong = exports.insertSong = undefined;

var _sequelizeConnection = require('../common/sequelize-connection');

var _artistSong = require('./artist-song');

var _artistSong2 = _interopRequireDefault(_artistSong);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import Playlist from './playlist';

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
// import Album from './album';
// import Category from './category';
const insertSong = exports.insertSong = async data => {
  const transaction = await _sequelizeConnection.sequelize.transaction();
  try {
    const { artistIds, duration, size, name } = data;
    const conditions = { name, duration, size };
    console.log(data);
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
    let fliterArtistSong = {};
    //check if they provide artistIds to update or not
    if (artistIds) {
      artistSongs = artistIds.map(artistId => ({
        songId: id,
        artistId: artistId
      }));
      fliterArtistSong = _artistSong2.default.destroy({ where: { songId: id }, transaction });
    }
    //if have update => 2 process otherwise only once process
    const [song] = await Promise.all([Song.update(data, { where: { id, status: 'active' }, transaction }), fliterArtistSong]);
    //check again
    if (artistIds) await _artistSong2.default.bulkCreate(artistSongs, { transaction });
    transaction.commit();
    return song;
  } catch (error) {
    transaction.rollback();
    throw error;
  }
};

const rawQuery = exports.rawQuery = async id => {
  try {
    const stringQuery = `SELECT *
    FROM songs as S INNER JOIN artistSongs as AST ON S.id=AST.songId
    WHERE S.id=${id}`;
    // const stringQuery = `SELECT *
    // FROM album as S LEFT JOIN productions as AST ON S.productionId=AST.Id
    // WHERE S.id=${id}`;
    const song = await _sequelizeConnection.sequelize.query(stringQuery);
    return song;
  } catch (error) {
    throw new Error('Error');
  }
};

exports.default = Song;
//# sourceMappingURL=song.js.map