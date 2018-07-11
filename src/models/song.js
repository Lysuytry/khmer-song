import { sequelize, Sequelize} from '../common/sequelize-connection';
// import Album from './album';
// import Category from './category';
import ArtistSong from './artist-song';
//import Playlist from './playlist';

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
    console.log(data);
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
    let fliterArtistSong = {};
    //check if they provide artistIds to update or not
    if (artistIds) {
      artistSongs = artistIds.map(artistId => ({
        songId: id,
        artistId: artistId
      }));
      fliterArtistSong = ArtistSong.destroy({ where: { songId: id }, transaction });
    }
    //if have update => 2 process otherwise only once process
    const [song] = await Promise.all([
      Song.update(data, { where: { id, status: 'active' }, transaction }),
      fliterArtistSong
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

export const rawQuery = async id => {
  try {
    const stringQuery = `SELECT *
    FROM songs as S INNER JOIN artistSongs as AST ON S.id=AST.songId
    WHERE S.id=${id}`;
    // const stringQuery = `SELECT *
    // FROM album as S LEFT JOIN productions as AST ON S.productionId=AST.Id
    // WHERE S.id=${id}`;
    const song = await sequelize.query(stringQuery);
    return song;
  } catch (error) {
    throw new Error('Error');
  }
};

export default Song;
