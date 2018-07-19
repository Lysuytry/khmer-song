//import Playlist from './playlist';
import path from 'path';
import format from 'string-template';
import { Sequelize, sequelize } from '../common/sequelize-connection';
import { readFileSyn } from '../common/syncFile';
// import Album from './album';
// import Category from './category';
import ArtistSong from './artist-song';

const Song = sequelize.define(
  'songs',
  {
    id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING, allowNull: false },
    duration: { type: Sequelize.STRING(10) },
    size: { type: Sequelize.INTEGER(11), defaultValue: 0 },
    albumId: {
      type: Sequelize.INTEGER.UNSIGNED,
      references: {
        model: 'albums',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    },
    categoryId: {
      type: Sequelize.INTEGER.UNSIGNED,
      references: {
        model: 'categories',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    },
    status: { type: Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active' },
    createdBy: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
    updatedBy: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false }
  },
  { timestamps: true }
);

export const insertSong = async data => {
  const transaction = await sequelize.transaction();
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
    await ArtistSong.bulkCreate(artistSongs, { transaction });
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

export const updateSong = async body => {
  const transaction = await sequelize.transaction();
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
      filterArtistSong = ArtistSong.destroy({ where: { songId: id }, transaction });
    }
    //if have update => 2 process otherwise only once process
    const [song] = await Promise.all([
      Song.update(data, { where: { id, status: 'active' }, transaction }),
      filterArtistSong
    ]);
    //check again
    if (artistIds) await ArtistSong.bulkCreate(artistSongs, { transaction });
    transaction.commit();
    return song;
  } catch (error) {
    transaction.rollback();
    throw error;
  }
};

export const getSongArtistCategory = async data => {
  try {
    const { limit, offset, name, singerId, type, albumId } = data;
    const filterSingerId = singerId ? `AND singerId = :singerId` : ``;
    const filterSingerName = name ? `AND (A.name LIKE :name OR S.name LIKE :name)` : ``;
    const filterSingerType = type ? `AND A.type = :singerType` : ``;
    const filterAlbumId = albumId ? `AND S.albumId = :albumId` : ``;
    // const preString = readFile(path.join(__dirname, '../../src/query/song/get-song-artist-category.sql'));
    // const preStringCount = readFile(path.join(__dirname, '../../src/query/song/count-all-song-artist-category.sql'));
    const [preString, preStringCount] = await Promise.all([
      readFileSyn(path.join(__dirname, '../../src/query/song/get-song-artist-category.sql')),
      readFileSyn(path.join(__dirname, '../../src/query/song/count-all-song-artist-category.sql'))
    ]);

    const queryString = format(preString, { filterSingerId, filterSingerName, filterSingerType, filterAlbumId });
    const queryStringCount = format(preStringCount, {
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
    const [songs, [count]] = await Promise.all([
      sequelize.query(queryString, {
        replacements: replacementSong,
        type: sequelize.QueryTypes.SELECT
      }),
      sequelize.query(queryStringCount, {
        replacements: replacementSong,
        type: sequelize.QueryTypes.SELECT
      })
    ]);
    return { songs, ...count };
  } catch (error) {
    throw new Error(error);
  }
};

export default Song;
