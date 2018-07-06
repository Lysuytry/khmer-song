import {Sequelize, sequelize} from '../common/sequelize-connection';

const PlaylistSong = sequelize.define('Playlists-Songs', {
  id: {type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
  playlistId: {type: Sequelize.INTEGER, references: {
    model: Playlist,
    key: 'id'
  }},
  songId: {type: Sequelize.INTEGER, references: {
    model: Song,
    key: 'id'
  }}
}, {timestamps: false});

export default PlaylistSong;
