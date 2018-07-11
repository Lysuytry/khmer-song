import {Sequelize, sequelize} from '../common/sequelize-connection';
//import Artist from './artist';
//import Song from './song';

const ArtistSong = sequelize.define('artistSongs', {
  artistId: {type: Sequelize.INTEGER.UNSIGNED, primaryKey: true},
  songId: {type: Sequelize.INTEGER.UNSIGNED, primaryKey: true}
}, {timestamps: false});

export default ArtistSong;
