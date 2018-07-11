import {sequelize, Sequelize} from '../common/sequelize-connection';
// import Album from './album';
// import Category from './category';
import ArtistSong from './artist-song';
//import Playlist from './playlist';

const Song = sequelize.define('songs', {
  id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
  name: {type: Sequelize.STRING, allowNull: false},
  duration: {type: Sequelize.STRING(10)},
  size: {type: Sequelize.INTEGER(11), defaultValue: 0},
  albumId: {type: Sequelize.INTEGER.UNSIGNED, references: {
    model: 'albums',
    key: 'id'
  }, onDelete: 'SET NULL', onUpdate: 'CASCADE'},
  categoryId: {type: Sequelize.INTEGER.UNSIGNED, references: {
    model: 'categories',
    key: 'id'
  }, onDelete: 'SET NULL', onUpdate: 'CASCADE'},
  status: {type: Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active'},
  createdBy: {type: Sequelize.INTEGER.UNSIGNED, allowNull: false},
  updatedBy: {type: Sequelize.INTEGER.UNSIGNED, allowNull: false}
}, {timestamps: true});

export const insertSong = async (data) => {
  const transaction = await sequelize.transaction();
  try{
    const {artistIds, duration, size, name} = data;
    const conditions = {name, duration, size};
    console.log(data);
    //create song with that transaction
    const [song] = await Song.findOrCreate({where: conditions, defaults: data, transaction});
    //map into one object => (songId, artistId)
    const artistSongs = artistIds.map(artistId => ({
      songId: song.id,
      artistId: artistId
    }));
    //insert many into ArtistSong
    await ArtistSong.bulkCreate(artistSongs, {transaction});
    //we need to commit data
    transaction.commit();
    //End transaction
    ////////////////////
    return song;
  } catch(error){
    transaction.rollback();
    throw error;
  }
};

export default Song;
