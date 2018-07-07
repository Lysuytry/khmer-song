import {Sequelize, sequelize} from '../common/sequelize-connection';
//import Artist from './artist';
//import Song from './song';

const ArtistSong = sequelize.define('artists-songs', {
  id: {type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
  artistId: {type: Sequelize.INTEGER.UNSIGNED, references: {
    model: 'artists',
    key: 'id'
  }, onDelete: 'CASCADE', onUpdate: 'CASCADE'},
  songId: {type: Sequelize.INTEGER.UNSIGNED, references: {
    model: 'songs',
    key: 'id'
  }, onDelete: 'CASCADE', onUpdate: 'CASCADE'}
}, {timestamps: false});

export default ArtistSong;
