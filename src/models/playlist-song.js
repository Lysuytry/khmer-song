import { Sequelize, sequelize } from '../common/sequelize-connection';
//import Playlist from './playlist';
//import Song from './song';

const PlaylistSong = sequelize.define(
  'playlistSongs',
  {
    playlistId: { type: Sequelize.CHAR(64), primaryKey: true },
    songId: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true }
  },
  { timestamps: false }
);

export default PlaylistSong;
