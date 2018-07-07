import {Sequelize, sequelize} from '../common/sequelize-connection';
//import Playlist from './playlist';
//import Song from './song';

const PlaylistSong = sequelize.define('playlists-songs', {
  id: {type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
  playlistId: {type: Sequelize.INTEGER.UNSIGNED, references: {
    model: 'playlists',
    key: 'id'
  }, onDelete: 'CASCADE', onUpdate: 'CASCADE'},
  songId: {type: Sequelize.INTEGER.UNSIGNED, references: {
    model: 'songs',
    key: 'id'
  }, onDelete: 'CASCADE', onUpdate: 'CASCADE'}
}, {timestamps: false});

export default PlaylistSong;
